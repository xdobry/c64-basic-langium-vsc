/******************************************************************************
 * This file was generated by langium-cli 3.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { type LangiumSharedCoreServices, type LangiumGeneratedSharedCoreServices, type LanguageMetaData, type Module, LangiumDocument, AstNode, MaybePromise, isRootCstNode, isLeafCstNode, LeafCstNode, isCompositeCstNode } from 'langium';
import { C64BasicAstReflection, isData, isModel, Line } from './generated/ast.js';
import { C64BasicGrammar } from './generated/grammar.js';
import { C64BasicScopeProvider } from './scope-provider.js';
import { FoldingRangeProvider, FoldingRangeAcceptor, LangiumServices, PartialLangiumServices } from 'langium/lsp';
import { C64BasicFormatter } from './lsp/formatter.js';
import { C64Lexer } from './lexer.js';
import { CancellationToken, FoldingRange, FoldingRangeKind, FoldingRangeParams } from 'vscode-languageserver';

export const C64BasicLanguageMetaData = {
    languageId: 'c-64-basic',
    fileExtensions: ['.c64b','.bas'],
    caseInsensitive: true
} as const satisfies LanguageMetaData;

export const C64BasicGeneratedSharedModule: Module<LangiumSharedCoreServices, LangiumGeneratedSharedCoreServices> = {
    AstReflection: () => new C64BasicAstReflection()
};

export type C64BasicAddedServices = {
    
}

export type C64Services = LangiumServices & C64BasicAddedServices


export const C64BasicGeneratedModule: Module<C64Services, PartialLangiumServices & C64BasicAddedServices> = {
    Grammar: () => C64BasicGrammar(),
    LanguageMetaData: () => C64BasicLanguageMetaData,
    parser: {
        Lexer: (services) => new C64Lexer(services)
    },
    references: {
        ScopeProvider: (services) => new C64BasicScopeProvider(services)
    },
    lsp: {
        Formatter: () => new C64BasicFormatter(),
        FoldingRangeProvider: (services) => new C64FoldingRangeProvider(),
    }
};

class C64FoldingRangeProvider implements FoldingRangeProvider {
    getFoldingRanges(document: LangiumDocument, params: FoldingRangeParams, cancelToken?: CancellationToken): MaybePromise<FoldingRange[]> {
        const foldings: FoldingRange[] = [];
        const acceptor: FoldingRangeAcceptor = (foldingRange) => foldings.push(foldingRange);
        if (document.parseResult.value) {
            this.collectCommentFolding(document, document.parseResult?.value!, acceptor);
        }
        return foldings;
    }
    createRange(range: AstNode[]) : FoldingRange {
        const lastNode = range[range.length-1]
        return FoldingRange.create(range[0].$cstNode?.range.start.line!,lastNode.$cstNode?.range.end.line!,range[0].$cstNode?.range.start.character,lastNode.$cstNode?.range.end.character,FoldingRangeKind.Region)
    }

    collectCommentFolding(document: LangiumDocument, node: AstNode, acceptor: FoldingRangeAcceptor): void {
        if (isModel(node)) {
            const dataLines : Line[] = []
            for (const line of node.lines) {
                if (line.stmts.length>0 && isData(line.stmts[0])) {
                    dataLines.push(line)
                } else {
                    if (dataLines.length>=2) {
                        acceptor(this.createRange(dataLines))
                    }
                    dataLines.length = 0
                }
            }
            if (dataLines.length>=2) {
                acceptor(this.createRange(dataLines))
                dataLines.length = 0
            }
            const cstNode = node.$cstNode
            if (isRootCstNode(cstNode)) {
                const commentNodes : LeafCstNode[] = []
                for (const node of cstNode.content) {
                    if (isLeafCstNode(node) && node.tokenType.name === 'SL_COMMENT') {
                        console.log("comment found",node.tokenType.name)
                        commentNodes.push(node)
                    } else {
                        if (!isLeafCstNode(node) || node.tokenType.name!=="NEWLINE") {
                            if (!isCompositeCstNode(node) || !node.text.match(/^\d+\s*$/)) {
                                console.log("no comment",node.text)
                                if (commentNodes.length>=2) {
                                    acceptor(FoldingRange.create(commentNodes[0].range.start.line,commentNodes[commentNodes.length-1].range.end.line,commentNodes[0].range.start.character,commentNodes[commentNodes.length-1].range.end.character,FoldingRangeKind.Comment))
                                }
                                commentNodes.length = 0
                            }
                        }
                    }
                }
                if (commentNodes.length>=2) {
                    acceptor(FoldingRange.create(commentNodes[0].range.start.line,commentNodes[commentNodes.length-1].range.end.line,commentNodes[0].range.start.character,commentNodes[commentNodes.length-1].range.end.character,FoldingRangeKind.Comment))
                }
            }
        }
    }
}
