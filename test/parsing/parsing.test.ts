import { beforeAll, describe, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { parseHelper } from "langium/test";
import { createC64BasicServices } from "../../src/language/c-64-basic-module.js";
import { Model } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createC64BasicServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createC64BasicServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.C64Basic);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing tests', () => {

    test('parse simple model', async () => {
        document = await parse(`
LET A$="TEST"
P12:
PRINT A$ 
GOTO P12           
        `);

        console.log("document: ", document);
    });
});


