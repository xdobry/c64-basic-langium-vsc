#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char const *str1 = "Hello, ";
    char const *str2 = "World!";
    int len1 = strlen(str1);
    int len2 = strlen(str2);
    char *str3 = malloc(len1+len2+1);
    strcpy(str3, str1);
    strcpy(str3+len1, str2);
    puts(str3);
    free(str3);
    return 0;
}