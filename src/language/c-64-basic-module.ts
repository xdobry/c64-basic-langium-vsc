import { type Module, inject } from 'langium';
import { createDefaultModule, createDefaultSharedModule, type DefaultSharedModuleContext, type LangiumServices, type LangiumSharedServices, type PartialLangiumServices } from 'langium/lsp';
import { C64BasicGeneratedModule, C64BasicGeneratedSharedModule } from './module.js';
import { C64BasicValidator, registerValidationChecks } from './c-64-basic-validator.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type C64BasicAddedServices = {
    validation: {
        C64BasicValidator: C64BasicValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type C64BasicServices = LangiumServices & C64BasicAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const C64BasicModule: Module<C64BasicServices, PartialLangiumServices & C64BasicAddedServices> = {
    validation: {
        C64BasicValidator: () => new C64BasicValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createC64BasicServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    C64Basic: C64BasicServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        C64BasicGeneratedSharedModule
    );
    const C64Basic = inject(
        createDefaultModule({ shared }),
        C64BasicGeneratedModule,
        C64BasicModule
    );
    shared.ServiceRegistry.register(C64Basic);
    registerValidationChecks(C64Basic);
    if (!context.connection) {
        // We don't run inside a language server
        // Therefore, initialize the configuration provider instantly
        shared.workspace.ConfigurationProvider.initialized({});
    }
    return { shared, C64Basic };
}