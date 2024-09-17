#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <conio.h>
#include <stdarg.h>
#include <stdbool.h>

#include "rtlib.h"

/*
BString ist basic string. Es kann etweder als Variable Inhalt dienen oder wird als Parameter übergeben.
Operationen
- Aus der Contante *char setzen
- Aus der *char setzen (durch copy)
- append (entweder durch *char oder BString)
- Die Inhalt muss freigegeben werden wenn es durch malloc entstanden ist und nicht mehr nötig ist.
- Es ist dann nicht nötig wenn es aus dem scope ist:
  - die operation wurde durchgefürht
  - die variable wird nicht mehr verwendet

 Es werden weitere temp variablen verwendet, immer dann wenn operationen auf string durchgefürht werden.

String operationen
- int to str
- str concat (target str, s1 str, s2 str)
- str append (target str, s str)
- str function str->str

*/

void freeBString(struct BString* str) {
    if (str->data != NULL && str->capacity>0) {
        free(str->data);
    }
    str->data = NULL;
    str->length = 0;
    str->capacity = 0;
}

void initBString(struct BString* str) {
    str->data = NULL;
    str->length = 0;
    str->capacity = 0;
}

void assignFromConst(struct BString* str, const char* data) {
    str->length = strlen(data);
    str->data = (char *) data;
    str->capacity = 0;
}

void assignCString(struct BString* str, const char* data) {
    freeBString(str);
    str->length = strlen(data);
    str->data = malloc(str->length+1);
    str->capacity = str->length+1;
    strcpy(str->data, data);
}

void assignCStringLen(struct BString* str, const char* data, size_t length) {
    freeBString(str);
    str->length = length;
    if (length==0) {
        str->data = NULL;
        str->capacity = 0;
    } else {
        str->data = malloc(str->length+1);
        str->capacity = str->length+1;
        strncpy(str->data, data, length);
        str->data[length] = '\0';
    }
}

void assignBString(struct BString* target, const struct BString* str) {
    // TODO just use existing mem if possible
    freeBString(target);
    target->data = malloc(str->length+1);
    memcpy(target->data, str->data, str->length);
    target->data[str->length] = '\0';
    target->length = str->length;
    target->capacity = str->length;
}

void assignInt(struct BString* target, int value) {
    char buffer[20];
    sprintf(buffer, "%d", value);
    assignCString(target, buffer);
}

void assignDouble(struct BString* target, double value) {
    char buffer[20];
    sprintf(buffer, "%f", value);
    assignCString(target, buffer);
}

void assignChar(struct BString* target, char value) {
    char buffer[2];
    buffer[0] = value;
    buffer[1] = '\0';
    assignCString(target, buffer);
}

void ensureNoConst(struct BString* str, size_t capacity) {
    if (str->capacity == 0 && str->length > 0) {
        char *new_data = malloc(capacity+1);
        memcpy(new_data, str->data, str->length+1);
        str->data = new_data;
        str->capacity = capacity;
    }
}

void appendBString(struct BString* target, const struct BString* str) {
    if (target->data==NULL) {
        assignBString(target, str);
        return;
    }
    size_t newLength = target->length + str->length;
    ensureNoConst(target, newLength);
    if (target->capacity < newLength) {
        target->data = realloc(target->data, newLength+1);
        target->capacity = newLength;
    }
    memcpy(target->data + target->length, str->data, str->length);
    target->data[newLength] = '\0';
    target->length = newLength;
}

void appendCString(struct BString* target, const char* cstr) {
    if (target->data==NULL) {
        assignCString(target, cstr);
        return;
    }
    size_t clen = strlen(cstr);
    size_t newLength = target->length + clen;
    ensureNoConst(target, newLength);
    if (target->capacity < newLength) {
        target->data = realloc(target->data, newLength+1);
        target->capacity = newLength;
    }
    memcpy(target->data + target->length, cstr, clen);
    target->data[newLength] = '\0';
    target->length = newLength;
}

void concatBString(struct BString* target, const struct BString* str1, const struct BString* str2) {
    if (target==str1) {
        appendBString(target, str2);
    } else {
        assignBString(target, str1);
        appendBString(target, str2);
    }
}

void bstrRight(struct BString* target, const struct BString* str, size_t count) {
    if (count >= str->length) {
        assignBString(target, str);
    } else {
        struct BString temp;
        temp.data = str->data + str->length - count;
        temp.length = count;
        temp.capacity = str->capacity;
        assignBString(target, &temp);
    }
}

void bstrLeft(struct BString* target, const struct BString* str, size_t count) {
    if (count >= str->length) {
        assignBString(target, str);
    } else {
        struct BString temp;
        temp.data = str->data;
        temp.length = count;
        temp.capacity = str->capacity;
        assignBString(target, &temp);
    }
}

void bstrMid(struct BString* target, const struct BString* str, size_t pos, size_t count) {
    if (pos >= str->length) {
        freeBString(target);
    } else {
        struct BString temp;
        temp.data = str->data + pos;
        temp.length = str->length - pos > count && count != 0  ? count : str->length - pos;
        temp.capacity = str->capacity;
        assignBString(target, &temp);
    }
}

void inputBString(struct BString* str) {
    printf("Enter a string: ");
    char buffer[100];
    fgets(buffer, 100, stdin);
    int len = strlen(buffer);
    if (len>0) {
        buffer[len - 1] = '\0';
        assignCString(str, buffer);
    } else {
        freeBString(str);
    }
}

void readChar(struct BString* str) {
    char mc = _getch();
    assignChar(str, mc);
}

/**
 * Reimplementation (without error handling and redo) of the INPUT Basic function
 * 
 * format are simple chars 
 *   - s: Bstring pointer
 *   - i: int pointer (long 64 bit)
 *   - d: double pointer
 */
void inputData(struct BString* message,const char *format, ...) {
    char buffer[100];
    while (1) {
        if (message && message->data) {
            printf("%s? ", message->data);
        } else {
            printf("? ");
        }
        fgets(buffer, 100, stdin);
        int len = strlen(buffer);
        if (len>0) {
            buffer[len - 1] = '\0';
            break;
        }
    }
    va_list args;
    va_start(args, format);
    char *ptr=buffer;
    char *start;
    char *next_start=ptr;
    bool isQuoted=false;
    bool isFinished = false;
    for (int i=0; format[i]; i++) {
        if (isFinished) {
            printf("?? ");
            fgets(buffer, 100, stdin);
            int len = strlen(buffer);
            if (len>0) {
                buffer[len - 1] = '\0';
            }
            ptr = buffer;
            next_start = ptr;
            isFinished = false;
        }
        start = next_start;
        while (*start==' ') {
            start++;
        }
        if (start[0]=='"') {
            isQuoted=true;
            start++;
        }
        ptr=start;
        while (1) {
            if (ptr[0]=='\0') {
                isFinished = true;
                break;
            } else if (isQuoted) {
                if (*ptr=='"') {
                    next_start = ptr+1;
                    while (1) {
                        if (*next_start=='\0') {
                            isFinished = true;
                            break;
                        }
                        if (*next_start==',') {
                            next_start++;
                            break;
                        }
                        next_start++;                        
                    }
                    isQuoted = false;
                    break;
                }
            } else {
                if (*ptr==',') {
                    next_start = ptr+1;
                    break;
                }
            }
            ptr++;
        }
        if (format[i] == 's') {
            struct BString *bstring = va_arg(args, struct BString *);
            assignCStringLen(bstring, start, ptr-start);
        } else if (format[i]=='i') {
            long long *val = va_arg(args, long long*);
            *val = atoi(start);
        } else if (format[i]=='d') {
            double *val = va_arg(args, double*);
            *val = atof(start);
        }
    }
    va_end(args);  
}

double signd(double d) {
    if (d<0) return -1.0;
    if (d>0) return 1.0;
    return 0.0;
}

double c64rnd(double d) {
    if (d<0.0) {
        srand(d);
    }
    return (double) rand() / (double) RAND_MAX;
}