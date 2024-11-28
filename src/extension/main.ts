import type { LanguageClientOptions, ServerOptions} from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { crunchAction, decrunchAction, generateAction } from '../cli/main.js';

let client: LanguageClient;

// This function is called when the extension is activated.
export function activate(context: vscode.ExtensionContext): void {
    client = startLanguageClient(context);
    context.subscriptions.push(
        vscode.commands.registerCommand('c64basic.compile', () => compile(context))
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('c64basic.crunch', () => crunch(context))
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('c64basic.decrunch', () => decrunch(context))
    );
    context.subscriptions.push(
        vscode.tasks.registerTaskProvider('c64basic', {
            provideTasks: () => {
                return [
                    new vscode.Task(
                        { type: 'c64basic', task: 'compile', file:'${file}' },
                        vscode.TaskScope.Workspace,
                        'Compile',
                        'c64basic',
                        new vscode.ShellExecution('echo Compiling... && sleep 1 && echo Done'),
                        []
                    ),
                    new vscode.Task(
                        { type: 'c64basic', task: 'crunch', file:'${file}' },
                        vscode.TaskScope.Workspace,
                        'Crunch',
                        'c64basic',
                        new vscode.ShellExecution('echo Crunching... && sleep 1 && echo Done'),
                        []
                    ),
                    new vscode.Task(
                        { type: 'c64basic', task: 'decrunch', file:'${file}' },
                        vscode.TaskScope.Workspace,
                        'Decrunch',
                        'c64basic',
                        new vscode.ShellExecution('echo Decrunching... && sleep 1 && echo Done'),
                        []
                    )
                ];
            },
            resolveTask(_task: vscode.Task): vscode.Task | undefined {
                return undefined;
            }
        })
    );
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join('out', 'language', 'main.cjs'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging.
    // By setting `process.env.DEBUG_BREAK` to a truthy value, the language server will wait until a debugger is attached.
    const debugOptions = { execArgv: ['--nolazy', `--inspect${process.env.DEBUG_BREAK ? '-brk' : ''}=${process.env.DEBUG_SOCKET || '6009'}`] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'c-64-basic' }]
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'c-64-basic',
        'c64basic',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}

async function compile(context: vscode.ExtensionContext) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const fileName = activeEditor.document.fileName;
        // const content = activeEditor.document.getText();
        // Use the fileName and content as needed
        console.log("Compiling..."+fileName);
        try {
            const config = vscode.workspace.getConfiguration();
            const gccPath = config.get('compilerPath') as string;
            if (!fs.existsSync(gccPath)) {
                vscode.window.showErrorMessage('GCC path does not exist: ' + gccPath+ ' please configure the "compiler Path" in c64basic extension settings');
                return;
            }
            const extensionPath = context.extensionPath;
            await generateAction(fileName, { suppress_compiling: false, gcc_path: gccPath, home_path: extensionPath });
            vscode.window.showInformationMessage('Compiling finished');
        } catch (e) {
            vscode.window.showErrorMessage('Error compiling: ' + e);
        }
    } else {
        vscode.window.showErrorMessage('No active editor available.');
    }
}

async function crunch(context: vscode.ExtensionContext) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const fileName = activeEditor.document.fileName;
        console.log("Crunching..."+fileName);
        try {
            await crunchAction(fileName);
            vscode.window.showInformationMessage('Crunching finished');
        } catch (e) {
            vscode.window.showErrorMessage('Error crunching: ' + e);
        }
    } else {
        vscode.window.showErrorMessage('No active editor available.');
    }
}

async function decrunch(context: vscode.ExtensionContext) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const fileName = activeEditor.document.fileName;
        console.log("Decrunching..."+fileName);
        try {
            await decrunchAction(fileName);
            vscode.window.showInformationMessage('Decrunching finished');
        } catch (e) {
            vscode.window.showErrorMessage('Error decrunching: ' + e);
        }
    } else {
        vscode.window.showErrorMessage('No active editor available.');
    }
}
