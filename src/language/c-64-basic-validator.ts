import { AstUtils, type ValidationAcceptor, type ValidationChecks } from 'langium';
import { FloatVarRef, IntVarRef, isFloatVarRef, isIntVarRef, isStringVarRef, isVar, StringVarRef, Var, type C64BasicAstType, type Model } from './generated/ast.js';
import type { C64BasicServices } from './c-64-basic-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: C64BasicServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.C64BasicValidator;
    const checks: ValidationChecks<C64BasicAstType> = {
       Model : validator.checkBasic
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class C64BasicValidator {
    checkBasic(model: Model, accept: ValidationAcceptor): void {
        const vars : Var[] = []
        const varRef : (StringVarRef | FloatVarRef | IntVarRef)[] = []
        for (const node of AstUtils.streamAllContents(model)) {
            if (isVar(node)) {
                vars.push(node)
            } else if (isStringVarRef(node) || isFloatVarRef(node) || isIntVarRef(node)) {
                varRef.push(node)
            }
        }
        for (const v of vars) {
            if (varRef.find((vr) => vr.var.$refText === v.name) === undefined) {
                accept('warning', `Variable never read ${v.name}`, {node: v})
            }
        }
    }
}
