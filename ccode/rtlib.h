struct BString {
    char* data;
    size_t length;
    size_t capacity;
};

struct arr_entry {
    // pointer on int of float variables
    void *data;
    size_t rank;
    size_t dims[];
    /*
        real structure is like this but not able in c
        long long dim[rank];
        long long index[rank];
    */
};

void freeBString(struct BString* str);
void initBString(struct BString* str);
void assignFromConst(struct BString* str, const char* data);
void assignCString(struct BString* str, const char* data);
void assignBString(struct BString* target, const struct BString* str);
void assignInt(struct BString* target, int value);
void assignDouble(struct BString* target, double value);
void assignChar(struct BString* target, char value);
size_t bstringToInt(struct BString* str);
double bstringToDouble(struct BString* str);

void appendBString(struct BString* target, const struct BString* str);
void appendCString(struct BString* target, const char* cstr);
void concatBString(struct BString* target, const struct BString* str1, const struct BString* str2);
void bstrRight(struct BString* target, const struct BString* str, size_t count);
void bstrLeft(struct BString* target, const struct BString* str, size_t count);
void bstrMid(struct BString* target, const struct BString* str, size_t pos, size_t count);
void bstrSpc(struct BString* target, size_t count);
void bstrTab(struct BString* target, size_t count);

void inputBString(struct BString* str);
void inputData(struct BString* message,const char *format, ...);
void readChar(struct BString* str);

void c64_error(size_t err_no);

void c64_init_array(struct arr_entry *arr,size_t rank);
size_t* c64_get_item_ptr(struct arr_entry *arr);
size_t c64_get_item(struct arr_entry *arr);
struct BString* c64_get_str_item_ptr(struct arr_entry *arr);

size_t arr_entry_size(size_t rank);