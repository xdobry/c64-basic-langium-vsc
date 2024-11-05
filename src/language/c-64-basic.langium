grammar C64Basic

entry Model:
    (lines+=Line? (NEWLINE_DI|NEWLINE))+ (lines+=Line)?;

Line: (linenum=INT_NUMBER? lineLabel=LABEL_NAME? stmts+=Stmt (COLON stmts+=Stmt)* COLON?) | linenum=INT_NUMBER | lineLabel=LABEL_NAME;

Stmt: Cmd;

Cmd: Print | LetStr | LetNum | GoTo | If | For | Next | End | Input | Get | Read | Data | Restore | Poke | Return | GoSub | Dim | OnGoto | OnGoSub | DefFn | Wait | Run;

Print: "PRINT" (exprs+=SExprt)*;

LetStr: "LET"? name=StringVar "=" expr=SExpr;

LetNum: "LET"? name=(IntVar | FloatVar) "=" expr=Expr;

GoTo: "GOTO" (label=[Line:FLOAT_VARNAME] | lineNumber=[Line:INT_NUMBER]);

GoSub: "GOSUB" (label=[Line:FLOAT_VARNAME] | lineNumber=[Line:INT_NUMBER]);

If: "IF" cond=Expr "THEN" ((stmts+=Stmt (COLON stmts+=Stmt)* COLON?) | label=[Line:FLOAT_VARNAME] | lineNumber=[Line:INT_NUMBER]);

For: "FOR" name=Var "=" start=Expr "TO" end=Expr ("STEP" step=Expr)?;

Next: "NEXT" (vars+=AllVarRef (',' vars+=AllVarRef)*)?;

End: {infer End} 'END';

Input: "INPUT" (msg=StringLiteral ';')? vars+=Var (',' vars+=Var)*;

Get: "GET" var=StringVar;

Read: "READ" vars+=Var (',' vars+=Var)*;

Data: "DATA" values+=DATA_ITEM*;

Poke: "POKE" addr=Expr ',' value=Expr;

Restore: {infer Restore} "RESTORE";

Return: {infer Return} "RETURN";

Run: "RUN" (label=[Line:FLOAT_VARNAME] | lineNumber=[Line:INT_NUMBER]);

Dim: "DIM" vars+=(IntVar | FloatVar | StringVar) (',' vars+=(IntVar | FloatVar | StringVar) )*;

OnGoto: "ON" expr=Expr "GOTO" ((labels+=[Line:FLOAT_VARNAME] (',' labels+=[Line:FLOAT_VARNAME])*) | (lineNumbers+=[Line:INT_NUMBER] (',' lineNumbers+=[Line:INT_NUMBER])*));

OnGoSub: "ON" expr=Expr "GOSUB" ((labels+=[Line:FLOAT_VARNAME] (',' labels+=[Line:FLOAT_VARNAME])*) | (lineNumbers+=[Line:INT_NUMBER] (',' lineNumbers+=[Line:INT_NUMBER])*));

DefFn: "DEF" "FN" name=FLOAT_VARNAME '(' param=( FloatVar | IntVar) ')' '=' expr=Expr;

Wait: "WAIT" addr=Expr ',' mask=Expr (',' invers=Expr)?;

Var : StringVar | IntVar | FloatVar;

NumFunc: func=('RND' | 'ABS' | 'SGN' | 'INT' | 'SQR' | 'LOG' | 'EXP' | 'COS' | 'SIN' | 'TAN' | 'ATN' | 'PEEK' | 'POS') '(' param=Expr ')';

StringVar: name=STRING_VARNAME ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;
IntVar: name=INT_VARNAME ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;
FloatVar: name=FLOAT_VARNAME ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;

SExprt: (Expr | SExpr) sep=(';' | ',')?;

SExpr: SAdd;

SAdd infers SExpr: 
    SPrimExpr  ({infer SBinExpr.e1=current} op=('+') e2=SPrimExpr)*;

SPrimExpr: StringLiteral | StringVarRef | StringFunction;

StringFunction: StringFunction1 | StringFunction2 | StringFunction3 | Chrs | Str;

StringFunction1: func=('SPC' | 'TAB') '(' param=Expr ')';

StringFunction2: func=('LEFT$' | 'RIGHT$') '(' str=SExpr ',' param=Expr ')';

StringFunction3: func=('MID$')  '(' str=SExpr ',' param=Expr (',' len=Expr)? ')';

Chrs: 'CHR$' '(' param=Expr ')';

Str: 'STR$' '(' param=Expr ')';

Asc: 'ASC' '(' param=SExpr ')';

Len: 'LEN' '(' param=SExpr ')';

Val: 'VAL' '(' param=SExpr ')';

Expr: Logical;

Logical infers Expr:
    Comparison ({infer BinExpr.e1=current} op=('AND' | 'OR') e2=Comparison)*;
Comparison infers Expr:
    Add ({infer BinExpr.e1=current} op=('<' | '<=' | '>' | '>=' | '=' | '<>') e2=Add)*;
Add  infers Expr: 
    Mult ({infer BinExpr.e1=current} op=('+'|'-') e2=Mult)*;
Mult infers Expr: 
    PrimExpr ({infer BinExpr.e1=current} op=('*'|'/'|'^') e2=PrimExpr)*;

PrimExpr: VarRef | IntNumber | FloatNumber | GroupExpr | NotExpr | NumFunc | PiConst | Asc | Len | Val | StrComparision | FnCall | NegExpr;

FnCall: 'FN' fnname=[DefFn:FLOAT_VARNAME] '(' param=Expr ')';

GroupExpr:  '(' ge=Expr ')';
NotExpr: 'NOT' expr=Expr;
NegExpr: '-' expr=PrimExpr;

StrComparision: e1=SPrimExpr operator=('<' | '<=' | '>' | '>=' | '=' | '<>') e2=SPrimExpr;

VarRef: IntVarRef | FloatVarRef | TiVarRef;

TiVarRef:  {infer TiVarRef} 'TI';

AllVarRef: VarRef | StringVarRef;

StringVarRef: var=[StringVar:STRING_VARNAME] ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;
IntVarRef: var=[IntVar:INT_VARNAME] ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;
FloatVarRef: var=[FloatVar:FLOAT_VARNAME] ('(' indexes+=Expr  (',' indexes+=Expr)* ')')?;

StringLiteral: val=STRING;
IntNumber: val=INT_NUMBER;
FloatNumber: val=FLOAT;
PiConst: {infer PiConst} 'π';

hidden terminal WS: /[ \t]+/;

// terminal BASIC_KEYWORDS returns string: /PRINT|LET|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|TI|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT/;
terminal INT_VARNAME returns string: /(?!PRINT|LET|REM|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Z][A-Z0-9]*%/i;
// use positive look before to ensure that label only positioned at line beginning
terminal LABEL_NAME returns string: /(?<=[\n\r])([A-Za-z][A-Za-z0-9]+):/;
terminal STRING_VARNAME returns string: /(?!PRINT|REM|LET|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Z][A-Z0-9]*\$/i;
terminal FLOAT_VARNAME returns string: /(?!PRINT|REM|LET|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Za-z][A-Za-z0-9]*/i;
terminal FLOAT returns number: /[0-9]*\.[0-9]+(E-?[0-9]+)?/;
terminal INT_NUMBER returns string: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"/;
terminal COLON: ':';
terminal NEWLINE: /[\n\r]+/;
terminal NEWLINE_DI: /##_placeholder2_##/;
terminal DATA_ITEM: /##_placeholder_##/;

// hidden terminal REM_COMMENT: /:?\s*?#[^\n\r]*/;
hidden terminal SL_COMMENT: /REM[^\n\r]*/i;
