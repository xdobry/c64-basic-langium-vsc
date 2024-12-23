import { ReferenceInfo, Scope, ScopeProvider, AstUtils, LangiumCoreServices, AstNodeDescriptionProvider, MapScope, EMPTY_SCOPE, AstNodeDescription, AstNode } from "langium";
import { isModel, isVarRef, isLetNum, LetNum, isLetStr, LetStr, isGoTo, isStringVarRef, isGet, isInput, Get, Input, isRead, Read, isFor, For, isIf, isGoSub, isOnGoSub, isOnGoto, isFnCall, isDefFn, DefFn, isRun, Stmt, If } from "./generated/ast.js";

export class C64BasicScopeProvider implements ScopeProvider {
    private astNodeDescriptionProvider: AstNodeDescriptionProvider;
    constructor(services: LangiumCoreServices) {
        //get some helper services
        this.astNodeDescriptionProvider = services.workspace.AstNodeDescriptionProvider;
    }
    getScope(context: ReferenceInfo): Scope {
        if ((isVarRef(context.container) || isStringVarRef(context.container)) && context.property === 'var') {
            //get the root node of the document
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            //select all persons from this document
            //transform them into node descriptions
            const descriptions : AstNodeDescription[] = []
            const names: string[] = []
            const acceptor = (node: AstNode, name: string) => {
                if (!names.includes(name)) {
                    descriptions.push(this.astNodeDescriptionProvider.createDescription(node, name))
                    names.push(name)
                }
            }
            const deffn = AstUtils.getContainerOfType(context.container, isDefFn);
            if (deffn) {
                const l : DefFn = deffn as DefFn;
                acceptor(l, l.param.name)
            }
            const scanVars = (p: Stmt) => {
                if (isLetNum(p) || isLetStr(p)) {
                    const l : LetStr | LetNum = p as LetStr | LetNum;
                    acceptor(l, l.name.name)
                } else if (isGet(p)) {
                    const l : Get = p as Get;
                    acceptor(l, l.var.name)
                } else if (isInput(p)) {
                    const l : Input = p as Input;
                    for (const varInst of l.vars) {
                        acceptor(l, varInst.name)
                    }
                } else if (isRead(p)) {
                    const l : Read = p as Read;
                    for (const varInst of l.vars) {
                        acceptor(l, varInst.name)
                    }
                } else if (isFor(p)) {
                    const l : For = p as For;
                    acceptor(l, l.name.name)
                } else if (isIf(p)) {
                    const l : If = p as If;
                    if (l.stmts) {
                        for (const stmt of l.stmts) {
                            scanVars(stmt);
                        }
                    }
                }
            }
            model.lines.forEach(line => {
                line.stmts.forEach(p => {
                    scanVars(p);
                });
            })
            descriptions.push(this.astNodeDescriptionProvider.createDescription(model, 'TI$'));
            //create the scope
            return new MapScope(descriptions);
        } else if ((isGoTo(context.container) || isIf(context.container) 
            || isGoSub(context.container) || isRun(context.container)) && context.property === 'label') {
            //get the root node of the document
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            const descriptions : AstNodeDescription[] = []
            model.lines.forEach(line => {
                if (line.lineLabel) {
                    descriptions.push(this.astNodeDescriptionProvider.createDescription(line, line.lineLabel.substring(0,line.lineLabel.length-1)))
                }
            })
            //create the scope
            return new MapScope(descriptions);
        } else if ((isGoTo(context.container) || isGoSub(context.container) 
            || isIf(context.container) || isRun(context.container)) && context.property === 'lineNumber') {
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            const descriptions : AstNodeDescription[] = []
            model.lines.forEach(line => {
                if (line.linenum) {
                    descriptions.push(this.astNodeDescriptionProvider.createDescription(line, line.linenum))
                }
            })
            return new MapScope(descriptions);
        } else if ((isOnGoSub(context.container) || isOnGoto(context.container)) && context.property === 'labels') {
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            const descriptions : AstNodeDescription[] = []
            model.lines.forEach(line => {
                if (line.lineLabel) {
                    descriptions.push(this.astNodeDescriptionProvider.createDescription(line, line.lineLabel.substring(0,line.lineLabel.length-1)))
                }
            })
            return new MapScope(descriptions);
        } else if ((isOnGoSub(context.container) || isOnGoto(context.container)) && context.property === 'lineNumbers') {
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            const descriptions : AstNodeDescription[] = []
            model.lines.forEach(line => {
                if (line.linenum) {
                    descriptions.push(this.astNodeDescriptionProvider.createDescription(line, line.linenum))
                }
            })
            return new MapScope(descriptions);
        } else if ((isFnCall(context.container)) && context.property === 'fnname') {
            const model = AstUtils.getContainerOfType(context.container, isModel)!;
            const descriptions : AstNodeDescription[] = []
            model.lines.forEach(line => {
                line.stmts.forEach(p => {
                    if (isDefFn(p)) {
                        const l : DefFn = p as DefFn;
                        descriptions.push(this.astNodeDescriptionProvider.createDescription(l, l.name))
                    }
                });
            });
            //create the scope
            return new MapScope(descriptions);
        }
        return EMPTY_SCOPE;
    }
}