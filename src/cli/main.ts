import { isLetNum, type Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { C64BasicLanguageMetaData } from '../language/module.js';
import { createC64BasicServices } from '../language/c-64-basic-module.js';
import { extractAstNode, extractDocument } from './cli-util.js';
import { generateAssemblerCode, CompileError } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { exec } from 'child_process';
import { startCancelableOperation, AstUtils } from 'langium';
import { crunchCode } from './crunch.js';
import { decrunchCode } from './decrunch.js';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    console.log("compile action")
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    try {
        const generatedFilePath = generateAssemblerCode(model, fileName, opts);
        console.log(chalk.green(`Assembly code generated successfully: ${generatedFilePath}`));
        if (!opts.suppress_compiling) {
            const gcc = opts.gcc_path ?? 'gcc'
            const home_path = opts.home_path ?? '.';
            const outPutFile = path.join(path.dirname(generatedFilePath), path.basename(generatedFilePath, path.extname(generatedFilePath)) + '.exe');
            // TODO compute the location of the rtlib.c file
            const compileCommand = `${gcc} "${generatedFilePath}" ${home_path}\\ccode\\rtlib.c -o "${outPutFile}"`;
            console.log(compileCommand);
            exec(compileCommand, (error, stdout, stderr) => {
                console.log(stdout)
                console.error(stderr)
                if (error) {
                    console.error(chalk.red(`Compilation failed: ${error.message}`));
                    return;
                }
                console.log(chalk.green(`Compilation successful ${outPutFile}`));
            });
            console.log("run mingw compiler to generate executable");
        }
    } catch (error) {
        if (error instanceof CompileError) {
            // need compute line from offset
            let line = 0;
            let pos = 0;
            if (error.cstNode) {
                const sourceText = fs.readFileSync(fileName, 'utf-8').toString();
                const frag = sourceText.substring(0, error.cstNode.offset);
                line = frag.split('\n').length;
                pos = frag.length - frag.lastIndexOf('\n');
            }
            console.log(`${fileName}:${line}:${pos}: compile error ${error.message}`);
        } else {
            console.error(chalk.red(`core error ${error}`));
        }
    }
};

export const generateAst = async (fileName: string): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    // serialize & output the model ast
    const serializedAst = JSON.stringify(JSON.parse(services.serializer.JsonSerializer.serialize(model, { sourceText: false, textRegions: false })),null,2);
    console.log(serializedAst);
};

export const tokenizeAction = async (fileName: string): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const lexer = services.parser.Lexer;
    const documentString = fs.readFileSync(fileName, 'utf-8');
    const tokens = lexer.tokenize(documentString);
    for (const token of tokens.tokens) {
        console.log(token);
    }
};

export const playAction = async (fileName: string): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const refProvider = services.workspace.ReferenceDescriptionProvider
    const document = await extractDocument(fileName,services)
    const s = startCancelableOperation()
    const descriptions = await refProvider.createDescriptions(document,s.token);
    for (const d of descriptions) {
        console.log(`d ${d.sourcePath}=>${d.targetPath}`)
    }

    for (const cnode of AstUtils.streamAllContents(document.parseResult.value)) {
        if (isLetNum(cnode)) {
            const refs = services.references.References.findReferences(cnode,{includeDeclaration: true});
            for (const r of refs) {
                console.log(`r ${r.sourcePath}=>${r.targetPath}`)
            }
        }
    }
    if (services.lsp.ReferencesProvider) {
        const references = await services.lsp.ReferencesProvider.findReferences(document,{
            //position:{line:2,character:7},
            position:{line:3,character:0},
            context:{includeDeclaration:true},
            textDocument: document.textDocument})
        for (const r of references) {
            console.log(`lsp ${r.uri} ${r.range.start.line}:${r.range.start.character}`)
        }
    }
};

export const crunchAction = async (fileName: string): Promise<void> => {
    console.log("crunch action")
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    const code = crunchCode(model, {});
    const crunchFile = path.join(path.dirname(fileName),path.basename(fileName, path.extname(fileName))+ '.crunched.bas');
    console.log("written to " + crunchFile);
    fs.writeFileSync(crunchFile, code);
}

export const decrunchAction = async (fileName: string): Promise<void> => {
    console.log("decrunch action")
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    const code = decrunchCode(model, {});
    const crunchFile = path.join(path.dirname(fileName),path.basename(fileName, path.extname(fileName))+ '.decrunched.bas');
    console.log("written to " + crunchFile);
    fs.writeFileSync(crunchFile, code);
}


export type GenerateOptions = {
    destination?: string;
    suppress_compiling?: boolean;
    eager_free_memory?: boolean
    gcc_path?: string
    home_path?: string
}

export default function(): void {
    const program = new Command();

    program.version("0.0.1");

    const fileExtensions = C64BasicLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .option('-s, --suppress_compiling','supress compiling assembler code to executable using mingw')
        .option('--eager_free_memory','eager free memory for temporary string')
        .option('--gcc_path <path>','path to gcc compiler')
        .option('--home_path <path>','path to tool home directory (needed for localtion of rtlib.c)')
        .description('generates assembler code')
        .action(generateAction);

    program
        .command('ast')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('Generates a Cost AST in JSON format')
        .action(generateAst);

    program
        .command('tokenize')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('Tokenizes the input file')
        .action(tokenizeAction);

    program
        .command('crunch')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('Crunch basic source to c64 ready version')
        .action(crunchAction);

    program
        .command('decrunch')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('Uncrunch c64 basic source to read friendly version')
        .action(decrunchAction);
        
    program
        .command('playAction')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('run developer play code')
        .action(playAction);

    program.parse(process.argv);
}
