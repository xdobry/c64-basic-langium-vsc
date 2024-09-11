import { isStringLiteral, StringLiteral, type Model, isCmd, isLabel, isPrint, Print, SExprt, isVar, isGoTo, GoTo, 
    isLetStr, LetStr, isLetNum, LetNum, isStringVarRef, StringVarRef, isIntVarRef, 
    IntVarRef, isIntNumber, IntNumber, isExpr, Expr, isBinExpr, BinExpr, isNegExpr, NegExpr, isGroupExpr, 
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
    StringFunction3} from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { AstNode, AstUtils } from 'langium';

interface ProgContext {
    stackAllocation: number
    usedRegisters: string[]
    variables: Map<string, number>
    ifLabelCounter: number
    forLabelCounter: number
    copyLabelCounter: number
    goSubLabelCounter: number
    forStack: ForEntry[]
    usedLines: string[]
    goSubLabels: string[]
    stringTmpCount : number
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
const registers : string[] = ["%rbx","%rcx","%rdx","%rsi","%rdi","%r8","%r9","%r10","%r11","%r12","%r13","%r14","%r15"]

// Register that must be preserved during c-call
// const preservedRegister : string[] = ["%rbx","%rbp","%rsp","%r12","%r13","%r14","%r15"]
// Special Registers
// %rbp - data pointer on stack
// %rsp - stack pointer

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
    const progContext: ProgContext = {
        stackAllocation: 0,
        usedRegisters: [],
        variables: new Map(),
        ifLabelCounter: 0,
        forLabelCounter: 0,
        copyLabelCounter: 0,
        goSubLabelCounter: 0,
        forStack: [],
        usedLines: [],
        goSubLabels: [],
        stringTmpCount: 0,
        tmpOffset: 0
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

    const all = preamble + stringLiterals + code;
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
                    code += genOpCode("movq", `${stringResult.varOffset}(%rbp)`, "%rcx");
                    code += genOpCode("call", "puts");
                    code += freeStrTmp(progContext, stringResult.tmpOffset);
                } else {
                    const tmpVarOffset = allocateStrTmp(progContext);
                    let isFirst : boolean = true
                    for (const expr of print.exprs) {
                        if (isFirst) {
                            const stringResult = exprAsBString(expr,progContext);
                            code += stringResult.code;
                            code += genOpCode("leaq", `${tmpVarOffset}(%rbp)`, "%rcx");
                            code += genOpCode("leaq", `${stringResult.varOffset}(%rbp)`, "%rdx");
                            code += genOpCode("call", "assignBString");
                            code += freeStrTmp(progContext, stringResult.tmpOffset);
                            isFirst = false;
                        } else {
                            const stringResult = exprAsBString(expr,progContext);
                            code += stringResult.code;
                            code += genOpCode("leaq", `${tmpVarOffset}(%rbp)`, "%rcx");
                            code += genOpCode("leaq", `${stringResult.varOffset}(%rbp)`, "%rdx");
                            code += genOpCode("call", "appendBString");
                            code += freeStrTmp(progContext, stringResult.tmpOffset);
                        }
                    }
                    code += genOpCode("movq", `${tmpVarOffset}(%rbp)`, "%rcx");
                    code += genOpCode("call", "puts");
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
                code += exprToInt(letNode.expr, "%rax", progContext);
                code += genOpCode("movq", "%rax", `${lNode._variableOffset}(%rbp)`);
            } else  if (isLetStr(node)) {
                const letNode : LetStr = node;
                const lNode : LabeledNode = letNode.name;
                const strResult = exprAsBString(letNode.expr,progContext);
                code += strResult.code;
                code += genOpCode("leaq", `${lNode._variableOffset}(%rbp)`, "%rcx");
                code += genOpCode("leaq", `${strResult.varOffset}(%rbp)`, "%rdx");
                code += genOpCode("call", "assignBString");
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
                const forNode : For = node;
                const labelNode : LabeledNode = node;
                const condLabel = `.forNext${progContext.forLabelCounter}`
                const codeLabel = `.for${progContext.forLabelCounter}`
                const condContinue = `.forCont${progContext.forLabelCounter++}`
                const varName = forNode.name.name
                const forEntry : ForEntry = {label: condLabel, variable: varName}
                progContext.forStack.push(forEntry)
                code += exprToInt(forNode.start, "%rax", progContext)
                const varOffset = progContext.variables.get(varName)
                if (varOffset) {
                    code += genOpCode("movq", "%rax", `${varOffset}(%rbp)`);
                } else {
                    throw "can not find for variable offset: " + varName
                }
                let stepConstant = undefined
                if (labelNode._stepOffset) {
                    code += exprToInt(forNode.step!, "%rax", progContext)
                    code += genOpCode("movq", "%rax", `${labelNode._stepOffset}(%rbp)`);
                } else {
                    if (forNode.step) {
                        if (isIntNumber(forNode.step)) {
                            stepConstant = forNode.step.val.toString()
                        }
                    } else {
                        stepConstant = "1"
                    }
                }
                let toConstant = undefined
                if (labelNode._toOffset) {
                    code += exprToInt(forNode.end, "%rax", progContext)
                    code += genOpCode("movq", "%rax", `${labelNode._toOffset}(%rbp)`);
                } else {
                    if (forNode.end) {
                        if (isIntNumber(forNode.end)) {
                            toConstant = forNode.end.val.toString()
                        }
                    } else {
                        throw "for loop without to"
                    }
                }
                code +=  genOpCode("jmp", codeLabel);
                code += `${condLabel}:\n`
                code +=  genOpCode("movq", `${varOffset}(%rbp)`, "%rax");
                if (labelNode._stepOffset) {
                    code +=  genOpCode("addq", `${labelNode._stepOffset}(%rbp)`, "%rax");
                } else {
                    code +=  genOpCode("addq", `$${stepConstant}`, "%rax");
                }
                if (labelNode._toOffset) {
                    code +=  genOpCode("cmpq", `${labelNode._toOffset}(%rbp)`, "%rax");
                } else {
                    code +=  genOpCode("cmpq", `$${toConstant}`, "%rax");
                }
                code +=  genOpCode("jle", condContinue);
                code +=  "\tret\n";
                code += `${condContinue}:\n`                
                code +=  genOpCode("movq", "%rax", `${varOffset}(%rbp)`);
                // Reset the return address from next
                code +=  genOpCode("pop", "%rax");
                code += `${codeLabel}:\n`
            } else if (isNext(node)) {
                const nextNode : Next = node;
                if (!nextNode.name) {
                    throw "unsupported next without name"
                }
                const varName = nameForVarRef(nextNode.name, progContext)
                const forEntries = progContext.forStack.filter(e => e.variable === varName);
                // We try to get the last for entry for the variable
                // Unfortunatelly in basic the end of the for loop is not clear
                if (forEntries.length>0) {
                    code +=  genOpCode("call", forEntries[forEntries.length-1].label);
                } else {
                    throw "can not find next for entry: " + varName
                }
            } else if (isEnd(node)) {
                code += genOpCode("jmp", ".basicend");
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

interface BStringResult {
    varOffset: number
    code: string
    tmpOffset?: number
}

function exprAsBString(expr: SExprt | SExpr, progContext: ProgContext) : BStringResult {
    let code = ""
    let variableOffset = 0
    let tmpOffset : number | undefined = undefined
    if (isStringLiteral(expr)) {
        const lNode : LabeledNode = expr;
        variableOffset = lNode._variableOffset!
    } else if (isStringVarRef(expr)) {
        const stringVarRef : StringVarRef = expr;
        const lNode : AstNode = stringVarRef.var.ref!;
        // the reference should be StringVariable but is Let
        if (isLetStr(lNode)) {
            const letNode : LetStr = lNode;
            const lNode2 : LabeledNode = letNode.name
            variableOffset = lNode2._variableOffset!
        } else {
            throw "error: expecting Let node as string reference: "+lNode.$type
        }
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
    } else if (isExpr(expr)) {
        const exprNode : Expr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        code += exprToInt(exprNode, "%rdx", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("call", "assignInt");
    } else if (isSBinExpr(expr)) {
        const sBinExpr : SBinExpr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        const strResult1 =  exprAsBString(sBinExpr.e1, progContext);
        code += strResult1.code;
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("leaq", `${strResult1.varOffset}(%rbp)`, "%rdx");
        code += genOpCode("call", "assignBString");
        code += freeStrTmp(progContext, strResult1.tmpOffset);
        const strResult2 =  exprAsBString(sBinExpr.e2, progContext);
        code += strResult2.code;
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("leaq", `${strResult2.varOffset}(%rbp)`, "%rdx");
        code += genOpCode("call", "appendBString");
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


function allocateStrTmp(progContext: ProgContext) : number {
    const tmpNum = progContext.stringTmpCount
    progContext.stringTmpCount++
    const varName = `strtmp${tmpNum}$`
    return progContext.variables.get(varName)!
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

/*
function preserveRegister(progContext: ProgContext) : string {
    let stmts = ""
    for (const reg of progContext.usedRegisters) {
        if (!preservedRegister.includes(reg)) {
            stmts += genOpCode("pushq", reg);
        }
    }
    return stmts
}

function restoreRegister(progContext: ProgContext) : string {
    let stmts = ""
    for (const reg of progContext.usedRegisters.reverse()) {
        if (!preservedRegister.includes(reg)) {
            stmts += genOpCode("popq", reg);
        }
    }
    return stmts
}
*/


function exprToInt(expr: Expr, reg: string, progContext: ProgContext) : string {
    let stmts = ""
    if (isIntNumber(expr)) {
        const intNumber : IntNumber = expr;
        stmts += genOpCode("movq", `$${intNumber.val.toString()}`, reg);
    } else if (isIntVarRef(expr)) {
        const intVarRef : IntVarRef = expr;
        const lNode : AstNode = intVarRef.var.ref!;
        // the reference should be StringVariable but is Let
        if (isLetNum(lNode)) {
            const letNode : LetNum = lNode;
            const lNode2 : LabeledNode = letNode.name
            stmts += genOpCode("movq", `${lNode2._variableOffset}(%rbp)`, reg);
        } else if (isFor(lNode)) {
            const forNode : For = lNode;
            const lNode2 : LabeledNode = forNode.name
            stmts += genOpCode("movq", `${lNode2._variableOffset}(%rbp)`, reg);
        } else {
            throw  "error: expecting Let node as int reference: "+lNode.$type
        }
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
            stmts += genOpCode("idivq", reg2);
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
    } else {
        throw "unknown expression: "+expr.$type
    }
    return stmts;
}


function genOpCode(cmd: string, arg1?: string, arg2?: string) {
    if (arg1) {
        return `\t${cmd}\t${arg1}${arg2 ? `, ${arg2}` : ""}\n`;
    } else {
        return `\t${cmd}\n`;
    }
}

function isStrVariable(varname: string) : boolean {
    return varname.endsWith("$");
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
                variableOffset -= 8;
                lNode._stepOffset = variableOffset
            }
            if (forNode.end && !isIntNumber(forNode.end)) {
                variableOffset -= 8;
                lNode._toOffset = variableOffset
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
        }
    }
    // create temporaty variables for bstring
    for (let i=0; i<5; i++) {
        const varName = `strtmp${i}$`
        variableOffset -= 16;
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
        }
    }
    return literals;
}

function initStringConstants(model: Model, progContext: ProgContext) : string {
    let stmts = "\t # init bstring constants\n";
    for (const node of AstUtils.streamAllContents(model)) {
        if (isStringLiteral(node)) {
            const lNode : LabeledNode = node;
            stmts += genOpCode("leaq", `${lNode._variableOffset}(%rbp)`,"%rcx");
            stmts += genOpCode("leaq", `${lNode._label}(%rip)`, "%rdx");
            stmts += genOpCode("call", "assignFromConst");
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