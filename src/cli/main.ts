import type { Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { C64BasicLanguageMetaData } from '../language/module.js';
import { createC64BasicServices } from '../language/c-64-basic-module.js';
import { extractAstNode } from './cli-util.js';
import { generateAssemblerCode } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    const generatedFilePath = generateAssemblerCode(model, fileName, opts.destination);
    console.log(chalk.green(`Assembly code generated successfully: ${generatedFilePath}`));
};

export const generateAst = async (fileName: string): Promise<void> => {
    const services = createC64BasicServices(NodeFileSystem).C64Basic;
    const model = await extractAstNode<Model>(fileName, services);
    // serialize & output the model ast
    const serializedAst = services.serializer.JsonSerializer.serialize(model, { sourceText: true, textRegions: true });
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
}

export default function(): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = C64BasicLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates assemble code')
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
