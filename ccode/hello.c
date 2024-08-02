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
    return 0;
}