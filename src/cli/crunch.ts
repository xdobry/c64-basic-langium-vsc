import { CstNode, isCompositeCstNode, isLeafCstNode } from "langium"
import { Model,Cmd, Line, isGoTo, GoTo, isGoSub, GoSub, isIf, If, isOnGoto, isOnGoSub, OnGoto, OnGoSub, isLetNum, isLetStr } from "../language/generated/ast.js"
import { GenerateOptions } from "./main.js"

interface CrunchContext {
    lineMap: Map<Line,number>
}

export function crunchCode(model: Model, opt: GenerateOptions): string {
    let code = ""
    let lineNum = 1
    const lineNumDiff = 1
    const crunchContext : CrunchContext = {
        lineMap: new Map<Line,number>()
    }
    for (const line of model.lines) {
        crunchContext.lineMap.set(line,lineNum)
        if (line.stmts.length > 0) {
            lineNum += lineNumDiff
        }
    }
    for (const line of model.lines) {
        if (line.stmts.length > 0) {
            code += `${crunchContext.lineMap.get(line)} ${crunchStmts(line.stmts,crunchContext)}\n`
        }
    }
    return code
}

function crunchStmts(stmts: Cmd[], crunchContext: CrunchContext) : string {
    return stmts.map(stmt => crunchStmt(stmt,crunchContext)).join(":")
}

function crunchStmt(cmd: Cmd, crunchContext: CrunchContext) : string {
    let code = ""
    if (cmd.$cstNode) {
        code += crunchCst(cmd.$cstNode,crunchContext,0,[])
    }
    return code
}

function crunchCst(cstNode: CstNode,crunchContext: CrunchContext, level: number,alreadyPrinted: CstNode[]) : string {
    let code = ""
    if (isCompositeCstNode(cstNode)) {
        // console.log(`${' '.repeat(level)} composite ${cstNode.content.length}`)
        cstNode.content.forEach(child => {
            code += crunchCst(child,crunchContext,level+1,alreadyPrinted)
        })
    } else {
        if (isLeafCstNode(cstNode) && !alreadyPrinted.includes(cstNode)) {
            // console.log(`${' '.repeat(level)}cstnode ${cstNode.text} hidden=${cstNode.hidden} grammsource ${cstNode.grammarSource.$type} astnode type ${cstNode.astNode.$type}`)
            if ((isGoTo(cstNode.astNode) || isGoSub(cstNode.astNode) || isIf(cstNode.astNode)) && cstNode.grammarSource.$type === "CrossReference") {
                const goto : GoTo | GoSub | If = cstNode.astNode
                const line = goto.label ? goto.label.ref : goto.lineNumber?.ref
                const refLine = line ? crunchContext.lineMap.get(line) : undefined
                code += refLine?.toString() ?? "999"
            } else if ((isOnGoto(cstNode.astNode) || isOnGoSub(cstNode.astNode)) && cstNode.grammarSource.$type === "CrossReference") {
                const ongoto : OnGoto | OnGoSub = cstNode.astNode
                const label = ongoto.labels.find(l => l.$refNode===cstNode)
                if (label && label.ref) {
                    const refLine = label ? crunchContext.lineMap.get(label.ref) : undefined
                    code += refLine?.toString() ?? "999"
                } else {
                    const lineNumber = ongoto.lineNumbers.find(l => l.$refNode===cstNode)
                    if (lineNumber && lineNumber.ref) {
                        const refLine = label ? crunchContext.lineMap.get(lineNumber.ref) : undefined
                        code += refLine?.toString() ?? "999"
                    }  else {
                        code += "999"
                    }
                }
            } else if ((isLetNum(cstNode.astNode) || isLetStr(cstNode.astNode)) && cstNode.grammarSource.$type === "Keyword" && cstNode.text.toLocaleLowerCase() === "let") {
                // ignore let keyword
            } else {
                code = cstNode.text.toLowerCase()
            }
            alreadyPrinted.push(cstNode)
        }
    }
    return code
}
