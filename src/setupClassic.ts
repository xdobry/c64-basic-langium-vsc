import { MonacoEditorLanguageClientWrapper, UserConfig } from 'monaco-editor-wrapper';
import { configureWorker, defineUserServices } from './setupCommon.js';
import monarchSyntax from "./syntaxes/c-64-basic.monarch.js";

export const setupConfigClassic = (): UserConfig => {
    return {
        wrapperConfig: {
            serviceConfig: defineUserServices(),
            editorAppConfig: {
                $type: 'classic',
                languageId: 'c-64-basic',
                code: `// c64basic is running in the web!`,
                useDiffEditor: false,
                languageExtensionConfig: { id: 'langium' },
                languageDef: monarchSyntax,
                editorOptions: {
                    'semanticHighlighting.enabled': true,
                    theme: 'vs-dark'
                }
            }
        },
        languageClientConfig: configureWorker()
    };
};

export const executeClassic = async (htmlElement: HTMLElement) => {
    const userConfig = setupConfigClassic();
    const wrapper = new MonacoEditorLanguageClientWrapper();
    await wrapper.initAndStart(userConfig, htmlElement);
};
