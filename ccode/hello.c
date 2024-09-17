#include <stdio.h>
#include <stdlib.h>

void test(int num) {
    char buffer[30];
    itoa(num, buffer, 10);
    puts(buffer);
}

void test2() {
    puts("Hallo test2");
}

int main() {
    printf("Hello, World!\n");
    test2();
    test(12);
    test(23);

    double d1=10.0,d2=2.0;
    double r = d1/d2;
    double s = d1+d2;
    double p = (d1*d2)-s;
    printf("r=%f s=%f p=%f\n",r,s,p);

    return 0;
}