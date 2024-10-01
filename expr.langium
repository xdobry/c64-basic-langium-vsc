grammar Expr

entry Model:
   Expr;

Expr: Logical;

Logical infers Expr:
    Comparison ({infer BinExpr.e1=current} op=('AND' | 'OR') e2=Comparison)*;
Comparison infers Expr:
    Add ({infer BinExpr.e1=current} op=('<' | '<=' | '>' | '>=' | '=' | '<>') e2=Add)*;
Add  infers Expr: 
    Mult ({infer BinExpr.e1=current} op=('+'|'-') e2=Mult)*;
Mult infers Expr: 
    PrimExpr ({infer BinExpr.e1=current} op=('*'|'/') e2=PrimExpr)*;

PrimExpr: IntNumber | GroupExpr | NotExpr | NegExpr;

GroupExpr:  '(' ge=Expr ')';
NotExpr: 'NOT' expr=Expr;
NegExpr:  '-' ne=PrimExpr;

IntNumber: val=INT_NUMBER;

terminal INT_NUMBER returns string: /[0-9]+/;