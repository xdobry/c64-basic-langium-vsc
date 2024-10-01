grammar Expr

entry Model:
   Expr;

Expr: Logical;

Logical infers Exprs:
    Add ({infer BinExpr.e1=current} op=('AND' | 'OR') e2=Add)*;
Add infers Expr: 
    Mult     ({infer BinExpr.e1=current} op=('+'|'-') e2=Mult)*;
Mult infers Expr: 
    Comparison ({infer BinExpr.e1=current} op=('*'|'/') e2=Comparison)*;
Comparison infers Exprs:
    PrimExpr ({infer BinExpr.e1=current} op=('<' | '<=' | '>' | '>=' | '=' | '<>') e2=PrimExpr)*;

PrimExpr: NegExpr | IntNumber | GroupExpr;


NegExpr: '-' expr=Expr;
GroupExpr:  '(' ge=Expr ')';
NotExpr: 'NOT' expr=Expr;

IntNumber: val=INT_NUMBER;

terminal INT_NUMBER returns string: /[0-9]+/;