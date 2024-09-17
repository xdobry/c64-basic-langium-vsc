#include <stdio.h>
#include <stdlib.h>
#include <math.h> 

long long sign(double d) {
    if (d<0) return -1;
    if (d>0) return 1;
    return 0;
}

double signd(double d) {
    if (d<0) return -1.0;
    if (d>0) return 1.0;
    return 0.0;
}


int main() {
    printf("Hello Math\n");
    double d1=10.1,d2=2.2;
    double s = sin(d1);
    double e = exp(d2);
    // convert to long
    long long l = s;
    // convert long to double
    double s2 = l + d1;
    printf("sin=%f exp=%f\n",s,e);
    long long sgn = sign(d1);
    double power = pow(d1,d2);
    printf("power=%f\n",power);
    double f = floor(d1);
    printf("floor=%f\n",f);
    double lg = log(d1);
    printf("log=%f\n",lg);
    double sq= sqrt(d1);
    printf("sqrt=%f\n",sq);
    double a = fabs(d1);
    printf("abs=%f\n",a);
    double cc = 20.0;
    if (cc<=30.0) {
        printf("less than 30\n");
        cc = cc + 1.0;
    }
    return 0;
}