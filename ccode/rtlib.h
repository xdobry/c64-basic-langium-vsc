struct BString {
    char* data;
    size_t length;
    size_t capacity;
};

void freeBString(struct BString* str);
void initBString(struct BString* str);
void assignFromConst(struct BString* str, const char* data);
void assignCString(struct BString* str, const char* data);
void assignBString(struct BString* target, const struct BString* str);
void assignInt(struct BString* target, int value);
void assignDouble(struct BString* target, double value);
void assignChar(struct BString* target, char value);

void appendBString(struct BString* target, const struct BString* str);
void appendCString(struct BString* target, const char* cstr);
void concatBString(struct BString* target, const struct BString* str1, const struct BString* str2);
void bstrRight(struct BString* target, const struct BString* str, size_t count);
void bstrLeft(struct BString* target, const struct BString* str, size_t count);
void bstrMid(struct BString* target, const struct BString* str, size_t pos, size_t count);

void inputBString(struct BString* str);
void inputData(struct BString* message,const char *format, ...);
void readChar(struct BString* str);