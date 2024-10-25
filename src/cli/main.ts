import type { Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { C64BasicLanguageMetaData } from '../language/module.js';
import { createC64BasicServices } from '../language/c-64-basic-module.js';
import { extractAstNode } from './cli-util.js';
import { generateAssemblerCode, CompileError } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { exec } from 'child_process';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    try {
        const generatedFilePath = generateAssemblerCode(model, fileName, opts);
        console.log(chalk.green(`Assembly code generated successfully: ${generatedFilePath}`));
        if (!opts.suppress_compiling) {
            const outPutFile = path.join(path.dirname(generatedFilePath), path.basename(generatedFilePath, path.extname(generatedFilePath)) + '.exe');
            // TODO compute the location of the rtlib.c file
            const compileCommand = `gcc "${generatedFilePath}" .\\ccode\\rtlib.c -o "${outPutFile}"`;
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
                const sourceText = (await fs.readFile(fileName, 'utf-8')).toString();
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
    const documentString = await fs.readFile(fileName, 'utf-8');
    const tokens = lexer.tokenize(documentString);
    for (const token of tokens.tokens) {
        console.log(token);
    }
};

export type GenerateOptions = {
    destination?: string;
    suppress_compiling?: boolean;
    eager_free_memory?: boolean
}

export default function(): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = C64BasicLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .option('-s, --suppress_compiling','supress compiling assembler code to executable using mingw')
        .option('--eager_free_memory','eager free memory for temporary string')
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

    program.parse(process.argv);
}
