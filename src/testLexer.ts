import { Lexer, createToken } from 'chevrotain';

function testLexer() {
    console.log("We test multi mode lexer, because the data keyword force different tokenization till end of line");
    const commaToken = createToken({ name: "Comma", pattern: /,/ });
    const nameToken = createToken({ name: "Name", pattern: /[a-zA-Z]+/ });
    const numberToken = createToken({ name: "Number", pattern: /[0-9]+/ });
    const whiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });
    const dataKeyword = createToken({ name: "DataKeyword", pattern: /data\s+/i, push_mode: "data_mode" });
    const dataItem = createToken({ name: "DataItem", pattern: /"[^\n"]+"|[^,\n]+/ });
    const lineEnd = createToken({ name: "LineEnd", pattern: /\n/, pop_mode: true, group: Lexer.SKIPPED});
    const skipComma = createToken({ name: "SkipComma", pattern: /,\s*/, group: Lexer.SKIPPED });
    const multiMode = {
        modes: {
            normal_mode: [dataKeyword, commaToken, nameToken, numberToken, whiteSpace],
            data_mode: [dataItem, skipComma, lineEnd],
        },
        defaultMode: "normal_mode",
    }
    const lexer = new Lexer(multiMode);
    lexer.tokenize(`
hello, 42
data my data , was-ist , 4,5.0
data "my data, ist great",artur,LET
print test`).tokens.forEach(token => {
        console.log(`"${token.image}" -> ${token.tokenType.name}`);
    });
}

testLexer();
