import { isStringLiteral, StringLiteral, type Model, isCmd, isPrint, Print, SExprt, isVar, isGoTo, GoTo, 
    isLetStr, LetStr, isLetNum, LetNum, isStringVarRef, isIntVarRef, 
    isIntNumber, IntNumber, isExpr, Expr, isBinExpr, BinExpr, isNegExpr, NegExpr, isGroupExpr, 
    GroupExpr, isIf, If, isFor, For, isNext, Next, isEnd, 
    AllVarRef,
    SExpr,
    isSBinExpr,
    SBinExpr,
    Stmt,
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
    FnCall,
    isDim,
    Dim,
    isStrComparision,
    StrComparision,
    isStr,
    Str,
    isVal,
    Val,
    isNotExpr,
    NotExpr,
    isOnGoto,
    OnGoto,
    Line,
    isOnGoSub,
    OnGoSub,
    isPoke,
    Poke,
    isData,
    isRead,
    Data,
    Read,
    isRestore,
    isStringFunction1,
    StringFunction1,
    Var,
    isTiVarRef,
    isPiConst,
    isSExpr} from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { AstNode, AstUtils, CstNode, Reference } from 'langium';
import { GenerateOptions } from './main.js';

interface ProgContext {
    stackAllocation: number
    usedRegisters: string[]
    usedXmmRegisters: string[]
    variables: Map<string, number>
    fnType: Map<string,string>
    variableRank: Map<string,number>
    ifLabelCounter: number
    forLabelCounter: number
    copyLabelCounter: number
    goSubLabelCounter: number
    defnLabelCounter: number
    dimLabelCounter: number
    forStack: ForEntry[]
    usedLines: string[]
    goSubLabels: string[]
    stringTmpCount : number
    floatTmpCount : number
    floatTmps: string[]
    stringTmps: string[]
    // tmp variable offset for quat integer 
    tmpOffset: number
    pokeMemOffset: number
    dataPointerOffset: number
    jmpTablesCounter: number
    jmpTables: string
    dataDefinition: string
    currentNode?: AstNode
    reuseTmpStrMem: boolean
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
const registers : string[] = ["%rsi","%rdi","%r12","%r13","%r14","%r15","%rbx","%r8","%r9","%r10","%r11","%rcx","%rdx"]

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

export class CompileError extends Error {
    cstNode?: CstNode;

    constructor(message: string, cstNode?: CstNode) {
        super(message);
        this.cstNode = cstNode;
    }
}

export function generateAssemblerCode(model: Model, filePath: string, opt: GenerateOptions): string {
    const data = extractDestinationAndName(filePath, opt.destination);
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
        variableRank: new Map(),
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
        dimLabelCounter: 0,
        jmpTablesCounter: 0,
        jmpTables: '',
        pokeMemOffset: 0,
        dataPointerOffset: 0,
        dataDefinition: '',
        floatTmps: [],
        stringTmps: [],
        reuseTmpStrMem: !opt.eager_free_memory
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
    progContext.variableRank.forEach((value, key) => {
        const aoffset = progContext.variables.get(key)
        if (!aoffset) {
            throw new CompileError("can not find arr variable offset for: "+key,undefined)
        }
        programmCode += `\t# init array ${key} ${value}\n`;
        programmCode += genCall("c64_init_array",progContext, {cmd:'lea',source:`${aoffset}(%rbp)`},{cmd:'movq',source:`$${value}`})
    })
    if (progContext.dataPointerOffset!==0) {
        programmCode += `\t# init data pointer\n`;
        programmCode += genOpCode("lea","dataDefinition(%rip)","%rax");
        programmCode += genOpCode("movq","%rax",`${progContext.dataPointerOffset}(%rbp)`);
    }
    if (progContext.pokeMemOffset!==0) {
        programmCode += `\t# init peek/poke 64k memory\n`;
        // allocate 64k (2<<5) bytes for peek and poke
        programmCode += genCall("calloc",progContext, {cmd:'movq',source:"$1"},{cmd:'movq',source:`$${2<<15}`})
        programmCode += genOpCode("movq","%rax",`${progContext.pokeMemOffset}(%rbp)`)
    }

    programmCode += "\t# set rounding mode to floor to be compatible with c64 rounding\n"
    // it is not clear if this settings are preserved during c-call
    // or not influence it negatively
    programmCode += genOpCode("stmxcsr", `${progContext.tmpOffset}(%rbp)`)
    programmCode += genOpCode("andl", "$0xFFFF9FFF", `${progContext.tmpOffset}(%rbp)`)
    programmCode += genOpCode("orl", "$0x2000", `${progContext.tmpOffset}(%rbp)`)
    programmCode += genOpCode("ldmxcsr", `${progContext.tmpOffset}(%rbp)`)

    programmCode += initStringConstants(model, progContext)

    for (const line of model.lines) {
        if (line.linenum && progContext.usedLines.includes(line.linenum)) {
            programmCode += `.line${line.linenum}:\n`;
        }
        if (line.lineLabel) {
            const name : string = line.lineLabel.substring(0,line.lineLabel.length-1)
            programmCode += `.${name}:\n`;
        }
        programmCode += generateStmts(line.stmts, progContext);
    }

    const code = `
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

    if (progContext.jmpTables!=="") {
        progContext.jmpTables = "# jump tables for goto and gosub\n" + progContext.jmpTables
    }
    if (progContext.dataDefinition!=="") {
        progContext.dataDefinition = "\t.align 4\ndataDefinition:\n" + progContext.dataDefinition
    }

    const all = preamble + stringLiterals + floatLiterals + progContext.jmpTables + progContext.dataDefinition + code;
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
        progContext.currentNode = node
        if (isCmd(node)) {
            code += `\t# ${node.$cstNode?.text}\n`;
            if (isPrint(node)) {
                const print : Print = node;
                if (print.exprs.length==0) {
                    code += genCall("printBString",progContext,
                        {cmd: "movq", source: "$0"},
                        {cmd: "movq", source: "$8"}
                    )
                } else {
                    let num = 0
                    for (const expr of print.exprs) {
                        const stringResult = exprAsBString(expr,progContext);
                        code += stringResult.code;
                        let flags = 0
                        if (isExpr(expr)) {
                            flags |= 4
                        }
                        if (expr.sep===',') {
                            flags |= 1
                        }
                        if (num===print.exprs.length-1 && expr.sep!==';') {
                            flags |= 8
                        }
                        code += genCall("printBString",progContext,
                            {cmd: "leaq", source: `${stringResult.varOffset}(%rbp)`},
                            {cmd: "movq", source: `$${flags}`});
                        code += freeStrTmp(progContext, stringResult.tmpOffset);
                        num += 1
                    }
                }
            } else if (isGoSub(node)) {
                const contLabel = `.gosubCont${progContext.goSubLabelCounter++}`
                code += genCall("pushEntry",progContext,{cmd:"leaq",source:`${contLabel}(%rip)`})
                code += genOpCode("jmp",getJmpLabel(node.label ? node.label : node.lineNumber,progContext))
                code += `${contLabel}:\n`
            } else if (isGoTo(node)) {
                code += genOpCode("jmp",getJmpLabel(node.label ? node.label : node.lineNumber,progContext))
            } else if (isReturn(node)) {
                code += genCall("popEntry",progContext)
                code += genOpCode("jmp","*%rax");
            } else if (isLetNum(node)) {
                const letNode : LetNum = node;
                const isArray = letNode.name.indexes.length>0
                const varName = isArray? letNode.name.name+"[]" : letNode.name.name
                const offset = progContext.variables.get(varName)
                if (!offset) {
                    throw new CompileError("can not find variable offset for let: "+varName,node.$cstNode)
                }
                if (isFloatVar(letNode.name)) {
                    const xmmReg = allocateXmmRegister(progContext);
                    const floatResult = exprToFloat(letNode.expr, progContext);
                    code += floatResult.code;
                    if (isArray) {
                        code += genArrIndex(varName, letNode.name.indexes, progContext)
                        code += genOpCode("lea", `${offset}(%rbp)`,"%rcx");
                        code += genOpCode("call", "c64_get_item_ptr");
                        code += genOpCode("movq", floatResult.source!, "%rbx");
                        code += genOpCode("movq", "%rbx", "(%rax)");
                    } else {
                        code += genOpCode("movsd", floatResult.source!, xmmReg);
                        code += genOpCode("movsd", xmmReg, `${offset}(%rbp)`);
                    }
                    freeFloatTmp(progContext, floatResult.tmpOffset);
                    freeXmmRegister(progContext, xmmReg);
                } else {
                    if (isArray) {
                        code += genArrIndex(varName, letNode.name.indexes, progContext)
                        code += genOpCode("lea", `${offset}(%rbp)`,"%rcx");
                        code += genOpCode("call", "c64_get_item_ptr");
                        const treg = allocateRegister(progContext)
                        code += genOpCode("movq", "%rax", treg);
                        const reg = allocateRegister(progContext)
                        code += exprToInt(letNode.expr, reg, progContext);
                        code += genOpCode("movq", reg, `(${treg})`);
                        freeRegister(progContext, reg)
                        freeRegister(progContext, treg)
                    } else {
                        const reg = allocateRegister(progContext)
                        code += exprToInt(letNode.expr, reg, progContext);
                        code += genOpCode("movq", reg, `${offset}(%rbp)`);
                        freeRegister(progContext, reg)
                    }
                }
            } else  if (isLetStr(node)) {
                const letNode : LetStr = node;
                const isArray = letNode.name.indexes.length>0
                const varName = isArray? letNode.name.name+"[]" : letNode.name.name
                const offset = progContext.variables.get(varName)
                if (!offset) {
                    throw new CompileError("can not find variable offset for let str: "+varName,node.$cstNode)
                }
                if (isArray) {
                    const strResult = exprAsBString(letNode.expr,progContext);
                    code += strResult.code;
                    code += genArrIndex(varName, letNode.name.indexes, progContext)
                    code += genOpCode("lea", `${offset}(%rbp)`,"%rcx");
                    code += genOpCode("call", "c64_get_str_item_ptr");
                    code += genCall("assignBString",progContext, 
                        {cmd: "movq", source: "%rax"},
                        {cmd: "leaq", source: `${strResult.varOffset}(%rbp)`}
                       );
                    code += freeStrTmp(progContext, strResult.tmpOffset);
                } else {
                    const strResult = exprAsBString(letNode.expr,progContext);
                    code += strResult.code;
                    code += genCall("assignBString",progContext, 
                        {cmd: "leaq", source: `${offset}(%rbp)`}, 
                        {cmd: "leaq", source: `${strResult.varOffset}(%rbp)`});
                    code += freeStrTmp(progContext, strResult.tmpOffset);
                }
            } else if (isIf(node)) {
                const ifNode : If = node;
                const notIfLabel = `.ifnot${progContext.ifLabelCounter++}`
                code += conditionToAssembler(ifNode.cond, progContext, notIfLabel);
                if (ifNode.label) {
                    const name = ifNode.label.$refText
                    if (name) {
                        if (name.endsWith(":")) {
                            code += genOpCode("jmp", "."+name.substring(0,name.length-1));
                        } else {
                            code += genOpCode("jmp", "."+name);
                        }
                    } else {
                        throw  new CompileError("unsupported goto without name",node.$cstNode)
                    }
                    code += genOpCode("jmp", "."+ifNode.label.$refText);
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
                        throw  new CompileError("no for loop to exit",node.$cstNode)
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
                            throw new CompileError("can not find next for entry: " + varName, fvar.$cstNode)
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
                    throw new CompileError("can not find variable offset for: "+varName,node.$cstNode)
                }
            } else if (isInput(node)) {
                const inputNode : Input = node;
                if (inputNode.msg) {
                    const labeledNode : LabeledNode = inputNode.msg;
                    code += genOpCode("leaq", `${labeledNode._variableOffset}(%rbp)`, "%rcx");
                } else {
                    code += genOpCode("xor", "%rcx", "%rcx");
                }
                const labeledNode : LabeledNode = inputNode;
                code += genOpCode("leaq", `${labeledNode._label}(%rip)`, "%rdx");
                const usedParRegs = ["%rcx","%rdx"]
                progContext.usedRegisters.push("%rcx")
                progContext.usedRegisters.push("%rdx")
                code += addVarPointerParameters(progContext, inputNode.vars, usedParRegs, 2)
                code += genOpCode("call", "inputData");
                for (const ureg of usedParRegs) {
                    freeRegister(progContext,ureg)
                }
            } else if (isDefFn(node)) {
                const defFn : DefFn = node
                const labelEnd = `.defn_end${defFn.name}_${progContext.defnLabelCounter}`
                const labelExpr = `.defn_expr${defFn.name}_${progContext.defnLabelCounter}`
                progContext.defnLabelCounter++
                var defnPointer = progContext.variables.get(`_deffn_${defFn.name}`)
                if (!defnPointer) {
                    throw new CompileError("can not find defn pointer for: "+defFn.name,node.$cstNode)
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
                    throw new CompileError("can not find defn var for: "+defFn.name,node.$cstNode)
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
            } else if (isDim(node)) {
                const dimNode : Dim = node
                for (const variable of dimNode.vars) {
                    if (variable.indexes.length>0) {
                        const varName = variable.name+"[]"
                        const offset = progContext.variables.get(varName)
                        if (!offset) {
                            throw new CompileError("can not find variable offset for: "+varName,node.$cstNode)
                        }
                        const rank = progContext.variableRank.get(varName)
                        if (!rank) {
                            throw new CompileError("can not find variable rank for: "+varName,node.$cstNode)
                        }
                        code += genOpCode("cmpq","$0",`${offset}(%rbp)`);
                        const label = `.dim_ok${progContext.dimLabelCounter++}`
                        code += genOpCode("je", label);
                        //  ERROR "REDIM'D ARRAY", // 5
                        code += genOpCode("movq", "$5", "%rcx");
                        code += genOpCode("call", "c64_error");
                        code += `${label}:\n`
                        let index = 0
                        for (const idx of variable.indexes) {
                            const idxReg = allocateRegister(progContext)
                            code += exprToInt(idx, idxReg, progContext)
                            // set dimmension in arr_entry structure
                            code += genOpCode("movq", idxReg, `${offset+16+8*index}(%rbp)`);
                            freeRegister(progContext, idxReg)
                            index++
                        }
                    }
                }
            } else if (isOnGoto(node)) {
                const onGotoNode : OnGoto = node
                const reg = allocateRegister(progContext)
                code += exprToInt(onGotoNode.expr, reg, progContext);
                freeRegister(progContext,reg);
                const jumpOverLabel = ".gotoEnd"+progContext.goSubLabelCounter++
                code += genOpCode("cmpq","$0",reg)
                code += genOpCode("jle",jumpOverLabel)
                code += genOpCode("cmpq",`$${onGotoNode.labels.length>0 ? onGotoNode.labels.length : onGotoNode.lineNumbers.length}`,reg)
                code += genOpCode("ja",jumpOverLabel)
                const jmpTableLabel = ".jt"+progContext.jmpTablesCounter++
                // code += genOpCode("moveq",`${jmpTableLabel}(,${reg},8)`,"%rax")
                code += genOpCode("decq",reg)
                code += genOpCode("jmp",`*${jmpTableLabel}(,${reg},8)`);
                // create jump table
                progContext.jmpTables += `${jmpTableLabel}:\n`
                if (onGotoNode.labels.length>0) {
                    for (const label of onGotoNode.labels) {
                        progContext.jmpTables += `\t.quad ${getJmpLabel(label,progContext)}\n`
                    }
                } else {
                    for (const lineNumber of onGotoNode.lineNumbers) {
                        progContext.jmpTables += `\t.quad ${getJmpLabel(lineNumber, progContext)}\n`
                    }
                }
                code += `${jumpOverLabel}:\n`
            } else if (isOnGoSub(node)) {
                const onGotoNode : OnGoSub = node
                const jumpOverLabel = ".gotoEnd"+progContext.goSubLabelCounter++
                code += genCall("pushEntry",progContext,{cmd:"leaq",source:`${jumpOverLabel}(%rip)`})
                const reg = allocateRegister(progContext)
                code += exprToInt(onGotoNode.expr, reg, progContext);
                freeRegister(progContext,reg);
                code += genOpCode("cmpq","$0",reg)
                code += genOpCode("jle",jumpOverLabel)
                code += genOpCode("cmpq",`$${onGotoNode.labels.length>0 ? onGotoNode.labels.length : onGotoNode.lineNumbers.length}`,reg)
                code += genOpCode("ja",jumpOverLabel)
                const jmpTableLabel = ".jt"+progContext.jmpTablesCounter++
                // code += genOpCode("moveq",`${jmpTableLabel}(,${reg},8)`,"%rax")
                code += genOpCode("decq",reg)
                code += genOpCode("jmp",`*${jmpTableLabel}(,${reg},8)`);
                // create jump table
                progContext.jmpTables += `${jmpTableLabel}:\n`
                if (onGotoNode.labels.length>0) {
                    for (const label of onGotoNode.labels) {
                        progContext.jmpTables += `\t.quad ${getJmpLabel(label,progContext)}\n`
                    }
                } else {
                    for (const lineNumber of onGotoNode.lineNumbers) {
                        progContext.jmpTables += `\t.quad ${getJmpLabel(lineNumber, progContext)}\n`
                    }
                }
                code += `${jumpOverLabel}:\n`
            } else if (isPoke(node)) {
                const pokeNode : Poke = node
                const regAddr = allocateRegister(progContext)
                const regByte = allocateRegister(progContext)
                code += exprToInt(pokeNode.addr,regAddr, progContext)
                // truncate the addr to 64 K
                code += genOpCode("andq","$0xFFFF",regAddr)
                code += exprToInt(pokeNode.value,regByte,progContext)
                code += genOpCode("movq",`${progContext.pokeMemOffset}(%rbp)`,"%rax")
                code += genOpCode("movb",registerToByteName(regByte),`0(%rax,${regAddr},1)`)
                freeRegister(progContext,regAddr);
                freeRegister(progContext,regByte);
            } else if (isData(node)) {
                const dataNode: Data = node
                for (const dataLiteral of dataNode.values) {
                    const text = dataLiteral.startsWith('"') && dataLiteral.endsWith('"') ? dataLiteral.substring(1,dataLiteral.length-1) : dataLiteral
                    if (text) {
                        progContext.dataDefinition += `\t.align 4\n`
                        progContext.dataDefinition += `\t.quad ${text.length}\n`
                        const float = parseFloat(text)
                        progContext.dataDefinition += `\t.double ${float}\n`
                        const intValue = parseInt(text)
                        if (isNaN(intValue)) {
                            progContext.dataDefinition += `\t.quad 0\n`
                        } else {
                            progContext.dataDefinition += `\t.quad ${intValue}\n`
                        }
                        progContext.dataDefinition += `\t.ascii "${text}"\n`
                    }
                }
            } else if (isRead(node)) {
                const readNode : Read = node;
                const labeledNode : LabeledNode = readNode;
                code += genOpCode("leaq", `${progContext.dataPointerOffset}(%rbp)`, "%rcx");
                code += genOpCode("leaq", `${labeledNode._label}(%rip)`, "%rdx");
                let parNum = 2
                const usedParRegs = ["%rcx","%rdx"]
                progContext.usedRegisters.push("%rcx")
                progContext.usedRegisters.push("%rdx")
                code += addVarPointerParameters(progContext, readNode.vars, usedParRegs, parNum)
                code += genOpCode("call", "readData");
                for (const ureg of usedParRegs) {
                    freeRegister(progContext,ureg)
                }
            } else if (isRestore(node)) {
                if (progContext.dataPointerOffset===0) {
                    throw  new CompileError("restore without data",node.$cstNode)
                }
                code += genOpCode("lea",`dataDefinition(%rip)`,"%rax")
                code += genOpCode("movq","%rax",`${progContext.dataPointerOffset}(%rbp)`)
            } else {
                throw  new CompileError("unsupported command: "+node.$type,node.$cstNode)
            }
        }
    }
    return code;
}

function addVarPointerParameters(progContext: ProgContext, vars: Var[], usedParRegs: string[], parNum: number) : string {
    let code = ""
    for (const ivar of vars) {
        const isArray = ivar.indexes.length>0
        const varName = isArray? ivar.name+"[]" : ivar.name
        const varOffset = progContext.variables.get(varName)
        if (varOffset) {
            const parReg = regParameters[parNum]
            if (isArray) {
                const storeValue = storeRegister(progContext, usedParRegs,[],true,false)
                code += storeValue.code
                code += genArrIndex(varName, ivar.indexes, progContext)
                code += genOpCode("lea", `${varOffset}(%rbp)`, "%rcx");
                if (isStrVariable(ivar.name)) {
                    code += genOpCode("call", "c64_get_str_item_ptr");
                } else {
                    code += genOpCode("call", "c64_get_item_ptr");
                }
                code += genOpCode(parReg ? "movq" : "push", "%rax", parReg);
                code += restoreRegister(storeValue)
            } else {
                code += genOpCode( parReg ? "leaq" : "push", `${varOffset}(%rbp)`, parReg);
            }
            if (parReg) {
                usedParRegs.push(parReg)
                progContext.usedRegisters.push(parReg)
            }
        } else {
            throw new CompileError("can not find variable offset for: "+varName,ivar.$cstNode)
        }
        parNum++
    }
    return code
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

function getJmpLabel(lineRef: Reference<Line> | undefined, progContext: ProgContext) : string {
    const line = lineRef?.ref
    if (line) {
        if (line.linenum) {
            return `.line${line.linenum}`
        } else if (line.lineLabel) {
            return `.${line.lineLabel.substring(0,line.lineLabel.length-1)}`
        } else {
            throw new CompileError("referenced line without number or label",progContext.currentNode?.$cstNode)    
        }
    } else {
        throw new CompileError("can not find jmp label",progContext.currentNode?.$cstNode)
    }
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
        const rawVarName = nameForVarRef(expr, progContext)
        const varName = expr.indexes.length>0 ? rawVarName+"[]" : rawVarName
        const varOffset = progContext.variables.get(varName)
        if (!varOffset) {
            throw new CompileError("can not find float variable offset for: "+varName,expr.$cstNode)
        }
        if (expr.indexes.length>0) {
            variableOffset = allocateStrTmp(progContext);
            tmpOffset = variableOffset
            // TODO for every array access we copy the variable content to a tmp variable
            // because the caller can handle only stack offset to access the variable
            // this should be switched to pointer to elimante this behavior
            code += genArrIndex(varName, expr.indexes, progContext)
            code += genOpCode("lea", `${varOffset}(%rbp)`, "%rcx");
            code += genOpCode("call", "c64_get_str_item_ptr");
            code += genCall("assignBStringAsConst",progContext,{cmd:'leaq',source:`${variableOffset}(%rbp)`},{cmd:'movq',source:'%rax'});
        } else {
            variableOffset = varOffset
        }
    } else if (isIntVarRef(expr) && expr.indexes.length===0) {
        const varName = nameForVarRef(expr, progContext)
        const intVarOffset = progContext.variables.get(varName)
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (intVarOffset) {
            code += genCall("assignInt",progContext,
                {cmd: 'leaq', source: `${variableOffset}(%rbp)`},
                {cmd: 'movq', source: `${intVarOffset}(%rbp)`})
        } else {
            throw  new CompileError("error: can get int var offset for "+varName,expr.$cstNode)
        }
    } else if (isFloatVarRef(expr)  && expr.indexes.length===0) {
        const varName = nameForVarRef(expr, progContext)
        const intVarOffset = progContext.variables.get(varName)
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (intVarOffset) {
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("movsd", `${intVarOffset}(%rbp)`, "%xmm1");
            code += genOpCode("call", "assignDouble");
        } else {
            throw  new CompileError("error: can get float var offset for "+varName,expr.$cstNode)
        }
    } else if (isExpr(expr)) {
        const exprNode : Expr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        if (isFloatExpr(exprNode, progContext)) {
            // console.log("str float expr")
            const floatResult = exprToFloat(exprNode, progContext);
            code += floatResult.code;
            code += genOpCode("movsd", floatResult.source!, "%xmm1");
            freeFloatTmp(progContext, floatResult.tmpOffset);
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("call", "assignDouble");
        } else {
            // console.log("str int expr")
            const reg = allocateRegister(progContext,"%rdx");
            code += exprToInt(exprNode, "%rdx", progContext);
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            if (reg!=="%rdx") {
                code += genOpCode("movq", reg, "%rdx");
            }
            freeRegister(progContext,reg);
            code += genOpCode("call", "assignInt");
        }
    } else if (isSBinExpr(expr)) {
        const sBinExpr : SBinExpr = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        const strResult1 =  exprAsBString(sBinExpr.e1, progContext);
        code += strResult1.code;
        code += genCall("assignBString",progContext,{cmd: "leaq", source: `${variableOffset}(%rbp)`}, {cmd: "leaq", source: `${strResult1.varOffset}(%rbp)`});
        code += freeStrTmp(progContext, strResult1.tmpOffset);
        const strResult2 =  exprAsBString(sBinExpr.e2, progContext);
        code += strResult2.code;
        code += genCall("appendBString",progContext,{cmd: "leaq", source: `${variableOffset}(%rbp)`}, {cmd: "leaq", source: `${strResult2.varOffset}(%rbp)`});
        code += freeStrTmp(progContext, strResult2.tmpOffset);
    } else if (isChrs(expr)) {
        const chrs : Chrs = expr;
        variableOffset = allocateStrTmp(progContext);
        tmpOffset = variableOffset
        const reg = allocateRegister(progContext,"%rdx");
        code += exprToInt(chrs.param, "%rdx", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        if (reg!=="%rdx") {
            code += genOpCode("movq", reg, "%rdx");
        }
        freeRegister(progContext,reg);
        code += genOpCode("call", "assignChar");
    } else if (isStringFunction1(expr)) {
        const stringFunction1 : StringFunction1 = expr;
        variableOffset = allocateStrTmp(progContext)
        tmpOffset = variableOffset
        const reg = allocateRegister(progContext,"%rdx");
        code += exprToInt(expr.param, "%rdx", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        if (reg!=="%rdx") {
            code += genOpCode("movq", reg, "%rdx");
        }
        freeRegister(progContext,reg);
        if (eqStr(stringFunction1.func,"SPC")) {
            code += genOpCode("call", "bstrSpc");
        } else if (eqStr(stringFunction1.func,"TAB")) {
            code += genOpCode("call", "bstrTab");
        } else {
            throw  new CompileError("unknown string function2 expression: "+stringFunction1.func,expr.$cstNode)
        }
    } else if (isStringFunction2(expr)) {
        const stringFunction2 : StringFunction2 = expr;
        variableOffset = allocateStrTmp(progContext)
        tmpOffset = variableOffset
        const strResult = exprAsBString(stringFunction2.str, progContext);
        code += strResult.code;
        const reg = allocateRegister(progContext,"%r8");
        code += exprToInt(stringFunction2.param, "%r8", progContext);
        code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
        code += genOpCode("leaq", `${strResult.varOffset}(%rbp)`, "%rdx");
        if (reg!== "%r8") {
            code += genOpCode("movq", reg, "%r8");
        }
        freeRegister(progContext,reg);
        if (eqStr(stringFunction2.func,"LEFT$")) {
            code += genOpCode("call", "bstrLeft");
        } else if (eqStr(stringFunction2.func,"RIGHT$")) {
            code += genOpCode("call", "bstrRight");
        } else {
            throw  new CompileError("unknown string function2 expression: "+stringFunction2.func,expr.$cstNode)
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
        if (eqStr(stringFunction3.func,"MID$")) {
            code += genOpCode("call", "bstrMid");
        } else {
            throw  new CompileError("unknown string function2 expression: "+stringFunction3.func,expr.$cstNode)
        }
        code += freeStrTmp(progContext, strResult.tmpOffset);
    } else if (isStr(expr)) {
        const strNode : Str = expr
        variableOffset = allocateStrTmp(progContext)
        tmpOffset = variableOffset
        if (isFloatExpr(strNode.param, progContext)) {
            const floatResult = exprToFloat(strNode.param, progContext)
            code += floatResult.code
            code += genOpCode("leaq", `${variableOffset}(%rbp)`, "%rcx");
            code += genOpCode("movsd", `${floatResult.source}`, "%xmm1");
            code += genOpCode("call", "assignDouble");
            code += freeFloatTmp(progContext, floatResult.tmpOffset)
        } else {
            const reg = allocateRegister(progContext);
            code += exprToInt(strNode.param, reg, progContext);
            code += genCall("assignInt",progContext,
                {cmd: 'leaq', source: `${variableOffset}(%rbp)`},
                {cmd: 'movq', source: reg})
            freeRegister(progContext, reg)
        }
    } else {
        throw  new CompileError("unknown string expression: "+expr.$type,expr.$cstNode)
    }
    return {varOffset: variableOffset, code, tmpOffset};
}

function isFloatExpr(expr: Expr, progContext: ProgContext) : boolean {
    return isFloatVarRef(expr) || isFloatNumber(expr) 
        || (isNumFunc(expr) && isNumFloatFunction(expr)) 
        || (isBinExpr(expr) && (isFloatExpr(expr.e1,progContext) || isFloatExpr(expr.e2,progContext)) && isFloatOperator(expr.op))
        || (isNegExpr(expr) && isFloatExpr(expr.expr,progContext))
        || (isGroupExpr(expr) && isFloatExpr(expr.ge,progContext))
        || (isFnCall(expr) && isFnFloatType(expr,progContext))
        || isPiConst(expr);
}

function isNumFloatFunction(numFunc: NumFunc) : boolean {
    return !eqStr(numFunc.func,'PEEK') && !eqStr(numFunc.func,'POS')
}

function isFloatOperator(op: string) {
    const notFloatOp: string[] = ["=","<>",">",">=","<","<=","AND","OR","and","or"]
    return !notFloatOp.includes(op);
}


function allocateStrTmp(progContext: ProgContext) : number {
    if (progContext.stringTmps.length<=0) {
        throw  new CompileError("out of str tmp variables",progContext.currentNode?.$cstNode)
    }
    const varName = progContext.stringTmps.pop()!
    const offset = progContext.variables.get(varName)!
    if (!offset) {
        throw new CompileError("can not find string tmp variable offset for: "+varName,progContext.currentNode?.$cstNode)
    }
    return offset
}

function freeStrTmp(progContext: ProgContext, tmpOffset?: number) : string {
    let stmts = ""
    if (tmpOffset) {
        const entry = Array.from(progContext.variables.entries()).find(([_, value]) => value === tmpOffset);
        if (entry) {
            progContext.stringTmps.push(entry[0])
        } else {
            throw new CompileError("can not find str variable name for offset: "+tmpOffset,progContext.currentNode?.$cstNode)
        }
        if (!progContext.reuseTmpStrMem) {
            stmts += genCall("freeBString",progContext,{cmd: "leaq", source: `${tmpOffset}(%rbp)`});
        }
    }
    return stmts;
}

function allocateFloatTmp(progContext: ProgContext) : number {
    if (progContext.floatTmps.length<=0) {
        throw  new CompileError("out of float tmp variables",progContext.currentNode?.$cstNode)
    }
    const varName = progContext.floatTmps.pop()!
    // console.log("getting flattmp "+ " var "+varName + " offset "+progContext.variables.get(varName))
    return progContext.variables.get(varName)!
}

function freeFloatTmp(progContext: ProgContext, tmpOffset?: number) : string {
    let stmts = ""
    if (tmpOffset) {
        const entry = Array.from(progContext.variables.entries()).find(([_, value]) => value === tmpOffset);
        if (entry) {
            progContext.floatTmps.push(entry[0])
        } else {
            throw new CompileError("can not find float variable name for offset: "+tmpOffset,progContext.currentNode?.$cstNode)
        } 
    }
    return stmts;
}

function nameForFnCall(fnCall: FnCall, progContext: ProgContext) : string {
    return fnCall.fnname.ref?.name!
}

function nameForVarRef(varRef: AllVarRef, progContext: ProgContext) : string {
    if (isTiVarRef(varRef)) {
        throw  new CompileError("error: cannot reference TI var",varRef.$cstNode)
    }
    const lNode : AstNode = varRef.var.ref!;
    if (isLetNum(lNode)) {
        return lNode.name.name
    } else if (isLetStr(lNode)) {
        return lNode.name.name
    } else if (isFor(lNode)) {
        return lNode.name.name
    } else if (isGet(lNode)) {
        return lNode.var.name
    } else if (isRead(lNode) || isInput(lNode)) {
        let varName = varRef.var.$refText
        for (const ivar of lNode.vars) {
            if (ivar.name === varName) {
                return ivar.name
            }
        }
        throw new CompileError("can not find variable offset for input/read var: "+varName,varRef.$cstNode)
    } else if (isDefFn(lNode)) {
        return lNode.param.name
    } else {
        throw new CompileError("error: cannot get name for var reference: " + lNode.$type,varRef.$cstNode)
    }
}



function exprToInt(expr: Expr, reg: string, progContext: ProgContext) : string {
    let stmts = ""
    // console.log(`expr int: ${expr.$cstNode?.text} - ${reg}`)
    stmts += `\t# int: ${expr.$cstNode?.text} - ${reg}\n`;
    if (isIntNumber(expr)) {
        const intNumber : IntNumber = expr;
        stmts += genOpCode("movq", `$${intNumber.val.toString()}`, reg);
    } else if (isIntVarRef(expr)) {
        const rawVarName = nameForVarRef(expr, progContext)
        const varName = expr.indexes.length>0 ? rawVarName+"[]" : rawVarName
        const varOffset = progContext.variables.get(varName)
        if (!varOffset) {
            throw new CompileError("can not find float variable offset for: "+varName,expr.$cstNode)
        }
        if (expr.indexes.length>0) {
            stmts += genArrIndex(varName, expr.indexes, progContext)
            stmts += genOpCode("lea", `${varOffset}(%rbp)`, "%rcx");
            stmts += genOpCode("call", "c64_get_item");
            stmts += genOpCode("movq", "%rax", reg);
        } else {
            stmts += genOpCode("movq", `${varOffset}(%rbp)`, reg);
        }
    } else if (isTiVarRef(expr)) {
        stmts += genOpCode("xor", "%rcx", "%rcx");
        stmts += genOpCode("call", "time");
        stmts += genOpCode("movq", "%rax", reg);
    } else if (isFloatExpr(expr, progContext)) {
        // Float expression for example multiplocation of 2 float numbers
        // should be done in float arithmetics and the result converted to int
        const storeValue = storeRegister(progContext, notPreservedRegister,[reg],true)
        stmts += storeValue.code
        const floatResult = exprToFloat(expr, progContext);
        stmts += floatResult.code;
        stmts += genOpCode("movsd", floatResult.source!, "%xmm0");
        freeFloatTmp(progContext, floatResult.tmpOffset);
        stmts += restoreRegister(storeValue);
        stmts += genOpCode("cvtsd2siq", "%xmm0", reg);
    } else if (isBinExpr(expr)) {
        const binExpr : BinExpr = expr;
        if (!isFloatOperator(expr.op) 
            && expr.op!=="AND" 
            && expr.op!=="OR" 
            && (isFloatExpr(expr.e1,progContext) || isFloatExpr(expr.e2,progContext))) {
            // The comparision is int result
            // But float needs to be compared as float not converter to int
            // AND and OR bitwise operation need int as operants
            const binExpr : BinExpr = expr;
            const floatResult1 = exprToFloat(binExpr.e1, progContext);
            stmts += floatResult1.code;
            const reg1 = allocateXmmRegister(progContext)
            const reg2 = allocateXmmRegister(progContext)
            const floatResult2 = exprToFloat(binExpr.e2, progContext);
            stmts += floatResult2.code;
            stmts += genOpCode("movsd", floatResult1.source, reg1);
            stmts += genOpCode("movsd", floatResult2.source, reg2);
            if (binExpr.op === "<") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("setb", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                // We need -1 in case of 1 for OR/AND logic and be compatible with c64 basic
                // NOT -1 is 0
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === ">") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("seta", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "=") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("sete", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "<=") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("setbe", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === ">=") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("setae", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "<>") {
                stmts += genOpCode("comisd", reg2,reg1);
                stmts += genOpCode("setne", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else {
                throw  new CompileError("unexpected float to binary comp operator: "+binExpr.op,expr.$cstNode)
            }
            freeFloatTmp(progContext, floatResult1.tmpOffset);        
            freeFloatTmp(progContext, floatResult2.tmpOffset);
            freeXmmRegister(progContext, reg1)
            freeXmmRegister(progContext, reg2)
        } else {
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
                const storeValue = storeRegister(progContext, ["%rbx","%rdx"],[reg2,reg])
                stmts += storeValue.code
                stmts += genOpCode("cqto");
                // division of 128 bit / 64 bit 
                // rdx - hight part of dividend
                // rax - log part of dividend
                // rax - result division
                // rdx - result remainder
                stmts += genOpCode("idivq", reg2);
                stmts += genOpCode("movq", "%rax", reg);
                stmts += restoreRegister(storeValue)
            } else if (binExpr.op==="^") {
                const storeValue = storeRegister(progContext, notPreservedRegister,[reg2,reg],true)
                stmts += storeValue.code
                stmts += genCall("int_power",progContext,{cmd: "movq", source: reg},{cmd: "movq", source: reg2});
                stmts += genOpCode("movq", "%rax", reg);
                stmts += restoreRegister(storeValue)
            } else if (binExpr.op === "<") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("setl", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                // We need -1 in case of 1 for OR/AND logic and be compatible with c64 basic
                // NOT -1 is 0
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === ">") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("setg", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "=") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("sete", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "<=") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("setle", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === ">=") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("setge", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (binExpr.op === "<>") {
                stmts += genOpCode("cmpq", reg2,reg);
                stmts += genOpCode("setne", "%al");
                stmts += genOpCode("movzbq", "%al", reg);
                stmts += genOpCode("negq", reg)
            } else if (eqStr(binExpr.op,"OR")) {
                stmts += genOpCode("orq", reg2,reg);
            } else if (eqStr(binExpr.op,"AND")) {
                stmts += genOpCode("andq", reg2,reg);
            } else {
                throw  new CompileError("unknown int binary operator: "+binExpr.op,expr.$cstNode)
            }
            freeRegister(progContext, reg2)
        }
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
        stmts += strResult.code
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
            throw new CompileError("can not find defn pointer for: "+deffnName,expr.$cstNode)
        }
        const defnVar = progContext.variables.get(`_defvar_${deffnName}`)
        if (!defnVar) {
            throw new CompileError("can not find defn var for: "+deffnName,expr.$cstNode)
        }
        const reg2 = allocateRegister(progContext)
        const storeValue = storeRegister(progContext, registers,[reg2,reg])
        stmts += storeValue.code
        if (isFloatExpr(fnCall.param,progContext)) {
            const storeValue = storeRegister(progContext, notPreservedRegister,[reg],true)
            stmts += storeValue.code
            const floatResult = exprToFloat(fnCall.param, progContext);
            stmts += floatResult.code;
            stmts += genOpCode("movsd", floatResult.source!, "%xmm0");
            freeFloatTmp(progContext, floatResult.tmpOffset);
            stmts += restoreRegister(storeValue);
            stmts += genOpCode("cvtsd2siq", "%xmm0", reg);
        } else {
            stmts += exprToInt(fnCall.param, reg2, progContext);
        }
        stmts += genOpCode("movq", reg2, `${defnVar}(%rbp)`);
        freeRegister(progContext, reg2)
        // stmts += genOpCode("movq", "$0", reg);
        stmts += genOpCode("movq", `${defnPointer}(%rbp)`, "%rax");
        // TODO check if %rax is not null otherwise UNDEF'D FUNCTION error
        stmts += genOpCode("call", "*%rax");
        stmts += genOpCode("movq", "%rax",reg);
        stmts += restoreRegister(storeValue);
    } else if (isStrComparision(expr)) {
        const strComp : StrComparision = expr
        const strResult1 = exprAsBString(strComp.e1, progContext);
        const strResult2 = exprAsBString(strComp.e2, progContext);
        stmts += strResult1.code;
        stmts += strResult2.code;
        let opNum = 0
        if (strComp.operator === "=") {
            opNum = 0
        } else if (strComp.operator === "<>") {
            opNum = 1
        } else if (strComp.operator === "<") {
            opNum = 2
        } else if (strComp.operator === ">") {
            opNum = 3
        } else if (strComp.operator === "<=") {
            opNum = 4
        } else if (strComp.operator === ">=") {
            opNum = 5
        } else {
            throw  new CompileError("unknown string comparision operator: "+strComp.operator,expr.$cstNode)
        }
        stmts += genCall("bstrCmp",progContext,
            {cmd: "leaq", source: `${strResult1.varOffset}(%rbp)`},
            {cmd: "leaq", source: `${strResult2.varOffset}(%rbp)`},
            {cmd: "movq", source: "$"+opNum}
        )
        stmts += genOpCode("movq", "%rax", reg);
        stmts += freeStrTmp(progContext, strResult1.tmpOffset);
        stmts += freeStrTmp(progContext, strResult2.tmpOffset);
    } else if (isVal(expr)) {
        const valNode : Val = expr
        const strResult = exprAsBString(valNode.param, progContext)
        stmts += strResult.code
        freeStrTmp(progContext, strResult.tmpOffset)
        stmts += genCall("bstringToInt",progContext,{cmd: 'lea',source: `${strResult.varOffset}(%rbp)`})
        stmts += genOpCode("movq","%rax",reg)
        valNode.param
    } else if (isNotExpr(expr)) {
        const notNode : NotExpr = expr
        stmts += exprToInt(notNode.expr,reg,progContext)
        stmts += genOpCode("notq", reg)
    } else if (isNumFunc(expr) && !isNumFloatFunction(expr)) {
        const numFuncNode : NumFunc = expr
        if (eqStr(numFuncNode.func,'PEEK')) {
            stmts += exprToInt(numFuncNode.param, reg, progContext)
            if (!progContext.pokeMemOffset) {
                throw new CompileError("can not find poke memory offset for peek (mem not initialized)",expr.$cstNode)
            }
            stmts += genOpCode("movq", `${progContext.pokeMemOffset}(%rbp)`, "%rax")
            stmts += genOpCode("movzb", `(%rax,${reg},1)`, reg)
        } else if (eqStr(numFuncNode.func,'POS')) {
            const storeValue = storeRegister(progContext, notPreservedRegister,[reg],true)
            stmts += storeValue.code
            stmts += genOpCode("call", "get_car_pos");
            stmts += genOpCode("movq", "%rax", reg);
            stmts += restoreRegister(storeValue)
        } else {
            throw new CompileError("unsupported int num func "+numFuncNode.func,numFuncNode.$cstNode)
        }
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
            throw new CompileError("unknown int expression: "+expr.$type + " " + expr.$cstNode?.text,expr.$cstNode)
        }
    }
    return stmts;
}

function eqStr(str1?: string, str2?:string) : boolean {
    if (!str1 || !str2) {
        return false
    }
    return str1.localeCompare(str2,undefined, {sensitivity: 'base'}) === 0
}

function genArrIndex(varName: string, indexes: Expr[], progContext: ProgContext) : string {
    let code = ""
    const offset = progContext.variables.get(varName)!
    const rank = progContext.variableRank.get(varName)
    if (!rank) {
        throw new CompileError("can not find variable rank for let: "+varName,indexes[0].$cstNode)
    }
    let index = 0
    for (const idx of indexes) {
        const idxReg = allocateRegister(progContext)
        code += exprToInt(idx, idxReg, progContext)
        code += genOpCode("movq", idxReg, `${offset+16+8*rank+index*8}(%rbp)`);
        freeRegister(progContext, idxReg)
        index++
    }
    return code
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
    // console.log(`expr float: ${expr.$cstNode?.text}`);
    stmts += `\t# float: ${expr.$cstNode?.text}\n`;
    if (isFloatNumber(expr)) {
        const lNode : LabeledNode = expr;
        source = `${lNode._label}(%rip)`
    } else if (isFloatVarRef(expr)) {
        const rawVarName = nameForVarRef(expr, progContext)
        const varName = expr.indexes.length>0 ? rawVarName+"[]" : rawVarName
        const varOffset = progContext.variables.get(varName)
        if (!varOffset) {
            throw new CompileError("can not find float variable offset for: "+varName,expr.$cstNode)
        }
        if (expr.indexes.length>0) {
            stmts += genArrIndex(varName, expr.indexes, progContext)
            const resTmpOffset = allocateFloatTmp(progContext)
            stmts += genOpCode("lea", `${varOffset}(%rbp)`, "%rcx");
            stmts += genOpCode("call", "c64_get_item");
            stmts += genOpCode("movq", "%rax", `${resTmpOffset}(%rbp)`);
            tmpOffset = resTmpOffset
            source = `${resTmpOffset}(%rbp)`
        } else {
            source =  `${varOffset}(%rbp)`
        }
    } else if (isBinExpr(expr) && isFloatOperator(expr.op)) {
        const binExpr : BinExpr = expr;
        const floatResult1 = exprToFloat(binExpr.e1, progContext);
        stmts += floatResult1.code;
        const floatResult2 = exprToFloat(binExpr.e2, progContext);
        stmts += floatResult2.code;
        if (binExpr.op === "^") {   
            stmts += genOpCode("movsd", floatResult1.source, "%xmm0");
            stmts += genOpCode("movsd", floatResult2.source, "%xmm1");
            stmts += genOpCode("call", "pow");
            const resTmpOffset = allocateFloatTmp(progContext)
            stmts += genOpCode("movsd", "%xmm0", `${resTmpOffset}(%rbp)`);
            tmpOffset = resTmpOffset
            source = `${resTmpOffset}(%rbp)`
            freeFloatTmp(progContext, floatResult1.tmpOffset);        
            freeFloatTmp(progContext, floatResult2.tmpOffset);
        } else {
            const reg = allocateXmmRegister(progContext)
            const reg2 = allocateXmmRegister(progContext)
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
                throw  new CompileError("unknown binary operator: "+binExpr.op,binExpr.$cstNode)
            }
            freeFloatTmp(progContext, floatResult1.tmpOffset);        
            freeFloatTmp(progContext, floatResult2.tmpOffset);
            const resTmpOffset = allocateFloatTmp(progContext)
            stmts += genOpCode("movsd", reg, `${resTmpOffset}(%rbp)`);
            tmpOffset = resTmpOffset
            source = `${resTmpOffset}(%rbp)`
            freeXmmRegister(progContext, reg)
            freeXmmRegister(progContext, reg2)
        }
    } else if (isGroupExpr(expr)) {
        const groupExpr : GroupExpr = expr
        return exprToFloat(groupExpr.ge,progContext)
    } else if (isNumFunc(expr)) {
        const numFunc : NumFunc = expr;
        const cFunc = (mathFunctions as any)[numFunc.func.toUpperCase()]
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
            throw  new CompileError("unsupported float function "+numFunc.func,expr.$cstNode)
        }
    } else if (isFnCall(expr) && isFnFloatType(expr as FnCall, progContext)) {
        const fnCall : FnCall = expr;
        const deffnName = nameForFnCall(fnCall, progContext)
        const defnPointer = progContext.variables.get(`_deffn_${deffnName}`)
        if (!defnPointer) {
            throw new CompileError("can not find defn pointer for: "+deffnName,expr.$cstNode)
        }
        const defnVar = progContext.variables.get(`_defvar_${deffnName}`)
        if (!defnVar) {
            throw new CompileError("can not find defn var for: "+deffnName,expr.$cstNode)
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
    } else if (isVal(expr)) {
        const valNode : Val = expr
        const strResult = exprAsBString(valNode.param, progContext)
        stmts += strResult.code
        freeStrTmp(progContext, strResult.tmpOffset)
        const resTmpOffset = allocateFloatTmp(progContext)
        tmpOffset = resTmpOffset
        source = `${resTmpOffset}(%rbp)`
        stmts += genCall("bstringToDouble",progContext,{cmd: 'lea',source: `${strResult.varOffset}(%rbp)`})
        stmts += genOpCode("movq","%xmm0",source)
    } else if (isNegExpr(expr)) {
        const negNode : NegExpr = expr
        const floatResult = exprToFloat(negNode.expr, progContext);
        stmts += floatResult.code;
        const resTmpOffset = allocateFloatTmp(progContext)
        tmpOffset = resTmpOffset
        source = `${resTmpOffset}(%rbp)`
        stmts += genOpCode("movsd",floatResult.source,'%xmm0')
        stmts += genOpCode("xorpd",'%xmm1','%xmm1')
        stmts += genOpCode("subsd", "%xmm0","%xmm1")
        stmts += genOpCode("movsd","%xmm1",source)
        freeFloatTmp(progContext, floatResult.tmpOffset);
    } else if (isPiConst(expr)) {
        source = `.pi_const(%rip)`
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
            throw  new CompileError("unknown float expression: "+expr.$type,expr.$cstNode)
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

function genCall(cmd: string, progContext: ProgContext, ...parameters: CallParameter[]) {
    let code = ""
    const store = storeRegister(progContext, notPreservedRegister, [], true)
    code += store.code
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
    code += restoreRegister(store)
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
    let usePeekPoke = false
    let hasData = false
    let tmpStrCount = stringTmpVarCount
    for (const node of AstUtils.streamAllContents(model)) {
        if (isVar(node)) {
            const lNode : LabeledNode = node;
            const isArray = node.indexes.length>0
            const varName = isArray ? `${node.name}[]`: node.name
            const rank = isArray ? node.indexes.length : 0
            if (isArray) {
                if (progContext.variableRank.has(varName)) {
                    if (progContext.variableRank.get(varName)! !== rank) {
                        throw  new CompileError("variable rank mismatch: "+varName,node.$cstNode)
                    }
                } else {
                    progContext.variableRank.set(varName, rank)
                }
            }
            if (progContext.variables.has(varName)) {
                lNode._variableOffset = progContext.variables.get(varName)!;
            } else {
                if (isArray) {
                    // we need additional space to store dimension sizes
                    // The structure of array is
                    // struct {
                    //    void* ptr;
                    //    long rank;
                    //    long dim[rank];
                    //    long indexes[rank];
                    // }
                    // The size is 8+8+8*rank+8*rank = 16+16*rank
                    // 8 will be reserved later
                    variableOffset -= 8+16*rank
                } else {
                    if (isStrVariable(varName)) {
                        // We need addition 2 t_size for BString structure
                        variableOffset -= 16;
                    } 
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
        } else if (isOnGoto(node)) {
            const ongoto : OnGoto = node;
            for (const lineNumber of ongoto.lineNumbers) {
                const linenum = lineNumber.ref?.linenum
                if (linenum && !progContext.usedLines.includes(linenum)) {
                    progContext.usedLines.push(linenum)
                }

            }
        } else if (isOnGoSub(node)) {
            const ongosub : OnGoSub = node;
            for (const lineNumber of ongosub.lineNumbers) {
                const linenum = lineNumber.ref?.linenum
                if (linenum && !progContext.usedLines.includes(linenum)) {
                    progContext.usedLines.push(linenum)
                }

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
                let name = gosub.label.$refText
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
                    throw  new CompileError("function parameter type redifinition mismatch: "+defFn.name,node.$cstNode)
                }
            }
            // console.log("store pointerName ",pointerName)
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
        } else if (isPoke(node) || (isNumFunc(node) && node.func==='PEEK')) {
            usePeekPoke = true
        } else if (isData(node)) {
            hasData = true
        } else if (isPrint(node)) {
            for (const sexpr of node.exprs) {
                if (isSExpr(sexpr)) {
                    const neededStrTmp = calculateNeededTmpStr(sexpr);
                    // console.log("neededStrTmp print",neededStrTmp)
                    if (neededStrTmp>tmpStrCount) {
                        tmpStrCount = neededStrTmp
                    }
                }
            }
        } else if (isLetStr(node)) {
            const neededStrTmp = calculateNeededTmpStr(node.expr);
            // console.log("neededStrTmp let",neededStrTmp)
            if (neededStrTmp>tmpStrCount) {
                tmpStrCount = neededStrTmp
            }
        }
    }
    // create temporaty variables for bstring
    for (let i=0; i<tmpStrCount; i++) {
        const varName = `strtmp${i}$`
        variableOffset -= 16;
        progContext.stringTmps.push(varName)
        progContext.variables.set(varName, variableOffset)
        variableOffset -= 8
    }
    // float temporaty variables
    for (let i=0; i<floatTmpVarCount; i++) {
        const varName = `floattmp${i}`
        progContext.floatTmps.push(varName)
        progContext.variables.set(varName, variableOffset)
        variableOffset -= 8
    }
    progContext.tmpOffset = variableOffset
    variableOffset -= 8
    if (usePeekPoke) {
        progContext.pokeMemOffset = variableOffset
        variableOffset -= 8
    }
    if (hasData) {
        progContext.dataPointerOffset = variableOffset
        variableOffset -= 8
    }
    // allocate stack size pad to 16 and add 32 bytes for the stack frame
    progContext.stackAllocation = -variableOffset+(-variableOffset)%16 + 32
}

/**
 * Calculate recursice how many tmp string variables are needed to evaluate the expression
 */
function calculateNeededTmpStr(sexpr: SExpr) : number {
    if (isStringFunction2(sexpr)) {
        return 1 + calculateNeededTmpStr(sexpr.str)
    } else if (isStringFunction3(sexpr)) {
        return 1 + calculateNeededTmpStr(sexpr.str)
    } else if (isSBinExpr(sexpr)) {
        return 1 + Math.max(calculateNeededTmpStr(sexpr.e1),calculateNeededTmpStr(sexpr.e2))
    }
    return 1
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
        } else if (isRead(node)) {
            const label = `.LC${labelCounter++}`;
            const readNode : Read = node;
            let iformat = ""
            for (const ivar of readNode.vars) {
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
    let hasPi = false
    for (const node of AstUtils.streamAllContents(model)) {
        if (isFloatNumber(node)) {
            const label = `.LF${labelCounter++}`;
            const str : FloatNumber = node;
            literals += `${label}:\n\t.double ${str.val}\n`;
            const lNode : LabeledNode = node;
            lNode._label = label;
        } else if (isFor(node)) {
            const forNode : For = node;
            if (isFloatVar(forNode.name)) {
                if (forNode.step && isIntNumber(forNode.step)) {
                    const label = `.LF${labelCounter++}`;
                    const lNode : LabeledNode = forNode.step;
                    literals += `${label}:\n\t.double ${forNode.step.val}\n`;
                    lNode._label = label;
                }
                if (forNode.end && isIntNumber(forNode.end)) {
                    const label = `.LF${labelCounter++}`;
                    const lNode : LabeledNode = forNode.end;
                    literals += `${label}:\n\t.double ${forNode.end.val}\n`;
                    lNode._label = label;
                }  else {
                    // console.log("for node int label float3",forNode.end.$type)
                } 
            }
        } else if  (isPiConst(node)) {
            if (!hasPi) {
                literals += `.pi_const:\n\t.double 3.14159265358979323846\n`;
                hasPi = true
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
            stmts += genCall("assignFromConst",progContext,
                {cmd:"leaq", source:`${lNode._variableOffset}(%rbp)`},
                {cmd:"leaq", source:`${lNode._label}(%rip)`});
        }
    }
    return stmts;
}

function allocateRegister(progContext: ProgContext, wishRegister? : string) : string {
    if (wishRegister) {
        if (!progContext.usedRegisters.includes(wishRegister)) {
            progContext.usedRegisters.push(wishRegister);
            return wishRegister
        }
    }
    const freeRegister = registers.find(r => !progContext.usedRegisters.includes(r));
    if (freeRegister) {
        progContext.usedRegisters.push(freeRegister);
    } else {
        throw  new CompileError("no free register available",progContext.currentNode?.$cstNode)
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

function storeRegister(progContext: ProgContext, toStore: string[], except: string[], allocateShadowSpace = false, storeTmpFloats = true) : RegisterStorage {
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
        if (storeTmpFloats) {
            for (let i=0;i<progContext.tmpOffset;i++) {
                const varName = `floattmp${i}`
                const offset = progContext.variables.get(varName)!
                const source = `${offset}(%rbp)`
                code += genOpCode("pushq", source);
                restoreStack.push(source)
            }
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
    if (registerStorage.allocateShadowSpace && registerStorage.restoreStack.length>0) {
        code += genOpCode("addq", "$32", "%rsp");
    }
    for (const reg of registerStorage.restoreStack.reverse()) {
        code += genOpCode("popq", reg);
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

function registerToByteName(reg: string) : string {
    const maps : any = {
        "%rax":"%rl",
        "%rsi":"%sil",
        "%rdi":"%dil",
        "%r8":"%r8b",
        "%r9":"%r9b",
        "%r10":"%r10b",
        "%r11":"%r11b",
        "%r12":"%r12b",
        "%r13":"%r13b",
        "%r14":"%r14b",
        "%r15":"%r15b",
        "%rbx":"%bl",
        "%rcx":"%cl",
        "%rdx":"%dl"
    }
    return maps[reg]!;
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
        throw new CompileError("can not find for variable offset: " + this.varName, this.forNode.$cstNode)
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
        this.code += genOpCode("movq", this.primaryReg, `${this.varOffset}(%rbp)`);
        this.code += genOpCode("cmpq","$0",`${this.labelNode._stepOffset}(%rbp)`);
        this.code += genOpCode("js", this.condStepNegLabel);
      } else {
        this.code += genOpCode("addq", `$${this.stepConstant}`, "%rax");
        this.code += genOpCode("movq", this.primaryReg, `${this.varOffset}(%rbp)`);
    }
    } else {
      if (this.labelNode._stepOffset) {
        this.code += genOpCode("addsd",`${this.labelNode._stepOffset}(%rbp)`,"%xmm0");
        this.code += genOpCode("movq", this.primaryReg, `${this.varOffset}(%rbp)`);
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
        this.code += genOpCode("movq", this.primaryReg, `${this.varOffset}(%rbp)`);
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