#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "rtlib.h"

/**
 * Just test the runtime library
 */
int main() {
    struct BString a;
    struct BString b;
    struct BString c;
    initBString(&a);
    initBString(&b);
    initBString(&c);
    assignFromConst(&a, "Hello");
    puts(a.data);
    inputBString(&b);
    puts(b.data);
    appendCString(&a, " ");
    appendBString(&a, &b);
    puts(a.data);
    concatBString(&c, &a, &b);
    puts(c.data);

    struct BString t;
    initBString(&t);

    assignInt(&t, 1234);
    puts(t.data);
    assignDouble(&t, 12.34);
    puts(t.data);

    bstrRight(&t,&b,2);
    printf("right 2 %s\n",t.data);
    bstrLeft(&t,&b,2);
    printf("left 2 %s\n",t.data);
    bstrMid(&t,&b,2,2);
    printf("mid 2,2 %s\n",t.data);
    bstrMid(&t,&b,2,0);
    printf("mid 2,0 %s\n",t.data);

    puts("press a key");
    readChar(&t);
    printf("pressed %s\n",t.data);

    assignFromConst(&a,"Get 2 values seperated by ,");
    inputData(&a,"ss",&b,&c);
    printf("b=%s c=%s\n",b.data,c.data);

    long long l;
    assignFromConst(&a,"Get int value");
    inputData(&a,"i",&l);
    printf("int %lld\n",l);
    return 0;
}

