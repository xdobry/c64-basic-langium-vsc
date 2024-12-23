import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import type { Diagnostic } from "vscode-languageserver-types";
import { createC64BasicServices } from "../../src/language/c-64-basic-module.js";
import { Model, isModel } from "../../src/language/generated/ast.js";
import { readdirSync, readFileSync, existsSync } from "fs";
import { generateAssemblerCode } from "../../src/cli/generator.js";
import * as path from 'node:path';
import { execSync } from 'node:child_process';

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

describe('Compilation', () => {
  
    test('check-compile-files', async() => {
        const indir = 'examples_compile';
        for (const file of readdirSync(indir)) {
            if (file.endsWith(".c64b") && !file.startsWith("keyread")) {
                const idx = file.lastIndexOf('.')
                const inputFile = file.substring(0,idx)+".txt"
                const inputFilePath = path.join(indir,inputFile)
                const filePath = path.join(indir,file);
                const content = readFileSync(filePath, "utf-8");
                console.log("compile: "+file)
                document = await parse(content);
                expect(
                    checkDocumentValid(document) || document?.diagnostics?.map(diagnosticToString)?.join('\n'),
                    `error found in ${file}`).toHaveLength(0);
                const baseName = file.substring(0,file.length-5)
                const sFile = path.join('generated',baseName+".s");
                const outFile = path.join('generated',baseName+".exe");  
                generateAssemblerCode(document.parseResult.value,filePath,{destination:"generated"});
                console.log(`gcc ${sFile} .\\ccode\\rtlib.c -o ${outFile}`)
                const stdout = execSync(`gcc ${sFile} .\\ccode\\rtlib.c -o ${outFile}`);
                console.log("gcc output: " + stdout.toString());
                if (!existsSync(inputFilePath)) {
                    const stdout2 = execSync(outFile).toString();
                    console.log("exe output: " + stdout2);
                    expect(stdout2,`ERROR output in file ${file}`).not.toMatch("ERROR")
                    expect(stdout2,`NO END marker in file ${file}`).toMatch("END")
                } else {
                    const inputValue = readFileSync(inputFilePath).toString()
                    const stdout2 = execSync(outFile,{input:inputValue}).toString();
                    console.log("exe stdin output: " + stdout2);
                    expect(stdout2,`ERROR output in file ${file}`).not.toMatch("ERROR")
                    expect(stdout2,`NO END marker in file ${file}`).toMatch("END")
                }
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
