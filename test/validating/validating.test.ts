import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import type { Diagnostic } from "vscode-languageserver-types";
import { createC64BasicServices } from "../../src/language/c-64-basic-module.js";
import { Model, isModel } from "../../src/language/generated/ast.js";
import { readdirSync, readFileSync } from "fs";

let services: ReturnType<typeof createC64BasicServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createC64BasicServices(EmptyFileSystem);
    const doParse = parseHelper<Model>(services.C64Basic);
    parse = (input: string) => doParse(input, { validation: true });

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Validating', () => {
  
    test('check no errors', async () => {
        document = await parse(`LET A$="TEST"
LABEL P12
PRINT A$ 
GOTO P12
`);

        console.log("diagnostics: ", document.diagnostics);
        console.log("references: ", document.references);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the diagnostics by converting them into human readable strings;
            // note that 'toHaveLength()' works for arrays and strings alike ;-)
            checkDocumentValid(document) || document?.diagnostics?.map(diagnosticToString)?.join('\n')
        ).toHaveLength(0);
    });

    test('check-examples-files', async() => {
        for (const file of readdirSync("examples")) {
            if (file.endsWith(".c64b")) {
                const content = readFileSync(`examples/${file}`, "utf-8");
                console.log("parsing: "+file)
                document = await parse(content);
                expect(
                    checkDocumentValid(document) || document?.diagnostics?.map(diagnosticToString)?.join('\n')
                ).toHaveLength(0);
            }
        }
    });

    test('check-examples-error-files', async() => {
        for (const file of readdirSync("examples_errors")) {
            if (file.endsWith(".c64b")) {
                const content = readFileSync(`examples_errors/${file}`, "utf-8");
                console.log("parsing: "+file)
                document = await parse(content);
                expect(
                    checkDocumentValid(document) || document?.diagnostics?.map(diagnosticToString)?.join('\n')
                ).not.toHaveLength(0);
            }
        }
    });
    
});



function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}

function diagnosticToString(d: Diagnostic) {
    return `[${d.range.start.line}:${d.range.start.character}..${d.range.end.line}:${d.range.end.character}]: ${d.message}`;
}
