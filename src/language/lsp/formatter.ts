import { AstNode, CstNode } from "langium";
import { AbstractFormatter, Formatting } from "langium/lsp";
import { CstUtils } from "langium"
import { isCmd, isLine } from "../generated/ast.js";


export class C64BasicFormatter extends AbstractFormatter {
    protected format(node: AstNode): void {
        if (isCmd(node)) {
            // Add Space after every cmd keyword
            const formatter = this.getNodeFormatter(node);
            const kelem = formatter.keywords('PRINT','LET','IF',
                'THEN','ELSE','FOR','TO','STEP','NEXT','END','GOTO','GOSUB','RETURN','DIM','ON','GOSUB','DEF','FN','INPUT','GET','READ','DATA','RESTORE','POKE');
            kelem.append(Formatting.oneSpace());
            const melem = formatter.keywords('TO','THEN','STEP')
            melem.prepend(Formatting.oneSpace());
        } else if (isLine(node)) {
            // Add space after : and remove bofore it
            const treeIterator = CstUtils.streamCst(node.$cstNode!).iterator();
            let result: IteratorResult<CstNode>;
            const cnodes : CstNode[] = []
            do {
                result = treeIterator.next();
                if (!result.done) {
                    const childNode = result.value;
                    if (childNode.text===':') {
                        cnodes.push(childNode);
                    }
                }
            } while (!result.done);
            if (cnodes.length>0) {
                const formatter = this.getNodeFormatter(node);
                const range = formatter.cst(cnodes)
                range.append(Formatting.oneSpace());
                range.prepend(Formatting.noSpace());
            }
        }
        // TODO remove spaces around operators
        // ADD SPACES TO Compare and boolean operators
        // REMOVE SPACES Before () and after
        
    }
}