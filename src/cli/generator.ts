import { isStringLiteral, StringLiteral, type Model, isCmd, isLabel, isPrint, Print, SExprt, isVar, isGoTo, GoTo, 
    isLetStr, LetStr, isLetNum, LetNum, isStringVarRef, isIntVarRef, 
    isIntNumber, IntNumber, isExpr, Expr, isBinExpr, BinExpr, isNegExpr, NegExpr, isGroupExpr, 
    GroupExpr, Label, isIf, If, isFor, For, isNext, Next, isEnd, 
    AllVarRef,
    SExpr,
    isSBinExpr,
    SBinExpr,
    Stmt,
    isStrLabel,
    StrLabel,
    GoSub,
    isGoSub,
    isReturn,
    isLen,
    Len,
    isAsc,
    Asc,
    isChrs,
    Chrs,
    isStringFunction2,
    StringFunction2,
    isStringFunction3,
    StringFunction3,
    isFloatVar,
    isFloatNumber,
    FloatNumber,
    isFloatVarRef,
    isNumFunc,
    NumFunc,
    isGet,
    Get,
    isInput,
    Input,
    isDefFn,
    DefFn,
    isIntVar,
    isFnCall,
    FnCall} from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { AstNode, AstUtils } from 'langium';

interface ProgContext {
    stackAllocation: number
    usedRegisters: string[]
    usedXmmRegisters: string[]
    variables: Map<string, number>
    fnType: Map<string,string>
    ifLabelCounter: number
    forLabelCounter: number
    copyLabelCounter: number
    goSubLabelCounter: number
    defnLabelCounter: number
    forStack: ForEntry[]
    usedLines: string[]
    goSubLabels: string[]
    stringTmpCount : number
    floatTmpCount : number
    tmpOffset: number
}

interface ForEntry {
    label: string
    variable: string
}

// All registers
// "rax","rbx","rcx","rdx","rsi","rdi","rbp","rsp","r8","r9","r10","r11","r12","r13","r14","r15"

// To preserve
// RBX, RBP, RSP, R12, R13, R14, R15
// Windows
// RBX, RBP, RSI, RDI, RSP, R12, R13, R14, R15

// Calling Convention
// RDI, RSI, RDX, RCX, R8 und R9 
// Windows
// RCX, RDX, R8, R9, Stack

// Register to be used (beside %rax)
const registers : string[] = ["%rsi","%rdi","%r8","%r9","%r10","%r11","%r12","%r13","%r14","%r15","%rbx","%rcx","%rdx"]

const xmmRegisters : string[] = ["%xmm0","%xmm1","%xmm2","%xmm3","%xmm4","%xmm5","%xmm6","%xmm7"]

const regParameters = ["%rcx", "%rdx", "%r8", "%r9"]

const notPreservedRegister = ["%rcx","%rdx","%r8","%r9","%r10","%r11"]


// Register that must be preserved during c-call
// const preservedRegister : string[] = ["%rbx","%rbp","%rsp","%r12","%r13","%r14","%r15"]
// Special Registers
// %rbp - data pointer on stack
// %rsp - stack pointer

const stringTmpVarCount = 5
const floatTmpVarCount = 5

export function generateAssemblerCode(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.s`;

    const preamble  = `
	.file	"${data.name}"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
`
    let stringLiterals = generateStringLiterals(model);
    let floatLiterals = generateFloatLiterals(model);

    const progContext: ProgContext = {
        stackAllocation: 0,
        usedRegisters: [],
        usedXmmRegisters: [],
        variables: new Map(),
        fnType: new Map(),
        ifLabelCounter: 0,
        forLabelCounter: 0,
        copyLabelCounter: 0,
        goSubLabelCounter: 0,
        forStack: [],
        usedLines: [],
        goSubLabels: [],
        stringTmpCount: 0,
        floatTmpCount: 0,
        tmpOffset: 0,
        defnLabelCounter: 0,
    }
    generateVariables(model, progContext)
    // TODO compute how many tmp str variables are needed
    // Generate 5 str tmp variables
    

    let programmCode = ""
    progContext.variables.forEach((value, key) => {
        if (isStrVariable(key)) {
            programmCode += `\t# init variable ${key}\n`;
            programmCode += genOpCode("movq","$0",`${value}(%rbp)`);
            programmCode += genOpCode("movq","$0",`${value+8}(%rbp)`);
            programmCode += genOpCode("movq","$0",`${value+16}(%rbp)`);
        }
    })

    programmCode += initStringConstants(model, progContext)

    for (const line of model.lines) {
        if (line.linenum && progContext.usedLines.includes(line.linenum)) {
            programmCode += `.line${line.linenum}:\n`;
        }
        programmCode += generateStmts(line.stmts, progContext);
    }

    const code = `
    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$${progContext.stackAllocation}, %rsp
${programmCode}
.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    `

    const all = preamble + stringLiterals + floatLiterals + code;
    fs.writeFileSync(generatedFilePath, all);
    return generatedFilePath;
}

interface LabeledNode  extends AstNode {
    _label?: string
    _variableOffset?: number
    _stepOffset?: number
    _toOffset?: number
}

function generateStmts(stmts: Stmt[], progContext: ProgContext) : string {
    let code = ""
    for (const node of stmts) {
        if (isStrLabel(node)) {
            const lNode : StrLabel = node;
            const name : string = lNode.name.substring(0,lNode.name.length-1)
            if (progContext.goSubLabels.includes(name)) {
                const jumpOverLabel : string = ".jumpover"+progContext.goSubLabelCounter++
                code += genOpCode("jmp", jumpOverLabel);
                code += `.${name}:\n`;
                // Allocate stack space needed because otherwise the ret address will be overwritten
                // by caller (see windows ABI for details)
                // 32 is the value that gcc c compiler uses
                code += genOpCode("subq","$32","%rsp");
                code += `${jumpOverLabel}:\n`;
            } else {
                code += `.${lNode.name}\n`;
            }
        } else if (isCmd(node)) {
            code += `\t# ${node.$cstNode?.text}\n`;
            if (isLabel(node)) {
                const lNode : Label = node;
                code += `.${lNode.name}:\n`;
            } else if (isPrint(node)) {
                const print : Print = node;
                if (print.exprs.length==1) {
                    const expr = print.exprs[0];
                    const stringResult = exprAsBString(expr,progContext);
                    code += stringResult.code;
                    code += genCall("puts", {cmd: "movq", source: `${stringResult.varOffset}(%rbp)`});
                    code += freeStrTmp(progContext, stringResult.tmpOffset);
                } else {
                    const tmpVarOffset = allocateStrTmp(progContext);
                    let isFirst : boolean = true
                    for (const expr of print.exprs) {
                        if (isFirst) {
                            const stringResult = exprAsBString(expr,progContext);
                            code += stringResult.code;
                            code += genCall("assignBString",
                                {cmd: "leaq", source: `${tmpVarOffset}(%rbp)`}, 
                                {cmd: "leaq", source: `${stringResult.varOffset}(%rbp)`});
                            code += freeStrTmp(progContext, stringResult.tmpOffset);
                            isFirst = false;
                        } else {
                            const stringResult = exprAsBString(expr,progContext);
                            code += stringResult.code;
                            code += genCall("appendBString",
                                {cmd: "leaq", source: `${tmpVarOffset}(%rbp)`}, 
                                {cmd: "leaq", source: `${stringResult.varOffset}(%rbp)`});
                            code += freeStrTmp(progContext, stringResult.tmpOffset);
                        }
                    }
                    code += genCall("puts", {cmd: "movq", source: `${tmpVarOffset}(%rbp)`});
                    code += freeStrTmp(progContext, tmpVarOffset);
                }
            } else if (isGoSub(node)) {
                const goto : GoSub = node;
                const labelRef = goto.label?.ref
                if (labelRef) {
                    const name = labelRef.name
                    if (name.endsWith(":")) {
                        code += genOpCode("call", "."+labelRef.name.substring(0,name.length-1));
                    } else {
                        code += genOpCode("call", "."+labelRef.name);
                    }
                } else {
                    const lineRef = goto.lineNumber?.ref
                    if (lineRef) {
                        code += genOpCode("call", `.line${lineRef.linenum}`);
                    }
                }
            } else if (isGoTo(node)) {
                const goto : GoTo = node;
                const labelRef = goto.label?.ref
                if (labelRef) {
                    const name = labelRef.name
                    if (name.endsWith(":")) {
                        code += genOpCode("jmp", "."+labelRef.name.substring(0,name.length-1));
                    } else {
                        code += genOpCode("jmp", "."+labelRef.name);
                    }
                } else {
                    const lineRef = goto.lineNumber?.ref
                    if (lineRef) {
                        code += genOpCode("jmp", `.line${lineRef.linenum}`);
                    }
                }
            } else if (isReturn(node)) {
                // RETURN without GOSUB will break the program
                code += genOpCode("addq","$32","%rsp");
                code += genOpCode("ret");
            } else if (isLetNum(node)) {
                const letNode : LetNum = node;
                const lNode : LabeledNode = letNode.name;
                if (isFloatVar(letNode.name)) {
                    const xmmReg = allocateXmmRegister(progContext);
                    const floatResult = exprToFloat(letNode.expr, progContext);
                    code += floatResult.code;
                    code += genOpCode("movsd", floatResult.source!, xmmReg);
                    freeFloatTmp(progContext, floatResult.tmpOffset);
                    code += genOpCode("movsd", xmmReg, `${lNode._variableOffset}(%rbp)`);
                    freeXmmRegister(progContext, xmmReg);
                } else {
                    code += exprToInt(letNode.expr, "%rax", progContext);
                    code += genOpCode("movq", "%rax", `${lNode._variableOffset}(%rbp)`);
                }
            } else  if (isLetStr(node)) {
                const letNode : LetStr = node;
                const lNode : LabeledNode = letNode.name;
                const strResult = exprAsBString(letNode.expr,progContext);
                code += strResult.code;
                code += genCall("assignBString", 
                    {cmd: "leaq", source: `${lNode._variableOffset}(%rbp)`}, 
                    {cmd: "leaq", source: `${strResult.varOffset}(%rbp)`});
                code += freeStrTmp(progContext, strResult.tmpOffset);
            } else if (isIf(node)) {
                const ifNode : If = node;
                const notIfLabel = `.ifnot${progContext.ifLabelCounter++}`
                code += conditionToAssembler(ifNode.cond, progContext, notIfLabel);
                if (ifNode.label) {
                    const name = ifNode.label.ref?.name
                    if (name) {
                        if (name.endsWith(":")) {
                            code += genOpCode("jmp", "."+name.substring(0,name.length-1));
                        } else {
                            code += genOpCode("jmp", "."+name);
                        }
                    } else {
                        throw "unsupported goto without name"
                    }
                    code += genOpCode("jmp", "."+ifNode.label.ref?.name);
                } else if (ifNode.lineNumber) {
                    code += genOpCode("jmp", `.line${ifNode.lineNumber.ref?.linenum}`);
                } else {
                    code += generateStmts(ifNode.stmts,progContext);
                }
                code += `${notIfLabel}:\n`
            } else if (isFor(node)) {
                code += genFor(node, progContext);
            } else if (isNext(node)) {
                const nextNode : Next = node;
                if (nextNode.vars.length==0) {
                    if (progContext.forStack.length==0) {
                        throw "no for loop to exit"
                    }
                    const forEntry = progContext.forStack[progContext.forStack.length-1];
                    code +=  genOpCode("call", forEntry.label);
                } else {
                    for (const fvar of nextNode.vars) {
                        const varName = nameForVarRef(fvar, progContext)
                        const forEntries = progContext.forStack.filter(e => e.variable === varName);
                        // We try to get the last for entry for the variable
                        // Unfortunatelly in basic the end of the for loop is not clear
                        if (forEntries.length>0) {
                            code +=  genOpCode("call", forEntries[forEntries.length-1].label);
                        } else {
                            throw "can not find next for entry: " + varName
                        }
                    }
                }
            } else if (isEnd(node)) {
                code += genOpCode("jmp", ".basicend");
            } else if (isGet(node)) {
                const getNode : Get = node;
                const varName = getNode.var.name
                const varOffset = progContext.variables.get(varName)
                if (varOffset) {
                    code += genOpCode("leaq", `${varOffset}(%rbp)`, "%rcx");
                    code += genOpCode("call", "readChar");
                } else {
                    throw "can not find variable offset for: "+varName
                }
            } else if (isInput(node)) {
                const inputNode : Input = node;
                if (inputNode.msg) {
                    const labeledNode : LabeledNode = inputNode.msg;
                    code += genOpCode("leaq", `${labeledNode._variableOffset}(%rbp)`, "%rcx");
                } else {
                    code += genOpCode("xort", "%rcx", "%rcx");
                }
                const labeledNode : LabeledNode = inputNode;
                code += genOpCode("leaq", `${labeledNode._label}(%rip)`, "%rdx");
                let parNum = 2
                for (const ivar of inputNode.vars) {
                    const varName = ivar.name
                    const varOffset = progContext.variables.get(varName)
                    if (varOffset) {
                        const parReg = regParameters[parNum]
                        if (parReg) {
                            code += genOpCode("leaq", `${varOffset}(%rbp)`, parReg);
                        } else {
                            code += genOpCode("push", `${varOffset}(%rbp)`, parReg);
                        }
                    } else {
                        throw "can not find variable offset for: "+varName
                    }
                    parNum++
                }
                code += genOpCode("call", "inputData");
            } else if (isDefFn(node)) {
                const defFn : DefFn = node
                const labelEnd = `.defn_end${defFn.name}_${progContext.defnLabelCounter}`
                const labelExpr = `.defn_expr${defFn.name}_${progContext.defnLabelCounter}`
                progContext.defnLabelCounter++
                var defnPointer = progContext.variables.get(`_deffn_${defFn.name}`)
                if (!defnPointer) {
                    throw "can not find defn pointer for: "+defFn.name
                }
                code += genOpCode("leaq", `${labelExpr}(%rip)`, "%rax");
                code += genOpCode("movq", "%rax", `${defnPointer}(%rbp)`);
                code += genOpCode("jmp", labelEnd);
                code += `${labelExpr}:\n`
                // We need shadow placa on stack. Because every call to std function will overwrite the return address
                // 40 is because the rsp needs to be aligned to 16 byte (8 bytes are used by ret address already)
                code += genOpCode("subq", "$40", "%rsp");
                var defnVar = progContext.variables.get(`_defvar_${defFn.name}`)
                if (!defnVar) {
                    throw "can not find defn var for: "+defFn.name
                }
                const globalValue = progContext.variables.get(defFn.param.name)
                progContext.variables.set(defFn.param.name, defnVar)
                if (isIntVar(defFn.param)) {
                    code += exprToInt(defFn.expr, "%rax", progContext);
                } else {
                    const floatResult = exprToFloat(defFn.expr, progContext)
                    code += floatResult.code
                    code += genOpCode("movsd", floatResult.source!, "%xmm0");
                    freeFloatTmp(progContext, floatResult.tmpOffset);
                }
                code += genOpCode("addq", "$40", "%rsp");
                code += genOpCode("ret")
                code += `${labelEnd}:\n`
                if (globalValue) {
                    progContext.variables.set(defFn.param.name, globalValue)
                }
            } else {
                throw "unsupported command: "+node.$type
            }
        }
    }
    return code;
}

function conditionToAssembler(cond: Expr, progContext: ProgContext, notIfLabel: string) : string {
    let code = ""
    const reg = allocateRegister(progContext)
    code += exprToInt(cond, reg, progContext);
    code += genOpCode("cmpq", "$0", reg);
    code += genOpCode("je", notIfLabel);
    freeRegister(progContext,reg)
    return code
}

function genFor(forNode: For, progContext: ProgContext) : string {
    return new ForGenerator(forNode, progContext).generate()
}

interface BStringResult {
    varOffset: number
    code: string
    tmpOffset?: number
}

function exprAsBString(expr: SExprt | SExpr, progContext: ProgContext) : BStringResult {
    let code = ""
    let variableOffset = 0
    let tmpOffset : number | undefined = undefined
    code += `\t# str: ${expr.$cstNode?.text}\n`;
    if (isStringLiteral(expr)) {
        const lNode : LabeledNode = expr;
        variableOffset = lNode._variableOffset!
    } else if (isStringVarRef(expr)) {
        variableOffset = offsetForVarRef(expr, progContext)
    } else if (isIntVarRef(expr)) {
        const varName = nameForVarRef(expr, progContext)
        const intVarOffset = progContext.variables.get(varName)
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (intVarOffset) {
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("movq", `${intVarOffset}(%rbp)`, "%rdx");
            code += genOpCode("call", "assignInt");
        } else {
            throw "error: can get int var offset for "+varName
        }
    } else if (isFloatVarRef(expr)) {
        const varName = nameForVarRef(expr, progContext)
        const intVarOffset = progContext.variables.get(varName)
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (intVarOffset) {
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("movsd", `${intVarOffset}(%rbp)`, "%xmm1");
            code += genOpCode("call", "assignDouble");
        } else {
            throw "error: can get int var offset for "+varName
        }
    } else if (isExpr(expr)) {
        const exprNode : Expr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (isFloatExpr(exprNode, progContext)) {
            console.log("str float expr")
            const floatResult = exprToFloat(exprNode, progContext);
            code += floatResult.code;
            code += genOpCode("movsd", floatResult.source!, "%xmm1");
            freeFloatTmp(progContext, floatResult.tmpOffset);
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("call", "assignDouble");
        } else {
            console.log("str int expr")
            code += exprToInt(exprNode, "%rdx", progContext);
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("call", "assignInt");
        }
    } else if (isSBinExpr(expr)) {
        const sBinExpr : SBinExpr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        const strResult1 =  exprAsBString(sBinExpr.e1, progContext);
        code += strResult1.code;
        code += genCall("assignBString",{cmd: "leaq", source: `${variableOffset}(%rbp)`}, {cmd: "leaq", source: `${strResult1.varOffset}(%rbp)`});
        code += freeStrTmp(progContext, strResult1.tmpOffset);
        const strResult2 =  exprAsBString(sBinExpr.e2, progContext);
        code += strResult2.code;
        code += genCall("appendBString",{cmd: "leaq", source: `${variableOffset}(%rbp)`}, {cmd: "leaq", source: `${strResult2.varOffset}(%rbp)`});
        code += freeStrTmp(progContext, strResult2.tmpOffset);
    } else if (isChrs(expr)) {
        const chrs : Chrs = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        code += exprToInt(chrs.param, "%rdx", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("call", "assignChar");
    } else if (isStringFunction2(expr)) {
        const stringFunction2 : StringFunction2 = expr;
        variableOffset = allocateStrTmp(progContext)
        tmpOffset = variableOffset
        const strResult = exprAsBString(stringFunction2.str, progContext);
        code += strResult.code;
        code += exprToInt(stringFunction2.param, "%r8", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("leaq", `${strResult.varOffset}(%rbp)`, "%rdx");
        if (stringFunction2.func === "LEFT$") {
            code += genOpCode("call", "bstrLeft");
        } else if (stringFunction2.func === "RIGHT$") {
            code += genOpCode("call", "bstrRight");
        } else {
            throw "unknown string function2 expression: "+stringFunction2.func
        }
        code += freeStrTmp(progContext, strResult.tmpOffset);
    } else if (isStringFunction3(expr)) {
        const stringFunction3 : StringFunction3 = expr;
        variableOffset = allocateStrTmp(progContext)
        tmpOffset = variableOffset
        const strResult =  exprAsBString(stringFunction3.str, progContext);
        code += strResult.code;
        code += exprToInt(stringFunction3.param, "%r8", progContext);
        if (stringFunction3.len) {
            code += exprToInt(stringFunction3.len, "%r9", progContext);
        } else {
            code += genOpCode("movq", "$0", "%r9");
        }
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("leaq", `${strResult.varOffset}(%rbp)`, "%rdx");
        if (stringFunction3.func === "MID$") {
            code += genOpCode("call", "bstrMid");
        } else {
            throw "unknown string function2 expression: "+stringFunction3.func
        }
        code += freeStrTmp(progContext, strResult.tmpOffset);
    } else {
        throw "unknown string expression: "+expr.$type
    }
    return {varOffset: variableOffset, code, tmpOffset};
}

function isFloatExpr(expr: Expr, progContext: ProgContext) : boolean {
    return isFloatVarRef(expr) || isFloatNumber(expr) 
        || (isNumFunc(expr) && isNumFloatFunction(expr)) 
        || (isBinExpr(expr) && (isFloatExpr(expr.e1,progContext) || isFloatExpr(expr.e2,progContext)))
        || (isNegExpr(expr) && isFloatExpr(expr.expr,progContext))
        || (isGroupExpr(expr) && isFloatExpr(expr.ge,progContext))
        || (isFnCall(expr) && isFnFloatType(expr,progContext));
}

function isNumFloatFunction(numFunc: NumFunc) : boolean {
    return numFunc.func !== 'PEEK'
}


function allocateStrTmp(progContext: ProgContext) : number {
    const tmpNum = progContext.stringTmpCount
    if (progContext.stringTmpCount>=stringTmpVarCount) {
        throw "out of string tmp variables"
    }
    progContext.stringTmpCount++
    const varName = `strtmp${tmpNum}$`
    const offset = progContext.variables.get(varName)!
    if (!offset) {
        throw "can not find string tmp variable offset for: "+varName
    }
    return offset
}

function freeStrTmp(progContext: ProgContext, tmpOffset?: number) : string {
    let stmts = ""
    if (tmpOffset) {
        progContext.stringTmpCount--
        stmts += genOpCode("leaq", `${tmpOffset}(%rbp)`, "%rcx");
        stmts += genOpCode("call", "freeBString");
    }
    return stmts;
}

function allocateFloatTmp(progContext: ProgContext) : number {
    const tmpNum = progContext.floatTmpCount
    if (progContext.floatTmpCount>=floatTmpVarCount) {
        throw "out of float tmp variables"
    }
    progContext.floatTmpCount++
    const varName = `floattmp${tmpNum}`
    console.log("getting flattmp "+tmpNum + " var "+varName)
    return progContext.variables.get(varName)!
}

function freeFloatTmp(progContext: ProgContext, tmpOffset?: number) : string {
    let stmts = ""
    if (tmpOffset) {
        console.log("free float tmp")
        progContext.floatTmpCount--
    }
    return stmts;
}

function nameForFnCall(fnCall: FnCall, progContext: ProgContext) : string {
    return fnCall.fnname.ref?.name!
}

function nameForVarRef(varRef: AllVarRef, progContext: ProgContext) : string {
    const lNode : AstNode = varRef.var.ref!;
    if (isLetNum(lNode)) {
        const letNode : LetNum = lNode;
        return letNode.name.name
    } if (isLetStr(lNode)) {
        const letNode : LetStr = lNode;
        return letNode.name.name
    } if (isFor(lNode)) {
        const forNode : For = lNode;
        return forNode.name.name
    } else {
        throw "error: expecting Let node as string reference: " + lNode.$type
    }
}

function offsetForVarRef(varRef: AllVarRef, progContext: ProgContext) : number {
    const lNode : AstNode = varRef.var.ref!;
    if (isLetNum(lNode)) {
        const letNode : LetNum = lNode;
        const lNode2 : LabeledNode = letNode.name
        return lNode2._variableOffset!
    } else if (isLetStr(lNode)) {
        const letNode : LetStr = lNode;
        const lNode2 : LabeledNode = letNode.name
        return lNode2._variableOffset!
    } else if (isFor(lNode)) {
        const forNode : For = lNode;
        const lNode2 : LabeledNode = forNode.name
        return lNode2._variableOffset!
    } else if (isGet(lNode)) {
        const getNode : Get = lNode;
        const lNode2 : LabeledNode = getNode.var
        return lNode2._variableOffset!
    } else if (isInput(lNode)) {
        // The ref point to input that can have many variables,
        // we need find the right one
        let varName = varRef.$cstNode?.text
        if (varName?.endsWith(",")) {
            varName = varName.substring(0,varName.length-1)
        }
        const getNode : Input = lNode;
        for (const ivar of getNode.vars) {
            if (ivar.name === varName) {
                const lNode2 : LabeledNode = ivar
                return lNode2._variableOffset!
            }
        }
        throw "can not find variable offset for input var: "+varName        
    } else if (isDefFn(lNode)) {
        const defFn : DefFn = lNode;
        return progContext.variables.get(defFn.param.name)!
    } else {
        throw "error: expecting Let node as var reference: " + lNode.$type
    }
}


function exprToInt(expr: Expr, reg: string, progContext: ProgContext) : string {
    let stmts = ""
    stmts += `\t# int: ${expr.$cstNode?.text} - ${reg}\n`;
    if (isIntNumber(expr)) {
        const intNumber : IntNumber = expr;
        stmts += genOpCode("movq", `$${intNumber.val.toString()}`, reg);
    } else if (isIntVarRef(expr)) {
        const varOffset = offsetForVarRef(expr, progContext)
        stmts += genOpCode("movq", `${varOffset}(%rbp)`, reg);
    } else if (isBinExpr(expr)) {
        const binExpr : BinExpr = expr;
        stmts += exprToInt(binExpr.e1, reg, progContext);
        const reg2 = allocateRegister(progContext)
        stmts += exprToInt(binExpr.e2, reg2, progContext);
        if (binExpr.op === "+") {
            stmts += genOpCode("addq", reg2, reg);
        } else if (binExpr.op === "-") {
            stmts += genOpCode("subq", reg2, reg);
        } else if (binExpr.op === "*") {
            stmts += genOpCode("imulq", reg2, reg);
        } else if (binExpr.op === "/") {
            // stmts += genOpCode("cqto");
            stmts += genOpCode("movq", reg,"%rax");

            // TODO check if %rax is not null otherwise DIVISION BY ZERO error
            // TODO store rbx and rdx before div and restore after div if necessery
            // cqto extend rax to rdx (high part of dividend)
            stmts += genOpCode("cqto");
            // division of 128 bit / 64 bit 
            // rdx - hight part of dividend
            // rax - log part of dividend
            // rax - result division
            // rdx - result remainder
            const storeValue = storeRegister(progContext, ["%rbx","%rdx"],[reg2,reg])
            stmts += storeValue.code
            stmts += genOpCode("idivq", reg2);
            stmts += genOpCode("movq", "%rax", reg);
            stmts += restoreRegister(storeValue)
        } else if (binExpr.op === "<") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("setl", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else if (binExpr.op === ">") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("setg", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else if (binExpr.op === "=") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("sete", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else if (binExpr.op === "<=") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("setle", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else if (binExpr.op === ">=") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("setge", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else if (binExpr.op === "<>") {
            stmts += genOpCode("cmpq", reg2,reg);
            stmts += genOpCode("setne", "%al");
            stmts += genOpCode("movzbq", "%al", reg);
        } else {
            throw "unknown binary operator: "+binExpr.op
        }
        freeRegister(progContext, reg2)
    } else if (isNegExpr(expr)) {
        const negExpr : NegExpr = expr
        stmts += exprToInt(negExpr.expr,reg,progContext)
        stmts += genOpCode("negq", reg)
    } else if (isGroupExpr(expr)) {
        const groupExpr : GroupExpr = expr
        stmts += exprToInt(groupExpr.ge,reg,progContext)
    } else if (isLen(expr)) {
        const lenExpr : Len = expr
        const strResult = exprAsBString(lenExpr.param, progContext);
        // Access length of BString structure
        stmts += genOpCode("movq", `${strResult.varOffset+8}(%rbp)`,"%rax");
        stmts += genOpCode("movq", "%rax",`${progContext.tmpOffset}(%rbp)`);
        stmts += freeStrTmp(progContext, strResult.tmpOffset);
        stmts += genOpCode("movq", `${progContext.tmpOffset}(%rbp)`,reg);
    }  else if (isAsc(expr)) {  
        const ascExpr : Asc = expr
        const strResult = exprAsBString(ascExpr.param, progContext);
        // Get first byte of BString as int
        stmts += genOpCode("movq", `${strResult.varOffset}(%rbp)`,"%rax");
        stmts += genOpCode("movzbl", "(%eax)", "%rax");
        stmts += genOpCode("movq", "%rax",`${progContext.tmpOffset}(%rbp)`);
        stmts += freeStrTmp(progContext, strResult.tmpOffset);
        stmts += genOpCode("movq", `${progContext.tmpOffset}(%rbp)`,reg);
    } else if (isFnCall(expr) && !isFnFloatType(expr as FnCall, progContext)) {
        const fnCall : FnCall = expr;
        const deffnName = nameForFnCall(fnCall, progContext)
        const defnPointer = progContext.variables.get(`_deffn_${deffnName}`)
        if (!defnPointer) {
            throw "can not find defn pointer for: "+deffnName
        }
        const defnVar = progContext.variables.get(`_defvar_${deffnName}`)
        if (!defnVar) {
            throw "can not find defn var for: "+deffnName
        }
        const reg2 = allocateRegister(progContext)
        const storeValue = storeRegister(progContext, registers,[reg2,reg])
        stmts += storeValue.code
        stmts += exprToInt(fnCall.param, reg2, progContext);
        stmts += genOpCode("movq", reg2, `${defnVar}(%rbp)`);
        freeRegister(progContext, reg2)
        // stmts += genOpCode("movq", "$0", reg);
        stmts += genOpCode("movq", `${defnPointer}(%rbp)`, "%rax");
        // TODO check if %rax is not null otherwise UNDEF'D FUNCTION error
        stmts += genOpCode("call", "*%rax");
        stmts += genOpCode("movq", "%rax",reg);
        stmts += restoreRegister(storeValue);
    } else {
        if (isFloatExpr(expr,progContext)) {
            const storeValue = storeRegister(progContext, notPreservedRegister,[reg],true)
            stmts += storeValue.code
            const floatResult = exprToFloat(expr, progContext);
            stmts += floatResult.code;
            stmts += genOpCode("movsd", floatResult.source!, "%xmm0");
            freeFloatTmp(progContext, floatResult.tmpOffset);
            stmts += restoreRegister(storeValue);
            stmts += genOpCode("cvtsd2siq", "%xmm0", reg);
        } else {
            throw "unknown int expression: "+expr.$type
        }
    }
    return stmts;
}

interface FloatResult {
    code: string,
    source: string
    tmpOffset?: number    
}

const mathFunctions = {
    "SIN": "sin",
    "COS": "cos",
    "TAN": "tan",
    "ATN": "atan",
    "LOG": "log",
    "EXP": "exp",
    "SQR": "sqrt",
    "ABS": "fabs",
    "INT": "trunc",
    "SGN": "signd",
    "RND": "c64rnd"
}

function exprToFloat(expr: Expr, progContext: ProgContext) : FloatResult {
    let stmts = ""
    let source = ""
    let tmpOffset : undefined | number = undefined
    stmts += `\t# float: ${expr.$cstNode?.text}\n`;
    if (isFloatNumber(expr)) {
        const lNode : LabeledNode = expr;
        source = `${lNode._label}(%rip)`
    } else if (isFloatVarRef(expr)) {
        const varOffset = offsetForVarRef(expr, progContext)
        source =  `${varOffset}(%rbp)`
    } else if (isBinExpr(expr)) {
        const binExpr : BinExpr = expr;
        const floatResult1 = exprToFloat(binExpr.e1, progContext);
        stmts += floatResult1.code;
        const reg = allocateXmmRegister(progContext)
        const reg2 = allocateXmmRegister(progContext)
        const floatResult2 = exprToFloat(binExpr.e2, progContext);
        stmts += floatResult2.code;
        stmts += genOpCode("movsd", floatResult1.source, reg);
        stmts += genOpCode("movsd", floatResult2.source, reg2);
        if (binExpr.op === "+") {
            stmts += genOpCode("addsd", reg2, reg);
        } else if (binExpr.op === "-") {
            stmts += genOpCode("subsd", reg2, reg);
        } else if (binExpr.op === "*") {
            stmts += genOpCode("mulsd", reg2, reg);
        } else if (binExpr.op === "/") {
            stmts += genOpCode("divsd", reg2, reg);
        } else {
            throw "unknown binary operator: "+binExpr.op
        }
        freeFloatTmp(progContext, floatResult1.tmpOffset);        
        freeFloatTmp(progContext, floatResult2.tmpOffset);
        const resTmpOffset = allocateFloatTmp(progContext)
        stmts += genOpCode("movsd", reg, `${resTmpOffset}(%rbp)`);
        tmpOffset = resTmpOffset
        source = `${resTmpOffset}(%rbp)`
        freeXmmRegister(progContext, reg)
        freeXmmRegister(progContext, reg2)
    } else if (isGroupExpr(expr)) {
        const groupExpr : GroupExpr = expr
        return exprToFloat(groupExpr.ge,progContext)
    } else if (isNumFunc(expr)) {
        const numFunc : NumFunc = expr;
        const cFunc = (mathFunctions as any)[numFunc.func]
        if (cFunc) {
            const floatResult = exprToFloat(numFunc.param, progContext);
            stmts += floatResult.code;
            stmts += genOpCode("movsd", floatResult.source, "%xmm0");
            stmts += genOpCode("call", cFunc);
            const resTmpOffset = allocateFloatTmp(progContext)
            tmpOffset = resTmpOffset
            source = `${resTmpOffset}(%rbp)`
            stmts += genOpCode("movsd", "%xmm0", `${resTmpOffset}(%rbp)`);
            freeFloatTmp(progContext, floatResult.tmpOffset);
        } else {
            throw "unsupported float function "+numFunc.func
        }
    } else if (isFnCall(expr) && isFnFloatType(expr as FnCall, progContext)) {
        const fnCall : FnCall = expr;
        const deffnName = nameForFnCall(fnCall, progContext)
        const defnPointer = progContext.variables.get(`_deffn_${deffnName}`)
        if (!defnPointer) {
            throw "can not find defn pointer for: "+deffnName
        }
        const defnVar = progContext.variables.get(`_defvar_${deffnName}`)
        if (!defnVar) {
            throw "can not find defn var for: "+deffnName
        }
        const floatValue = exprToFloat(fnCall.param, progContext);
        stmts += floatValue.code;
        stmts += genOpCode("movsd", floatValue.source, "%xmm0");
        stmts += genOpCode("movsd", "%xmm0", `${defnVar}(%rbp)`);
        freeFloatTmp(progContext, floatValue.tmpOffset);
        stmts += genOpCode("movq", `${defnPointer}(%rbp)`, "%rax");
        // TODO check if %rax is not null otherwise UNDEF'D FUNCTION error
        const storeValue = storeRegister(progContext, registers,[],true)
        stmts += storeValue.code
        stmts += genOpCode("call", "*%rax");
        const resTmpOffset = allocateFloatTmp(progContext)
        stmts += genOpCode("movsd","%xmm0", `${resTmpOffset}(%rbp)`);
        tmpOffset = resTmpOffset
        source = `${resTmpOffset}(%rbp)`
        stmts += restoreRegister(storeValue);
    } else {
        if (!isFloatExpr(expr,progContext)) {
            const reg2 = allocateRegister(progContext)
            stmts += exprToInt(expr, reg2, progContext);
            const resTmpOffset = allocateFloatTmp(progContext)
            stmts += genOpCode("cvtsi2sdq", reg2, "%xmm0");
            stmts += genOpCode("movsd", "%xmm0", `${resTmpOffset}(%rbp)`);
            tmpOffset = resTmpOffset
            source = `${resTmpOffset}(%rbp)`
            freeRegister(progContext, reg2)
        } else {
            throw "unknown float expression: "+expr.$type
        }
    }
    return {code: stmts, source: source, tmpOffset: tmpOffset}
}


function genOpCode(cmd: string, arg1?: string, arg2?: string) {
    if (arg1) {
        return `\t${cmd}\t${arg1}${arg2 ? `, ${arg2}` : ""}\n`;
    } else {
        return `\t${cmd}\n`;
    }
}

interface CallParameter {
    cmd: string,
    source: string,
}

function genCall(cmd: string, ...parameters: CallParameter[]) {
    let code = ""
    for (const [index, par] of parameters.entries()) {
        const targetRegister = regParameters[index]
        if (targetRegister) {
            code += genOpCode(par.cmd, par.source, targetRegister);
        } else {
            code += genOpCode(par.cmd, par.source, "%rax");
            code += genOpCode("pushq", "%rax");
        }
    }
    code += genOpCode("call", cmd);
    return code;
}

function isStrVariable(varname: string) : boolean {
    return varname.endsWith("$");
}

function isFnFloatType(fnNode: FnCall, progContext: ProgContext) {
    const fnName = nameForFnCall(fnNode, progContext)
    return progContext.fnType.get(fnName)==="float"
}

function generateVariables(model: Model, progContext: ProgContext) {
    let variableOffset = -8;
    for (const node of AstUtils.streamAllContents(model)) {
        if (isVar(node)) {
            const lNode : LabeledNode = node;
            const varName = node.name
            if (progContext.variables.has(varName)) {
                lNode._variableOffset = progContext.variables.get(varName)!;
            } else {
                if (isStrVariable(varName)) {
                    // We need addition 2 t_size for BString structure
                    variableOffset -= 16;
                } 
                progContext.variables.set(varName, variableOffset)
                lNode._variableOffset = variableOffset
                variableOffset -= 8;
                //console.log("setting offset", node)
            }
        } else if (isFor(node)) {
            const forNode : For = node;
            const lNode : LabeledNode = node;
            if (forNode.step && !isIntNumber(forNode.step)) {
                lNode._stepOffset = variableOffset
                variableOffset -= 8;
            }
            if (forNode.end && !isIntNumber(forNode.end)) {
                lNode._toOffset = variableOffset
                variableOffset -= 8;
            }
        } else if (isGoTo(node)) {
            const goto : GoTo = node;
            if (goto.lineNumber) {
                const linenum = goto.lineNumber.ref?.linenum
                if (linenum && !progContext.usedLines.includes(linenum)) {
                    progContext.usedLines.push(linenum)
                }

            }
        } else if (isGoSub(node)) {
            const gosub : GoSub = node;
            if (gosub.lineNumber) {
                const linenum = gosub.lineNumber.ref?.linenum
                if (linenum && !progContext.usedLines.includes(linenum)) {
                    progContext.usedLines.push(linenum)
                }
                if (linenum && !progContext.goSubLabels.includes(linenum)) {
                    progContext.goSubLabels.push(linenum)
                }
            }
            if (gosub.label) {
                let name = gosub.label.ref?.name
                if (name?.endsWith(":")) {
                    name = name.substring(0,name.length-1)
                }
                if (name && !progContext.goSubLabels.includes(name)) {
                    progContext.goSubLabels.push(name)
                }
            }
        } else if (isIf(node)) {
            const ifNode : If = node;
            if (ifNode.lineNumber) {
                const linenum = ifNode.lineNumber.ref?.linenum
                if (linenum && !progContext.usedLines.includes(linenum)) {
                    progContext.usedLines.push(linenum)
                }
            }
        } else if (isStringLiteral(node)) {
            // We need addition 2 t_size for BString structure
            variableOffset -= 16
            const lNode : LabeledNode = node;
            lNode._variableOffset = variableOffset;
            variableOffset -= 8
        } else if (isDefFn(node)) {
            const lNode : LabeledNode = node;
            const defFn : DefFn = node;
            const pointerName = `_deffn_${defFn.name}`
            const fnType = defFn.param.name.endsWith("%") ? "int" : "float"
            if (!progContext.fnType.has(defFn.name)) {
                progContext.fnType.set(defFn.name, fnType)
            } else {
                if (fnType!==progContext.fnType.get(defFn.name)) {
                    throw "function parameter type redifinition mismatch: "+defFn.name
                }
            }
            console.log("store pointerName ",pointerName)
            if (!progContext.variables.has(pointerName)) {
                progContext.variables.set(pointerName, variableOffset)
                lNode._variableOffset = variableOffset
                variableOffset -= 8;
            }
            const paramName = `_defvar_${defFn.name}`
            if (!progContext.variables.has(paramName)) {
                progContext.variables.set(paramName, variableOffset)
                lNode._variableOffset = variableOffset
                variableOffset -= 8;
            }
        }
    }
    // create temporaty variables for bstring
    for (let i=0; i<stringTmpVarCount; i++) {
        const varName = `strtmp${i}$`
        variableOffset -= 16;
        progContext.variables.set(varName, variableOffset)
        variableOffset -= 8
    }
    // float temporaty variables
    for (let i=0; i<floatTmpVarCount; i++) {
        const varName = `floattmp${i}`
        progContext.variables.set(varName, variableOffset)
        variableOffset -= 8
    }
    progContext.tmpOffset = variableOffset
    variableOffset -= 8
    // allocate stack size pad to 16 and add 32 bytes for the stack frame
    progContext.stackAllocation = -variableOffset+(-variableOffset)%16 + 32
}

function generateStringLiterals(model: Model): string {
    let literals = ""
    let labelCounter = 0;
    for (const node of AstUtils.streamAllContents(model)) {
        if (isStringLiteral(node)) {
            const label = `.LC${labelCounter++}`;
            const str : StringLiteral = node;
            literals += `${label}:\n\t.ascii "${str.val}"\n\t.byte 0\n`;
            const lNode : LabeledNode = node;
            lNode._label = label;
        } else if (isInput(node)) {
            const label = `.LC${labelCounter++}`;
            const input : Input = node;
            let iformat = ""
            for (const ivar of input.vars) {
                if (isStrVariable(ivar.name)) {
                    iformat += "s"
                } else if (ivar.name.endsWith("%")) {
                    iformat += "i"
                } else {
                    iformat += "d"
                }
            }
            literals += `${label}:\n\t.ascii "${iformat}"\n\t.byte 0\n`;
            const lNode : LabeledNode = node;
            lNode._label = label;
        }
    }
    return literals;
}

function generateFloatLiterals(model: Model): string {
    let literals = ""
    literals += "\t.align 8\n"
    literals += ".LONE:\n\t.double 1.0\n"
    let labelCounter = 0;
    for (const node of AstUtils.streamAllContents(model)) {
        if (isFloatNumber(node)) {
            const label = `.LF${labelCounter++}`;
            const str : FloatNumber = node;
            literals += `${label}:\n\t.double ${str.val}\n`;
            const lNode : LabeledNode = node;
            lNode._label = label;
        } else if (isFor(node)) {
            const forNode : For = node;
            console.log("for node extr",node.$cstNode?.text)
            if (isFloatVar(forNode.name)) {
                console.log("for node extr float ",node.$cstNode?.text)
                if (forNode.step && isIntNumber(forNode.step)) {
                    const label = `.LF${labelCounter++}`;
                    const lNode : LabeledNode = forNode.step;
                    literals += `${label}:\n\t.double ${forNode.step.val}\n`;
                    lNode._label = label;
                    console.log("for node int label float",label)
                }
                if (forNode.end && isIntNumber(forNode.end)) {
                    const label = `.LF${labelCounter++}`;
                    const lNode : LabeledNode = forNode.end;
                    literals += `${label}:\n\t.double ${forNode.end.val}\n`;
                    lNode._label = label;
                    console.log("for node int label float2",label)
                }  else {
                    console.log("for node int label float3",forNode.end.$type)
                } 
            }
        }
    }
    return literals;
}

function initStringConstants(model: Model, progContext: ProgContext) : string {
    let stmts = "\t # init bstring constants\n";
    for (const node of AstUtils.streamAllContents(model)) {
        if (isStringLiteral(node)) {
            const lNode : LabeledNode = node;
            stmts += genCall("assignFromConst",
                {cmd:"leaq", source:`${lNode._variableOffset}(%rbp)`},
                {cmd:"leaq", source:`${lNode._label}(%rip)`});
        }
    }
    return stmts;
}

function allocateRegister(progContext: ProgContext) : string {
    const freeRegister = registers.find(r => !progContext.usedRegisters.includes(r));
    if (freeRegister) {
        progContext.usedRegisters.push(freeRegister);
    } else {
        throw "no free register available"
    }
    return freeRegister
}

function freeRegister(progContext: ProgContext, register: string) {
    progContext.usedRegisters = progContext.usedRegisters.filter(e => e !== register);
}

interface RegisterStorage {
    code: string
    restoreStack: string[]
    allocateShadowSpace: boolean
}

function storeRegister(progContext: ProgContext, toStore: string[], except: string[], allocateShadowSpace = false) : RegisterStorage {
    let code = ""
    let restoreStack = []
    for (const reg of toStore) {
        if (progContext.usedRegisters.includes(reg) && !except.includes(reg)) {
            code += genOpCode("pushq", reg);
            restoreStack.push(reg)
            progContext.tmpOffset -= 8
        }
    }
    if (allocateShadowSpace) {
        for (let i=0;i<progContext.tmpOffset;i++) {
            const varName = `floattmp${i}`
            const offset = progContext.variables.get(varName)!
            const source = `${offset}(%rbp)`
            code += genOpCode("pushq", source);
            restoreStack.push(source)
        }
        if (restoreStack.length>0) {
            // The stack needs to be 16 bytes aligned
            if (restoreStack.length%2===1) {
                code += genOpCode("pushq", "%rax");
                restoreStack.push("%rax")
            }
            // need 16 bytes aligment (8 for ret address)
            code += genOpCode("subq", "$32", "%rsp");
        }
    }
    return {code, restoreStack, allocateShadowSpace}
}

function restoreRegister(registerStorage: RegisterStorage) : string {
    let code = ""
    for (const reg of registerStorage.restoreStack.reverse()) {
        code += genOpCode("popq", reg);
    }
    if (registerStorage.allocateShadowSpace && registerStorage.restoreStack.length>0) {
        code += genOpCode("addq", "$32", "%rsp");
    }
    return code
}


function allocateXmmRegister(progContext: ProgContext) : string {
    const freeRegister = xmmRegisters.find(r => !progContext.usedXmmRegisters.includes(r));
    if (freeRegister) {
        progContext.usedXmmRegisters.push(freeRegister);
    } else {
        throw "no free xmm register available"
    }
    return freeRegister
}

function freeXmmRegister(progContext: ProgContext, register: string) {
    progContext.usedXmmRegisters = progContext.usedXmmRegisters.filter(e => e !== register);
}

class ForGenerator {
  forNode: For;
  progContext: ProgContext;
  labelNode: LabeledNode;
  condLabel: string;
  codeLabel: string;
  condStepNegLabel: string;
  condContinue: string;
  varName: string;
  isIntVar: boolean;
  varOffset: number;
  code = "";
  stepConstant: string | undefined;
  toConstant: string | undefined;
  hasNegStepCond = false;
  primaryReg = "%rax";
  addOp = "addq";

  constructor(forNode: For, progContext: ProgContext) {
    this.forNode = forNode;
    this.progContext = progContext;
    this.labelNode = forNode;
    this.condLabel = `.forNext${this.progContext.forLabelCounter}`;
    this.codeLabel = `.for${this.progContext.forLabelCounter}`;
    this.condStepNegLabel = `.forStepNeg${this.progContext.forLabelCounter}`;
    this.condContinue = `.forCont${this.progContext.forLabelCounter++}`;
    this.varName = this.forNode.name.name;
    this.isIntVar = this.varName.endsWith("%");
    this.varOffset = this.progContext.variables.get(this.varName)!;
    if (!this.varOffset) {
      throw "can not find for variable offset: " + this.varName;
    }
    if (!this.isIntVar) {
      this.primaryReg = "%xmm0";
      this.addOp = "addsd";
    }
  }

  generate(): string {
    const forEntry: ForEntry = {
      label: this.condLabel,
      variable: this.varName,
    };
    this.progContext.forStack.push(forEntry);

    this.initForVariable();
    this.initStepVariable();
    this.initToVariable();

    this.code += genOpCode("jmp", this.codeLabel);
    this.code += `${this.condLabel}:\n`;
    this.code += genOpCode("movq", `${this.varOffset}(%rbp)`, this.primaryReg);
    if (this.isIntVar) {
      if (this.labelNode._stepOffset) {
        this.code += genOpCode("addq",`${this.labelNode._stepOffset}(%rbp)`,"%rax");
        this.code += genOpCode("cmpq","$0",`${this.labelNode._stepOffset}(%rbp)`);
        this.code += genOpCode("js", this.condStepNegLabel);
      } else {
        this.code += genOpCode("addq", `$${this.stepConstant}`, "%rax");
      }
    } else {
      if (this.labelNode._stepOffset) {
        this.code += genOpCode("addsd",`${this.labelNode._stepOffset}(%rbp)`,"%xmm0");
        // Test if step var negative
        this.code += genOpCode("xorpd","%xmm1","%xmm1");
        this.code += genOpCode("comisd",`${this.labelNode._stepOffset}(%rbp)`, "%xmm1");
        this.code += genOpCode("ja", this.condStepNegLabel);
      } else {
        if (this.stepConstant === "1") {
          this.code += genOpCode("addsd", `.LONE(%rip)`, "%xmm0");
        } else {
          const lNode: LabeledNode = this.forNode.step!;
          this.code += genOpCode("addsd", `${lNode._label}(%rip)`, "%xmm0");
        }
      }
    }
    this.genVarComp()
    this.genCondJmp(!!this.stepConstant && parseFloat(this.stepConstant) < 0)
    this.code += genOpCode("ret");
    if (this.hasNegStepCond) {
      this.code += `${this.condStepNegLabel}:\n`;
      this.genVarComp()
      this.genCondJmp(true);
      this.code += genOpCode("ret");
    }
    this.code += `${this.condContinue}:\n`;
    this.code += genOpCode("movq", this.primaryReg, `${this.varOffset}(%rbp)`);
    // Reset the return address from next
    this.code += genOpCode("pop", "%rax");
    this.code += `${this.codeLabel}:\n`;
    return this.code;
  }
  genCondJmp(isNegate = false) {
    if (this.isIntVar) {
        this.code += genOpCode(isNegate ? "jge" : "jle", this.condContinue);
    } else {
        this.code += genOpCode(isNegate ? "jnb" : "jbe", this.condContinue);
    }
  }
  genVarComp() {
    if (this.isIntVar) {
      if (this.labelNode._toOffset) {
        this.code += genOpCode("cmpq",`${this.labelNode._toOffset}(%rbp)`,"%rax");
      } else {
        this.code += genOpCode("cmpq", `$${this.toConstant}`, "%rax");
      }
    } else {
      if (this.labelNode._toOffset) {
        this.code += genOpCode("ucomisd",`${this.labelNode._toOffset}(%rbp)`,"%xmm0");
      } else {
        const lNode: LabeledNode = this.forNode.end;
        this.code += genOpCode("ucomisd", `${lNode._label}(%rip)`, "%xmm0");
      }
    }
  }

  initForVariable() {
    if (this.isIntVar) {
      const register = allocateRegister(this.progContext);
      this.code += exprToInt(this.forNode.start, register, this.progContext);
      this.code += genOpCode("movq", register, `${this.varOffset}(%rbp)`);
      freeRegister(this.progContext, register);
    } else {
      const floatResult = exprToFloat(this.forNode.start, this.progContext);
      this.code += floatResult.code;
      this.code += genOpCode("movsd", floatResult.source!, "%xmm0");
      freeFloatTmp(this.progContext, floatResult.tmpOffset);
      this.code += genOpCode("movsd", "%xmm0", `${this.varOffset}(%rbp)`);
    }
  }
  initStepVariable() {
    this.stepConstant = undefined;
    this.code += `# stepoffset ${this.labelNode._stepOffset} tooffset ${this.labelNode._toOffset}\n`;
    if (this.labelNode._stepOffset) {
      if (this.isIntVar) {
        this.code += exprToInt(this.forNode.step!, "%rax", this.progContext);
        this.code += genOpCode("movq","%rax",`${this.labelNode._stepOffset}(%rbp)`);
        this.hasNegStepCond = true;
      } else {
        const floatResult = exprToFloat(this.forNode.step!, this.progContext);
        this.code += floatResult.code;
        this.code += genOpCode("movsd", floatResult.source!, "%xmm0");
        freeFloatTmp(this.progContext, floatResult.tmpOffset);
        this.code += genOpCode("movsd","%xmm0",`${this.labelNode._stepOffset}(%rbp)`);
        this.hasNegStepCond = true;
      }
    } else {
      if (this.forNode.step) {
        if (
          isIntNumber(this.forNode.step) ||
          isFloatNumber(this.forNode.step)
        ) {
          this.stepConstant = this.forNode.step.val.toString();
        }
      } else {
        this.stepConstant = "1";
      }
    }
  }
  initToVariable() {
    if (this.labelNode._toOffset) {
      if (this.isIntVar) {
        this.code += exprToInt(this.forNode.end, "%rax", this.progContext);
        this.code += genOpCode("movq","%rax",`${this.labelNode._toOffset}(%rbp)`);
      } else {
        const floatResult = exprToFloat(this.forNode.end, this.progContext);
        this.code += floatResult.code;
        this.code += genOpCode("movsd", floatResult.source!, "%xmm0");
        freeFloatTmp(this.progContext, floatResult.tmpOffset);
        this.code += genOpCode("movsd","%xmm0",`${this.labelNode._toOffset}(%rbp)`);
      }
    } else {
      if (this.forNode.end) {
        if (isIntNumber(this.forNode.end) || isFloatNumber(this.forNode.end)) {
          this.toConstant = this.forNode.end.val.toString();
        }
      } else {
        throw "for loop without to";
      }
    }
  }
}