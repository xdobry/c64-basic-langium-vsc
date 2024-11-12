import { AstUtils, CstNode, isCompositeCstNode, isLeafCstNode, isReference } from "langium"
import { Model,Cmd, Line, isLine } from "../language/generated/ast.js"
import { GenerateOptions } from "./main.js"
import { reflection } from "../language/generated/ast.js"

interface DeCrunchContext {
    lineMap: Map<Line,number>
    wasKeyword: boolean
    stmtBegin: boolean
}

/*
decrunch make following transformations:
- remove unused line numbers
- add empty new line before used line number (jump target)
- add spaces to improve readability
- break multiple statements in a line to multiple lines (optionally)
- add indentation to improve readability for loops and if statements
- change line numbers to line labels (optionally)
- add new lines before data block and before rem blocks
*/
export function decrunchCode(model: Model, opt: GenerateOptions): string {
    let code = ""
    const crunchContext : DeCrunchContext = {
        lineMap: new Map<Line,number>(),
        wasKeyword: false,
        stmtBegin: false
    }
    for (const node of AstUtils.streamAllContents(model)) {
        console.log(`node: ${node.$type} text: ${node.$cstNode?.text}`)
        const meta = reflection.getTypeMetaData(node.$type)
        if (meta) {
            for (const prop of meta.properties) {
                const value = (node as any)[prop.name]
                if (Array.isArray(value)) {
                    for (const item of value) {
                        if (isReference(item)) {
                            const ref = item.ref
                            if (isLine(ref)) {
                                crunchContext.lineMap.set(ref,0)
                            }
                        }
                    }
                } else {
                    if (isReference(value)) {
                        const ref = value.ref
                        if (isLine(ref)) {
                            crunchContext.lineMap.set(ref,0)
                        }
                    }
                }
            }
        }
    }
    console.log("used lines",crunchContext.lineMap.size)

    for (const line of model.lines) {
        if (line.stmts.length > 0) {
            if (crunchContext.lineMap.get(line) !== undefined) {
                code += "\n"
                code += `${line.linenum ?? line.lineLabel} `
            }
            code += `${decrunchStmts(line.stmts,crunchContext)}\n`
        }
    }
    return code
}

function decrunchStmts(stmts: Cmd[], crunchContext: DeCrunchContext) : string {
    return stmts.map(stmt => decrunchStmt(stmt,crunchContext)).join(": ")
}

function decrunchStmt(cmd: Cmd, crunchContext: DeCrunchContext) : string {
    crunchContext.wasKeyword = false
    crunchContext.stmtBegin = true
    let code = ""
    if (cmd.$cstNode) {
        code += decrunchCst(cmd.$cstNode,crunchContext,0,[])
    }
    return code
}

function decrunchCst(cstNode: CstNode,crunchContext: DeCrunchContext, level: number,alreadyPrinted: CstNode[]) : string {
    let code = ""
    if (isCompositeCstNode(cstNode)) {
        // console.log(`${' '.repeat(level)} composite ${cstNode.content.length}`)
        cstNode.content.forEach(child => {
            code += decrunchCst(child,crunchContext,level+1,alreadyPrinted)
        })
    } else {
        if (isLeafCstNode(cstNode) && !alreadyPrinted.includes(cstNode)) {
            // console.log(`${' '.repeat(level)}cstnode ${cstNode.text} hidden=${cstNode.hidden} grammsource ${cstNode.grammarSource.$type} astnode type ${cstNode.astNode.$type}`)
            if (crunchContext.wasKeyword) {
                code += " "
                crunchContext.wasKeyword = false
            } else if (cstNode.grammarSource.$type === "Keyword" && !crunchContext.stmtBegin && cstNode.text.length>1) {
                code += " "
            }
            if (cstNode.grammarSource.$type === "Keyword" && (cstNode.text.length>1 || cstNode.text==="," || cstNode.text===";")) {
                crunchContext.wasKeyword = true
            }
            code += cstNode.text
            crunchContext.stmtBegin = false
            if (cstNode.text === "=" && cstNode.grammarSource.$type === "Keyword") {
                crunchContext.stmtBegin = true
            }
            alreadyPrinted.push(cstNode)
        }
    }
    return code
}
