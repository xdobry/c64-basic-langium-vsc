#include <stdio.h>
#include <stdlib.h>

int main() {
    char *msg = "Hello, World!\n";
    char *msg2 = "Hello, World2!\n";
    int a = 20;
    char buffer[30];
    itoa(a, buffer, 10);
    puts(msg);
    puts(msg2);
    puts(buffer);
    return 0;
}