import type { AstNode, LangiumCoreServices, LangiumDocument } from 'langium';
import chalk from 'chalk';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { URI } from 'langium';

export async function extractDocument(fileName: string, services: LangiumCoreServices): Promise<LangiumDocument> {
    const extensions = services.LanguageMetaData.fileExtensions;
    if (!extensions.includes(path.extname(fileName))) {
        console.error(chalk.yellow(`Please choose a file with one of these extensions: ${extensions}.`));
        process.exit(1);
    }

    if (!fs.existsSync(fileName)) {
        console.error(chalk.red(`File ${fileName} does not exist.`));
        process.exit(1);
    }

    const content = fs.readFileSync(fileName);
    // We need to remove the BOM character at the beginning of the file
    // it is regulary put by windows notepad and will cause the parser to fail
    const contentWithoutHeader = content.toString().replace(/^\uFEFF/, '');
    const document = await services.shared.workspace.LangiumDocumentFactory.fromString(contentWithoutHeader, URI.file(path.resolve(fileName)));
    // const document = await services.shared.workspace.LangiumDocuments.getOrCreateDocument(URI.file(path.resolve(fileName)));
    await services.shared.workspace.DocumentBuilder.build([document], { validation: true });

    const validationErrors = (document.diagnostics ?? []).filter(e => e.severity === 1);
    if (validationErrors.length > 0) {
        console.error(chalk.red('There are validation parsing errors:'));
        for (const validationError of validationErrors) {
            console.error(chalk.red(
                `${fileName}:${validationError.range.start.line + 1}:${validationError.range.start.character}: ${validationError.message} [${document.textDocument.getText(validationError.range)}]`
            ));
        }
        process.exit(1);
    }

    return document;
}

export async function extractAstNode<T extends AstNode>(fileName: string, services: LangiumCoreServices): Promise<T> {
    return (await extractDocument(fileName, services)).parseResult?.value as T;
}

interface FilePathData {
    destination: string,
    name: string
}

export function extractDestinationAndName(filePath: string, destination: string | undefined): FilePathData {
    const filePathR = path.basename(filePath, path.extname(filePath));
    return {
        destination: destination ? path.join(path.dirname(filePathR), destination) : path.dirname(filePath),
        name: path.basename(filePathR)
    };
}
