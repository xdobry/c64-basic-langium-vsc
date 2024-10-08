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
    // printf("assignBString target=%p len=%ld source=%p len=%ld\n", target, target->length,str, str->length);
    if (target==str) {
        return;
    }
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

void bstrSpc(struct BString* target, size_t count) {
    if (target->capacity < count+1) {
        if (target->data==NULL) {
            target->data = malloc(count+1);
        } else {
            target->data = realloc(target->data, count+1);
        }
        target->capacity = count+1;
    }
    target->length=count;
    for (size_t i=0; i<count; i++) {
        target->data[i] = ' ';
    }
    target->data[count] = '\0';
}

/**
 * TODO - this is only fake implementation
 * for real tab we would need cursor position add move cursor to the count
 */
void bstrTab(struct BString* target, size_t count) {
    if (target->capacity < count+1) {
        if (target->data!=NULL) {
            target->data = malloc(count+1);
        } else {
            target->data = realloc(target->data, count+1);
        }
        target->capacity = count+1;
    }
    target->length=count;
    for (size_t i=0; i<count; i++) {
        target->data[i] = '\t';
    }
    target->data[count] = '\0';
}


/**
 * Compare two bstrings
 * operator
 * 0 = equal
 * 1 = not equal
 * 2 = less than <
 * 3 = greater than >
 * 4 = less than or equal <=
 * 5 = greater than or equal >=
 * 
 * return
 * -1 - true
 * 0 - false
 */
size_t bstrCmp(struct BString* c1, struct BString* c2, size_t operator)
{
    size_t res;
    if (operator==0 || operator==1) {
        if (c1->length==0 && c2->length==0) {
            res = -1;
        } else if (c1->length!=c2->length) {
            res = 0;
        } else {
            res = memcmp(c1->data, c2->data, c1->length)==0 ? -1 : 0;
        }
    } else if(operator==2 || operator==3) {
        if (c1->length==0 && c2->length==0) {
            res = 0;
        } else if (c1->length==0) {
            res = -1;
        } else if (c2->length==0) {
            res = 0;
        } else {
            int resCmp = memcmp(c1->data, c2->data, c1->length > c2->length ? c2->length : c1->length);
            if (resCmp==0) {
                res = c1->length < c2->length ? -1 : 0;
            } else {
                res = resCmp<0 ? -1 : 0;
            }
        }
    } else if(operator==4 || operator==5) {
        if (c1->length==0 && c2->length==0) {
            res = -1;
        } else if (c1->length==0) {
            res = -1;
        } else if (c2->length==0) {
            res = 0;
        } else {
            int resCmp = memcmp(c1->data, c2->data, c1->length > c2->length ? c2->length : c1->length);
            if (resCmp==0) {
                if (operator==5) {
                    res = c1->length >= c2->length ? -1 : 0;
                } else {
                    res = c1->length <= c2->length ? -1 : 0;
                }
            } else {
                if (operator==5) {
                    res = resCmp>0 ? -1 : 0;
                } else {
                    res = resCmp<0 ? -1 : 0;
                }
                
            }
        }
    }
    if (operator==1 || operator==3) {
        res = res ? 0 : -1;
    }
    /*
    if (c1->data && c2->data) {
       printf("cmp res=%ld op=%ld p1='%s' p2='%s'\n",res, operator, c1->data, c2->data);
    } else {
       printf("cmp res=%ld op=%ld l1=%ld l2=%ld\n",res, operator, c1->length, c2->length);
    }
    */
    return res;
};

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

size_t bstringToInt(struct BString* str) {
    if (str->data && str->length>0) {
        char *end;
        return strtol(str->data,&end,10);
    } else {
        return 0;
    }   
}
double bstringToDouble(struct BString* str) {
    if (str->data && str->length>0) {
        return atof(str->data);
    } else {
        return 0;
    }   
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
            char *end;
            *val = strtol(start,&end,10);
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

static const char* errorMessages[] = {
    "UNDEF'D FUNCTION", // 1
    "RETURN WITHOUT GOSUB",  // 2
    "NEXT WITHOUT FOR", // 3
    "DIVISION BY ZERO", // 4
    "REDIM'D ARRAY", // 5
    "BAD SUBSCRIPT", // 6 - array index out of bounds
    "OVERFLOW", // 7
    "OUT OF DATA", // 8
    /*
    "BREAK",
    "NOT INPUT FILE",
    "CAN'T CONTINUE",
    "NOT OUTPUT FILE",
    "DEVICE NOT PRESENT",
    "OUT OF MEMORY",
    "FILE DATA",
    "FILE NOT FOUND",
    "FILE NOT OPEN",
    "FILE OPEN",
    "STRING TOO LONG",
    "FORMULA TOO COMPLEX",
    "SYNTAX",
    "ILLEGAL DEVICE NUMBER",
    "TOO MANY FILES",
    "ILLEGAL DIRECT",
    "TYPE MISMATCH",
    "ILLEGAL QUANTITY", // parameter out of range
    "LOAD",
    "UNDEF'D STATEMENT", // goto to undefined line
    "MISSING FILENAME"
    */
};


void c64_error(size_t err_no) {
    printf("?%s  ERROR\n", errorMessages[err_no-1]);
    exit(err_no);
}



void c64_allocate_arr(struct arr_entry *arr,size_t elem_size) {
    long size = 1;
    // if array has dimension 0, set it to 10 (array without dim)
    for (int i=0; i<arr->rank; i++) {
        if (arr->dims[i]==0) {
            arr->dims[i] = 10;
        }
    }
    for (int i=0; i<arr->rank; i++) {
        size *= arr->dims[i]+1;
    }
    arr->data = calloc(1, size*elem_size);
}

size_t arr_entry_size(size_t rank) {
    return sizeof(struct arr_entry) + sizeof(size_t)*rank*2;
}

size_t arr_elem_index(struct arr_entry *arr) {
    // Check out of bound error for each dimension
    for (int i=0; i<arr->rank; i++) {
        if (arr->dims[i+arr->rank]>arr->dims[i]) {
            // printf("Array index out bound %d dim %ld index %ld \n",i,arr->dims[i],arr->dims[i+arr->rank]);
            c64_error(6);
        }
    }
    size_t index = 0;
    for (int i=0; i<arr->rank; i++) {
        size_t dimSkip = 1;
        for (int j=i+1; j<arr->rank; j++) {
            dimSkip *= arr->dims[j]+1;
        }
        index += arr->dims[i+arr->rank]*dimSkip;
    }
    // printf(" arr index %ld\n",index);
    return index;
}

size_t* c64_get_item_ptr(struct arr_entry *arr) {
    if (!arr->data) {
        c64_allocate_arr(arr, sizeof(size_t));
    }
    size_t index = arr_elem_index(arr);
    return (size_t *)((size_t)arr->data + index*sizeof(size_t));
}

size_t c64_get_item(struct arr_entry *arr) {
    return *c64_get_item_ptr(arr);
}

struct BString* c64_get_str_item_ptr(struct arr_entry *arr) {
    if (!arr->data) {
        c64_allocate_arr(arr, sizeof(struct BString));
    }
    size_t index = arr_elem_index(arr);
    return (struct BString *)((size_t)arr->data + index*sizeof(struct BString));
}

void c64_init_array(struct arr_entry *arr,size_t rank) {
    arr->data = NULL;
    arr->rank = rank;
    for (int i=0; i<rank; i++) {
        arr->dims[i] = 0;
        arr->dims[i+rank] = 0;
    }
}

#define SLEN 32
size_t retstack[SLEN];
// free position on stack
size_t stack_pos = 0;

void pushEntry(size_t add) {
    if (stack_pos>SLEN) {
        c64_error(7);
    }
    retstack[stack_pos++] = add;
}

size_t popEntry() {
    if (stack_pos<=0) {
        c64_error(2);
    }
    return retstack[--stack_pos];
}

/**
 * All data (from DATA c64 basic command) are stored as Data Entries
 * as character, integer or double values.
 * the structures are aligned to 4 bytes and placed each after the other.
 * they have variable lenght because the characters are added at the end of the structure.
 */
struct DataEntry {
    long long length;
    double dValue;
    long long iValue;
    char data[];
};

void readData(struct DataEntry** dpointer,const char *format, ...) {
    va_list args;
    va_start(args, format);
    for (int i=0; format[i]; i++) {
        if (dpointer[0]->length==8) {
            c64_error(7);
        }
        // printf("readData format=%c len=%ld dp=%p\n",format[i],dpointer[0]->length,dpointer[0]);
        if (format[i] == 's') {
            struct BString *bstring = va_arg(args, struct BString *);
            assignCStringLen(bstring, dpointer[0]->data, dpointer[0]->length);
        } else if (format[i]=='i') {
            long long *val = va_arg(args, long long*);
            *val = dpointer[0]->iValue;
            // printf("readData iValue=%ld\n",dpointer[0]->iValue);
        } else if (format[i]=='d') {
            double *val = va_arg(args, double*);
            // printf("readData dValue=%f\n",dpointer[0]->dValue);
            *val = dpointer[0]->dValue;
        }
        // compute the data entry of next structure
        char *b = (char *)*dpointer;
        // 20 is the size of 3*8 (dobule, quad, quad) - struct size of DataEntry
        b += 24 + dpointer[0]->length;
        size_t alignment = 4;
        size_t offset = (size_t)(b) % alignment;
        if (offset != 0) {
            b += (alignment - offset);
        }
        *dpointer = (struct DataEntry *)b;
    }
    va_end(args);  
}
