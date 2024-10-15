import { isIMultiModeLexerDefinition, isTokenTypeDictionary, LangiumCoreServices, Lexer, LexerResult } from "langium";
import { Lexer as ChevrotainLexer, createToken } from 'chevrotain';
import type { TokenTypeDictionary, TokenVocabulary, TokenType} from 'chevrotain';

/**
 * It is almost the copy of langium default lexer, but is use multimode lexer
 */
export class C64Lexer implements Lexer {

    protected chevrotainLexer: ChevrotainLexer;
    protected tokenTypes: TokenTypeDictionary;

    constructor(services: LangiumCoreServices) {
        const tokens = services.parser.TokenBuilder.buildTokens(services.Grammar, {
            caseInsensitive: services.LanguageMetaData.caseInsensitive
        });
        this.tokenTypes = this.toTokenTypeDictionary(tokens);
        // const dataItem = createToken({ name: "DATA_ITEM", pattern: /"[^\r\n"]+"|[^,\r\n]+/ });
        const skipComma = createToken({ name: "SkipComma", pattern: /,\s*/, group: ChevrotainLexer.SKIPPED });

        const lexerTokens = isTokenTypeDictionary(tokens) ? Object.values(tokens) : tokens as TokenType[];
        for (const token of lexerTokens) {
            if (token.name === 'DATA') {
                // TODO Hack, setting internal structure this should be set during createToken call in TokenBuilder implementation
                token.PUSH_MODE = 'data_mode';
                token.PATTERN = /[dD][aA][tT][aA]\s*/
            }
        }
        const dataItem : TokenType= lexerTokens.find(t => t.name === 'DATA_ITEM')!;
        const newLineDi : TokenType= lexerTokens.find(t => t.name === 'NEWLINE_DI')!;   
        if (dataItem) {
            dataItem.PATTERN = /"[^\r\n"]+"|[^,\r\n]+/
        } else {
            throw new Error('DATA_ITEM token not found');
        }
        if (newLineDi) {
            newLineDi.PATTERN = /[\n\r]+/
            newLineDi.POP_MODE = true
        } else {
            throw new Error('NEWLINE_DI token not found');
        }
        const fTokens = lexerTokens.filter(t => t.name !== 'DATA_ITEM' && t.name !== 'NEWLINE_DI');

        const multiMode = {
            modes: {
                default: fTokens,
                data_mode: [dataItem, skipComma, newLineDi]
            },
            defaultMode: 'default'
        }
        this.chevrotainLexer = new ChevrotainLexer(multiMode, {
            positionTracking: 'full'
        });
    }

    get definition(): TokenTypeDictionary {
        return this.tokenTypes;
    }

    tokenize(text: string): LexerResult {
        const chevrotainResult = this.chevrotainLexer.tokenize(text);
        return {
            tokens: chevrotainResult.tokens,
            errors: chevrotainResult.errors,
            hidden: chevrotainResult.groups.hidden ?? []
        };
    }

    protected toTokenTypeDictionary(buildTokens: TokenVocabulary): TokenTypeDictionary {
        if (isTokenTypeDictionary(buildTokens)) return buildTokens;
        const tokens = isIMultiModeLexerDefinition(buildTokens) ? Object.values(buildTokens.modes).flat() : buildTokens;
        const res: TokenTypeDictionary = {};
        tokens.forEach(token => res[token.name] = token);
        return res;
    }
}