import type { ValidationChecks } from 'langium';
import type { C64BasicAstType } from './generated/ast.js';
import type { C64BasicServices } from './c-64-basic-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: C64BasicServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.C64BasicValidator;
    const checks: ValidationChecks<C64BasicAstType> = {
        
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class C64BasicValidator {

    

}
