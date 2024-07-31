/******************************************************************************
 * This file was generated by langium-cli 3.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import type { LangiumSharedCoreServices, LangiumCoreServices, LangiumGeneratedSharedCoreServices, LanguageMetaData, Module } from 'langium';
import { C64BasicAstReflection } from './generated/ast.js';
import { C64BasicGrammar } from './generated/grammar.js';
import { C64BasicScopeProvider } from './scope-provider.js';
import { PartialLangiumServices } from 'langium/lsp';

export const C64BasicLanguageMetaData = {
    languageId: 'c-64-basic',
    fileExtensions: ['.c64b'],
    caseInsensitive: false
} as const satisfies LanguageMetaData;

export const C64BasicGeneratedSharedModule: Module<LangiumSharedCoreServices, LangiumGeneratedSharedCoreServices> = {
    AstReflection: () => new C64BasicAstReflection()
};

export type C64BasicAddedServices = {
    
}


export const C64BasicGeneratedModule: Module<LangiumCoreServices, PartialLangiumServices & C64BasicAddedServices> = {
    Grammar: () => C64BasicGrammar(),
    LanguageMetaData: () => C64BasicLanguageMetaData,
    parser: {},
    references: {
        ScopeProvider: (services) => new C64BasicScopeProvider(services)
    }
};
