import { isStringLiteral, StringLiteral, type Model, isCmd, isLabel, isPrint, Print, SExprt, isVar, isGoTo, GoTo, 
    isLetStr, LetStr, isLetNum, LetNum, isStringVarRef, StringVarRef, isIntVarRef, 
    IntVarRef, isIntNumber, IntNumber, isExpr, Expr, isBinExpr, BinExpr, isNegExpr, NegExpr, isGroupExpr, 
    GroupExpr, Label, isIf, If, isFor, For, isNext, Next, isEnd, 
    AllVarRef,
    SExpr,
    isSBinExpr,
    SBinExpr,
    SPrimExpr,
    Stmt} from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { AstNode, AstUtils } from 'langium';

interface ProgContext {
    stackAllocation: number
    atoiBuffer: number
    usedRegisters: string[]
    variables: Map<string, number>
    ifLabelCounter: number
    forLabelCounter: number
    copyLabelCounter: number
    forStack: ForEntry[]
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
// RCX, RDX, R8, R9

// Register to be used (beside %rax)
const registers : string[] = ["%rbx","%rcx","%rdx","%rsi","%rdi","%r8","%r9","%r10","%r11","%r12","%r13","%r14","%r15"]

// Register that must be preserved during c-call
const preservedRegister : string[] = ["%rbx","%rbp","%rsp","%r12","%r13","%r14","%r15"]

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
        atoiBuffer: 0,
        usedRegisters: [],
        variables: new Map(),
        ifLabelCounter: 0,
        forLabelCounter: 0,
        copyLabelCounter: 0,
        forStack: []
    }
    generateVariables(model, progContext)

    let programmCode = ""
    for (const line of model.lines) {
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
        if (isCmd(node)) {
            code += `\t# ${node.$cstNode?.text}\n`;
            if (isLabel(node)) {
                const lNode : Label = node;
                code += `.${lNode.name}:\n`;
            } else if (isPrint(node)) {
                const print : Print = node;
                progContext.usedRegisters.push("%rcx")
                code += exprArrayToStringPointer(print.exprs, "%rcx",progContext);
                freeRegister(progContext, "%rcx")
                code += genOpCode("call", "puts");
            } else if (isGoTo(node)) {
                const goto : GoTo = node;
                code += genOpCode("jmp", "."+goto.label!.ref?.name!);
            } else if (isLetNum(node)) {
                const letNode : LetNum = node;
                const lNode : LabeledNode = letNode.name;
                code += exprToInt(letNode.expr, "%rax", progContext);
                code += genOpCode("movq", "%rax", `${lNode._variableOffset}(%rbp)`);
            } else  if (isLetStr(node)) {
                const letNode : LetStr = node;
                const lNode : LabeledNode = letNode.name;
                code += exprToStringPointer(letNode.expr, "%rax",progContext);
                code += genOpCode("movq", "%rax", `${lNode._variableOffset}(%rbp)`);
            } else if (isIf(node)) {
                const ifNode : If = node;
                const notIfLabel = `.ifnot${progContext.ifLabelCounter++}`
                code += conditionToAssembler(ifNode.cond, progContext, notIfLabel);
                code += generateStmts(ifNode.stmts,progContext);
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
    code += genOpCode("jne", notIfLabel);
    return code
}


function exprToStringPointer(expr: SExprt | SExpr, reg: string, progContext: ProgContext) : string {
    let stmts = ""
    if (isStringLiteral(expr)) {
        const lNode : LabeledNode = expr;
        stmts += genOpCode("leaq", `${lNode._label}(%rip)`, reg);
    } else if (isStringVarRef(expr)) {
        const stringVarRef : StringVarRef = expr;
        const lNode : AstNode = stringVarRef.var.ref!;
        // the reference should be StringVariable but is Let
        if (isLetStr(lNode)) {
            const letNode : LetStr = lNode;
            const lNode2 : LabeledNode = letNode.name
            stmts += genOpCode("movq", `${lNode2._variableOffset}(%rbp)`, reg);
        } else {
            console.log("error: expecting Let node as string reference")
        }
    } else if (isIntVarRef(expr)) {
        const intVarRef : IntVarRef = expr;
        const lNode : AstNode = intVarRef.var.ref!;
        // the reference should be StringVariable but is Let
        if (isLetNum(lNode)) {
            const letNode : LetNum = lNode;
            const lNode2 : LabeledNode = letNode.name
            stmts += genOpCode("movq", `${lNode2._variableOffset}(%rbp)`, reg);
            stmts += atoi(reg, reg, progContext);
        } else {
            console.log("error: expecting Let node as int reference")
        }
    } else if (isExpr(expr)) {
        const exprNode : Expr = expr;
        stmts += exprToInt(exprNode, reg, progContext);
        stmts += atoi(reg, reg, progContext);
    } else if (isSBinExpr(expr)) {
        const sBinExpr : SBinExpr = expr;
        console.log("sbin",sBinExpr.$type)
        stmts += preserveRegister(progContext)
        stmts += genOpCode("movq", "$2048", "%rax");
        stmts += genOpCode("call","malloc");
        stmts += restoreRegister(progContext)
        stmts += genOpCode("movb", "$0","(%rax)");
        stmts += genOpCode("pushq", "%rax");
        const targetStrPtr = allocateRegister(progContext)
        stmts += genOpCode("movq", "%rax", targetStrPtr);
        stmts += copyStrings([sBinExpr.e1,sBinExpr.e2],progContext,targetStrPtr)
        freeRegister(progContext,targetStrPtr)
        stmts += genOpCode("popq", reg);
    } else {
        throw "unknown string expression: "+expr
    }
    return stmts;
}

function copyStrings(exprs: SPrimExpr[], progContext: ProgContext, targetStrPtr: string) : string {
    let code = ""
    for (const expr of exprs) {
        if (isStringLiteral(expr)) {
            const lNode : LabeledNode = expr;
            const sourceStrPtr = allocateRegister(progContext)
            code += genOpCode("leaq", `${lNode._label}(%rip)`, sourceStrPtr);
            const copyLabel = ".copy"+progContext.copyLabelCounter++
            code += `${copyLabel}:\n`
            code += genOpCode("movb", `(${sourceStrPtr}), %al`);
            code += genOpCode("movb", "%al", `(${targetStrPtr})`);
            code += genOpCode("incq", sourceStrPtr);
            code += genOpCode("incq", targetStrPtr);
            code += genOpCode("cmpb", "$0", "%al");
            code += genOpCode("jne", `${copyLabel}`);
            code += genOpCode("decq", targetStrPtr); 
            freeRegister(progContext, sourceStrPtr)
        } else if (isStringVarRef(expr)) {
            const stringVarRef : StringVarRef = expr;
            const lNode : AstNode = stringVarRef.var.ref!;
            // the reference should be StringVariable but is Let
            if (isLetStr(lNode)) {
                const letNode : LetStr = lNode;
                const lNode2 : LabeledNode = letNode.name
                const sourceStrPtr = allocateRegister(progContext)
                code += genOpCode("movq", `${lNode2._variableOffset}(%rbp)`, sourceStrPtr);
                const copyLabel = ".copy"+progContext.copyLabelCounter++
                code += `${copyLabel}:\n`
                code += genOpCode("movb", `(${sourceStrPtr}), %al`);
                code += genOpCode("movb", "%al", `(${targetStrPtr})`);
                code += genOpCode("incq", sourceStrPtr);
                code += genOpCode("incq", targetStrPtr);
                code += genOpCode("cmpb", "$0", "%al");
                code += genOpCode("jne", `${copyLabel}`);
                code += genOpCode("decq", targetStrPtr); 
                freeRegister(progContext, sourceStrPtr)
            } else {
                throw "error: expecting Let node as string reference"
            }
        } else {
            throw "unsupported SPringExpr: "+expr.$type
        }
    }
    return code;
}

function nameForVarRef(varRef: AllVarRef, progContext: ProgContext) : string {
    const lNode : AstNode = varRef.var.ref!;
    if (isLetNum(lNode)) {
        const letNode : LetNum = lNode;
        return letNode.name.name
    } if (isLetStr(lNode)) {
        const letNode : LetStr = lNode;
        return letNode.name.name
    } else {
        throw "error: expecting Let node as string reference"
    }
}

function atoi(intReg: string, targetReg: string, progContext: ProgContext) : string {
    let stmts = ""
    stmts += preserveRegister(progContext)
    if (intReg!=="%rcx") {
        stmts += genOpCode("movq", intReg, "%rcx");
    }
    stmts += genOpCode("leaq", `${progContext.atoiBuffer}(%rbp)`, "%rdx");
    stmts += genOpCode("movl", "$10", "%r8d");
    stmts += genOpCode("call", "itoa");
    stmts += genOpCode("leaq", `${progContext.atoiBuffer}(%rbp)`,targetReg);
    stmts += restoreRegister(progContext)
    return stmts
}

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
        } else {
            console.log("error: expecting Let node as int reference")
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
    } else {
        throw "unknown expression: "+expr.$type
    }
    return stmts;
}

function exprArrayToStringPointer(exprs: SExprt[], reg: string, progContext: ProgContext) : string {
    let stmts = ""
    if (exprs.length == 1) {
        return exprToStringPointer(exprs[0], reg, progContext);
    }
    const pointerSourceReg = allocateRegister(progContext)
    stmts += genOpCode("leaq", `.buffer(%rip)`, reg);
    for (const expr of exprs) {
        stmts += exprToStringPointer(expr, pointerSourceReg, progContext);
        const copyLabel = ".copy"+progContext.copyLabelCounter++
        stmts += `${copyLabel}:\n`
        stmts += genOpCode("movb", `(${pointerSourceReg}), %al`);
        stmts += genOpCode("movb", "%al", `(${reg})`);
        stmts += genOpCode("incq", pointerSourceReg);
        stmts += genOpCode("incq", reg);
        stmts += genOpCode("cmpb", "$0", "%al");
        stmts += genOpCode("jne", `${copyLabel}`);
        stmts += genOpCode("decq", reg);        
    }
    stmts += genOpCode("leaq", `.buffer(%rip)`, reg);
    freeRegister(progContext, pointerSourceReg)
    return stmts;
}

function genOpCode(cmd: string, arg1: string, arg2?: string) {
    return `\t${cmd}\t${arg1}${arg2 ? `, ${arg2}` : ""}\n`;
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
                progContext.variables.set(varName, variableOffset)
                lNode._variableOffset = variableOffset
                variableOffset -= 8;
                //console.log("setting offset", node)
            }
        }
        if (isFor(node)) {
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
        }
    }
    // create 24 bytes lenght buffer for atoi and pad to 16 bytes
    variableOffset -= 24
    progContext.atoiBuffer = variableOffset-(-variableOffset)%16
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