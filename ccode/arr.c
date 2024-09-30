#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "rtlib.h"

/**
 * Just test the runtime library for array handling
 */
int main() {
    struct arr_entry *arr;
    size_t size = arr_entry_size(3);
    printf("Size of arr_entry: %ld\n", size);
    arr = malloc(size);
    c64_init_array(arr,3);
    arr->dims[0] = 2;
    arr->dims[1] = 3;
    arr->dims[2] = 4;

    size_t *data = c64_get_item_ptr(arr);
    printf("Data at %p\n", (size_t)data-(size_t)arr->data);
    *data = 4711;
    printf("Data at %ld\n", c64_get_item(arr));    

    arr->dims[arr->rank+0] = 1;
    arr->dims[arr->rank+1] = 2;
    arr->dims[arr->rank+2] = 3;

    data = c64_get_item_ptr(arr);
    size_t dff = (size_t)data-(size_t)(arr->data);
    printf("Data at %p\n", dff);
    // x * (d2 * d3) + y * d3 + z;
    // because c64 index from 0..n during n dim we need indeed n+1 space for each dim
    size_t sould = (1*((3+1)*(4+1)) + 2*(4+1) + 3)*8;
    if (dff != sould) {
        printf("Error %ld != %ld\n", dff, sould);
    }   
    *data = 4712;
    printf("Data at %ld\n", c64_get_item(arr));


    // fill and read an array
    size_t v = 0;
    for (int x=0;x<=arr->dims[0];x++) {
        for (int y=0;y<=arr->dims[1];y++) {
            for (int z=0;z<=arr->dims[2];z++) {
                arr->dims[arr->rank+0] = x;
                arr->dims[arr->rank+1] = y;
                arr->dims[arr->rank+2] = z;
                data = c64_get_item_ptr(arr);
                *data = v;
                v++;
            }
        }
    }

    v = 0;
    for (int x=0;x<=arr->dims[0];x++) {
        for (int y=0;y<=arr->dims[1];y++) {
            for (int z=0;z<=arr->dims[2];z++) {
                arr->dims[arr->rank+0] = x;
                arr->dims[arr->rank+1] = y;
                arr->dims[arr->rank+2] = z;
                size_t r = c64_get_item(arr);
                if (r!=v) {
                    printf("Error x=%d,y=%d,z=%d %ld != %ld\n", x,y,z,r, v);
                }
                v++;
            }
        }
    }

    free(arr->data);
    free(arr);
    
    struct arr_entry *sarr;
    size = arr_entry_size(2);
    sarr = malloc(size);
    c64_init_array(sarr,2);

    sarr->dims[0] = 2;
    sarr->dims[1] = 3;

    struct BString a;
    struct BString b;
    initBString(&a);
    initBString(&b);
    assignCString(&a, "Hello");

    struct BString *bstr = c64_get_str_item_ptr(sarr);
    assignBString(bstr, &a);

    bstr = c64_get_str_item_ptr(sarr);
    assignBString(&b, bstr);

    printf("b=%s\n", b.data);

    return 0;
}