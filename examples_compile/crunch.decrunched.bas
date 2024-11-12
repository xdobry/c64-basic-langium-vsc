c=3
a=3
print a, "test"
a=4
input a
print a+2
goto 15
b=a
goto 15
def fn f(x)=x+1
print "pause"
def fn f(x)=x+2
print fn f(3)
c=fn f(2)

15 print "test"

16 print c, b+1, 1+2+3
print "END": end
gosub 15
if a>0 then goto 15
on a goto 15, 16
on a gosub 15, 16
for a=2 to 20: print a: next
if a then print "true"
