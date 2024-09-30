
	.file	"float"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "HALLO"
	.byte 0
.LC1:
	.ascii "A="
	.byte 0
.LC2:
	.ascii "DOUBLE"
	.byte 0
.LC3:
	.ascii "A+1.23="
	.byte 0
.LC4:
	.ascii "B=A+3.0; B="
	.byte 0
.LC5:
	.ascii "C=A+B="
	.byte 0
.LC6:
	.ascii "A+B="
	.byte 0
.LC7:
	.ascii "A*B="
	.byte 0
.LC8:
	.ascii "A-B="
	.byte 0
.LC9:
	.ascii "A/B="
	.byte 0
.LC10:
	.ascii "(A+B)/(A-B)="
	.byte 0
.LC11:
	.ascii "ABS="
	.byte 0
.LC12:
	.ascii "TAN="
	.byte 0
.LC13:
	.ascii "EXP="
	.byte 0
.LC14:
	.ascii "SQR="
	.byte 0
.LC15:
	.ascii "LOG="
	.byte 0
.LC16:
	.ascii "COS="
	.byte 0
.LC17:
	.ascii "SIN="
	.byte 0
.LC18:
	.ascii "SGN="
	.byte 0
.LC19:
	.ascii "RND="
	.byte 0
.LC20:
	.ascii "RND="
	.byte 0
.LC21:
	.ascii "TYPE CONVERSION"
	.byte 0
.LC22:
	.ascii "TEST"
	.byte 0
.LC23:
	.ascii "A%=A "
	.byte 0
.LC24:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10.3
.LF1:
	.double 32.2
.LF2:
	.double 1.23
.LF3:
	.double 3

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$848, %rsp
	# init variable strtmp0$
	movq	$0, -656(%rbp)
	movq	$0, -648(%rbp)
	movq	$0, -640(%rbp)
	# init variable strtmp1$
	movq	$0, -680(%rbp)
	movq	$0, -672(%rbp)
	movq	$0, -664(%rbp)
	# init variable strtmp2$
	movq	$0, -704(%rbp)
	movq	$0, -696(%rbp)
	movq	$0, -688(%rbp)
	# init variable strtmp3$
	movq	$0, -728(%rbp)
	movq	$0, -720(%rbp)
	movq	$0, -712(%rbp)
	# init variable strtmp4$
	movq	$0, -752(%rbp)
	movq	$0, -744(%rbp)
	movq	$0, -736(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-168(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-192(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-216(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-240(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-264(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-288(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-312(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-336(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-360(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-384(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-408(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-432(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-456(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-480(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-504(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-528(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-552(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-584(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-608(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	leaq	-632(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	# PRINT "HALLO"
	# str: "HALLO"
	movq	-24(%rbp), %rcx
	call	puts
	# A=10.3
	# float: 10.3
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "A=",A
	# str: "A=",
	leaq	-656(%rbp), %rcx
	leaq	-56(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-680(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "DOUBLE"
	# str: "DOUBLE"
	movq	-80(%rbp), %rcx
	call	puts
	# PRINT 32.2
	# str: 32.2
	# float: 32.2
	movsd	.LF1(%rip), %xmm1
	leaq	-656(%rbp), %rcx
	call	assignDouble
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "A+1.23=",A+1.23
	# str: "A+1.23=",
	leaq	-656(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	call	assignBString
	# str: A+1.23
	# float: A+1.23
	# float: A
	# float: 1.23
	movsd	-32(%rbp), %xmm0
	movsd	.LF2(%rip), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# B=A+3.0
	# float: A+3.0
	# float: A
	# float: 3.0
	movsd	-32(%rbp), %xmm1
	movsd	.LF3(%rip), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -760(%rbp)
	movsd	-760(%rbp), %xmm0
	movsd	%xmm0, -112(%rbp)
	# PRINT "B=A+3.0; B=",B
	# str: "B=A+3.0; B=",
	leaq	-656(%rbp), %rcx
	leaq	-136(%rbp), %rdx
	call	assignBString
	# str: B
	leaq	-680(%rbp), %rcx
	movsd	-112(%rbp), %xmm1
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# C=A+B
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm1
	movsd	-112(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -760(%rbp)
	movsd	-760(%rbp), %xmm0
	movsd	%xmm0, -144(%rbp)
	# PRINT "C=A+B=",C
	# str: "C=A+B=",
	leaq	-656(%rbp), %rcx
	leaq	-168(%rbp), %rdx
	call	assignBString
	# str: C
	leaq	-680(%rbp), %rcx
	movsd	-144(%rbp), %xmm1
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "A+B=",A+B
	# str: "A+B=",
	leaq	-656(%rbp), %rcx
	leaq	-192(%rbp), %rdx
	call	assignBString
	# str: A+B
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "A*B=",A*B
	# str: "A*B=",
	leaq	-656(%rbp), %rcx
	leaq	-216(%rbp), %rdx
	call	assignBString
	# str: A*B
	# float: A*B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "A-B=",A-B
	# str: "A-B=",
	leaq	-656(%rbp), %rcx
	leaq	-240(%rbp), %rdx
	call	assignBString
	# str: A-B
	# float: A-B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	subsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "A/B=",A/B
	# str: "A/B=",
	leaq	-656(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	call	assignBString
	# str: A/B
	# float: A/B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "(A+B)/(A-B)=",(A+B)/(A-B)
	# str: "(A+B)/(A-B)=",
	leaq	-656(%rbp), %rcx
	leaq	-288(%rbp), %rdx
	call	assignBString
	# str: (A+B)/(A-B)
	# float: (A+B)/(A-B)
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	# float: A-B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm2
	movsd	-112(%rbp), %xmm3
	subsd	%xmm3, %xmm2
	movsd	%xmm2, -768(%rbp)
	movsd	-760(%rbp), %xmm0
	movsd	-768(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "ABS=",ABS(A)
	# str: "ABS=",
	leaq	-656(%rbp), %rcx
	leaq	-312(%rbp), %rdx
	call	assignBString
	# str: ABS(A)
	# float: ABS(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	fabs
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "TAN=",TAN(A)
	# str: "TAN=",
	leaq	-656(%rbp), %rcx
	leaq	-336(%rbp), %rdx
	call	assignBString
	# str: TAN(A)
	# float: TAN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	tan
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "EXP=",EXP(A)
	# str: "EXP=",
	leaq	-656(%rbp), %rcx
	leaq	-360(%rbp), %rdx
	call	assignBString
	# str: EXP(A)
	# float: EXP(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	exp
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "SQR=",SQR(A)
	# str: "SQR=",
	leaq	-656(%rbp), %rcx
	leaq	-384(%rbp), %rdx
	call	assignBString
	# str: SQR(A)
	# float: SQR(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	sqrt
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "LOG=",LOG(A)
	# str: "LOG=",
	leaq	-656(%rbp), %rcx
	leaq	-408(%rbp), %rdx
	call	assignBString
	# str: LOG(A)
	# float: LOG(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	log
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "COS=",COS(A)
	# str: "COS=",
	leaq	-656(%rbp), %rcx
	leaq	-432(%rbp), %rdx
	call	assignBString
	# str: COS(A)
	# float: COS(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	cos
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "SIN=",SIN(A)
	# str: "SIN=",
	leaq	-656(%rbp), %rcx
	leaq	-456(%rbp), %rdx
	call	assignBString
	# str: SIN(A)
	# float: SIN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	sin
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "SGN=",SGN(A)
	# str: "SGN=",
	leaq	-656(%rbp), %rcx
	leaq	-480(%rbp), %rdx
	call	assignBString
	# str: SGN(A)
	# float: SGN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	signd
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "RND=",RND(A)
	# str: "RND=",
	leaq	-656(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	assignBString
	# str: RND(A)
	# float: RND(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "RND=",RND(A)
	# str: "RND=",
	leaq	-656(%rbp), %rcx
	leaq	-528(%rbp), %rdx
	call	assignBString
	# str: RND(A)
	# float: RND(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-680(%rbp), %rcx
	call	assignDouble
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "TYPE CONVERSION"
	# str: "TYPE CONVERSION"
	movq	-552(%rbp), %rcx
	call	puts
	# A% = 5
	# int: 5 - %rsi
	movq	$5, %rsi
	movq	%rsi, -560(%rbp)
	# PRINT A+A%
	# str: A+A%
	# float: A+A%
	# float: A
	# float: A%
	# int: A% - %rsi
	movq	-560(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-760(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-656(%rbp), %rcx
	call	assignDouble
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT A+LEN("TEST")
	# str: A+LEN("TEST")
	# float: A+LEN("TEST")
	# float: A
	# float: LEN("TEST")
	# int: LEN("TEST") - %rsi
	movq	-576(%rbp), %rax
	movq	%rax, -800(%rbp)
	movq	-800(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-760(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-656(%rbp), %rcx
	call	assignDouble
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT A+3
	# str: A+3
	# float: A+3
	# float: A
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-760(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -760(%rbp)
	movsd	-760(%rbp), %xmm1
	leaq	-656(%rbp), %rcx
	call	assignDouble
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# A% = A
	# int: A - %rsi
	# float: A
	movsd	-32(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -560(%rbp)
	# PRINT "A%=A ",A%
	# str: "A%=A ",
	leaq	-656(%rbp), %rcx
	leaq	-608(%rbp), %rdx
	call	assignBString
	# str: A%
	leaq	-680(%rbp), %rcx
	movq	-560(%rbp), %rdx
	call	assignInt
	leaq	-656(%rbp), %rcx
	leaq	-680(%rbp), %rdx
	call	appendBString
	leaq	-680(%rbp), %rcx
	call	freeBString
	movq	-656(%rbp), %rcx
	call	puts
	leaq	-656(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-632(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    