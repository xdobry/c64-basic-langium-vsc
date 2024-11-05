
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
	.ascii "ERROR PI"
	.byte 0
.LC25:
	.ascii "ERROR SIN PI"
	.byte 0
.LC26:
	.ascii "ERROR 2^2"
	.byte 0
.LC27:
	.ascii "ERROR POW(2,0.5)"
	.byte 0
.LC28:
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
.LF4:
	.double 0.23
.LF5:
	.double 10.3
.LF6:
	.double 230
.LF7:
	.double 10.3
.pi_const:
	.double 3.14159265358979323846
.LF8:
	.double 3.14
.LF9:
	.double 3.15
.LF10:
	.double 1.000001
.LF11:
	.double 0.9999999
.LF12:
	.double 0.003
.LF13:
	.double 10.3
.LF14:
	.double 0.5
.LF15:
	.double 1.41422
.LF16:
	.double 0.5
.LF17:
	.double 1.41421

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$944, %rsp
	# init variable strtmp0$
	movq	$0, -752(%rbp)
	movq	$0, -744(%rbp)
	movq	$0, -736(%rbp)
	# init variable strtmp1$
	movq	$0, -776(%rbp)
	movq	$0, -768(%rbp)
	movq	$0, -760(%rbp)
	# init variable strtmp2$
	movq	$0, -800(%rbp)
	movq	$0, -792(%rbp)
	movq	$0, -784(%rbp)
	# init variable strtmp3$
	movq	$0, -824(%rbp)
	movq	$0, -816(%rbp)
	movq	$0, -808(%rbp)
	# init variable strtmp4$
	movq	$0, -848(%rbp)
	movq	$0, -840(%rbp)
	movq	$0, -832(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-896(%rbp)
	andl	$0xFFFF9FFF, -896(%rbp)
	orl	$0x2000, -896(%rbp)
	ldmxcsr	-896(%rbp)
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
	leaq	-656(%rbp), %rcx
	leaq	.LC25(%rip), %rdx
	call	assignFromConst
	leaq	-680(%rbp), %rcx
	leaq	.LC26(%rip), %rdx
	call	assignFromConst
	leaq	-704(%rbp), %rcx
	leaq	.LC27(%rip), %rdx
	call	assignFromConst
	leaq	-728(%rbp), %rcx
	leaq	.LC28(%rip), %rdx
	call	assignFromConst
	# PRINT "HALLO"
	# str: "HALLO"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A=10.3
	# float: 10.3
	movsd	.LF13(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "A=",A
	# str: "A=",
	leaq	-56(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A
	leaq	-848(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "DOUBLE"
	# str: "DOUBLE"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT 32.2
	# str: 32.2
	# float: 32.2
	movsd	.LF1(%rip), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "A+1.23=",A+1.23
	# str: "A+1.23=",
	leaq	-104(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A+1.23
	# float: A+1.23
	# float: A
	# float: 1.23
	movsd	-32(%rbp), %xmm0
	movsd	.LF2(%rip), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# B=A+3.0
	# float: A+3.0
	# float: A
	# float: 3.0
	movsd	-32(%rbp), %xmm1
	movsd	.LF3(%rip), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -888(%rbp)
	movsd	-888(%rbp), %xmm0
	movsd	%xmm0, -112(%rbp)
	# PRINT "B=A+3.0; B=",B
	# str: "B=A+3.0; B=",
	leaq	-136(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: B
	leaq	-848(%rbp), %rcx
	movsd	-112(%rbp), %xmm1
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# C=A+B
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm1
	movsd	-112(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -888(%rbp)
	movsd	-888(%rbp), %xmm0
	movsd	%xmm0, -144(%rbp)
	# PRINT "C=A+B=",C
	# str: "C=A+B=",
	leaq	-168(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: C
	leaq	-848(%rbp), %rcx
	movsd	-144(%rbp), %xmm1
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "A+B=",A+B
	# str: "A+B=",
	leaq	-192(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A+B
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "A*B=",A*B
	# str: "A*B=",
	leaq	-216(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A*B
	# float: A*B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "A-B=",A-B
	# str: "A-B=",
	leaq	-240(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A-B
	# float: A-B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	subsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "A/B=",A/B
	# str: "A/B=",
	leaq	-264(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A/B
	# float: A/B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "(A+B)/(A-B)=",(A+B)/(A-B)
	# str: "(A+B)/(A-B)=",
	leaq	-288(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: (A+B)/(A-B)
	# float: (A+B)/(A-B)
	# float: A+B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	# float: A-B
	# float: A
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-112(%rbp), %xmm1
	subsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-888(%rbp), %xmm0
	movsd	-880(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "ABS=",ABS(A)
	# str: "ABS=",
	leaq	-312(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: ABS(A)
	# float: ABS(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	fabs
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "TAN=",TAN(A)
	# str: "TAN=",
	leaq	-336(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: TAN(A)
	# float: TAN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	tan
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "EXP=",EXP(A)
	# str: "EXP=",
	leaq	-360(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: EXP(A)
	# float: EXP(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	exp
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "SQR=",SQR(A)
	# str: "SQR=",
	leaq	-384(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: SQR(A)
	# float: SQR(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	sqrt
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "LOG=",LOG(A)
	# str: "LOG=",
	leaq	-408(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: LOG(A)
	# float: LOG(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	log
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "COS=",COS(A)
	# str: "COS=",
	leaq	-432(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: COS(A)
	# float: COS(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	cos
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "SIN=",SIN(A)
	# str: "SIN=",
	leaq	-456(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: SIN(A)
	# float: SIN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	sin
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "SGN=",SGN(A)
	# str: "SGN=",
	leaq	-480(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: SGN(A)
	# float: SGN(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	signd
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "RND=",RND(A)
	# str: "RND=",
	leaq	-504(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: RND(A)
	# float: RND(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "RND=",RND(A)
	# str: "RND=",
	leaq	-528(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: RND(A)
	# float: RND(A)
	# float: A
	movsd	-32(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "TYPE CONVERSION"
	# str: "TYPE CONVERSION"
	leaq	-552(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
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
	movsd	%xmm0, -880(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-880(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT A+LEN("TEST")
	# str: A+LEN("TEST")
	# float: A+LEN("TEST")
	# float: A
	# float: LEN("TEST")
	# int: LEN("TEST") - %rsi
	# str: "TEST"
	movq	-576(%rbp), %rax
	movq	%rax, -896(%rbp)
	movq	-896(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-880(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT A+3
	# str: A+3
	# float: A+3
	# float: A
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-880(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm1
	leaq	-848(%rbp), %rcx
	call	assignDouble
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# A% = A
	# int: A - %rsi
	# float: A
	movsd	-32(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -560(%rbp)
	# PRINT "A%=A ",A%
	# str: "A%=A ",
	leaq	-608(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A%
	leaq	-848(%rbp), %rcx
	movq	-560(%rbp), %rdx
	call	assignInt
	leaq	-848(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# A=.23
	# float: .23
	movsd	.LF4(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# A=2.3E2
	# float: 2.3E2
	movsd	.LF6(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# IF π<3.14 OR π>3.15 THEN PRINT "ERROR PI"
	# int: π<3.14 OR π>3.15 - %rsi
	# int: π<3.14 - %rsi
	# float: π
	# float: 3.14
	movsd	.pi_const(%rip), %xmm0
	movsd	.LF8(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: π>3.15 - %rdi
	# float: π
	# float: 3.15
	movsd	.pi_const(%rip), %xmm0
	movsd	.LF9(%rip), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR PI"
	# str: "ERROR PI"
	leaq	-632(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# IF SIN(π/2)>1.000001 OR SIN(π/2)<0.9999999 THEN PRINT "ERROR SIN PI"
	# int: SIN(π/2)>1.000001 OR SIN(π/2)<0.9999999 - %rsi
	# int: SIN(π/2)>1.000001 - %rsi
	# float: SIN(π/2)
	# float: π/2
	# float: π
	# float: 2
	# int: 2 - %rdi
	movq	$2, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	.pi_const(%rip), %xmm0
	movsd	-880(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	call	sin
	movsd	%xmm0, -888(%rbp)
	# float: 1.000001
	movsd	-888(%rbp), %xmm0
	movsd	.LF10(%rip), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: SIN(π/2)<0.9999999 - %rdi
	# float: SIN(π/2)
	# float: π/2
	# float: π
	# float: 2
	# int: 2 - %r12
	movq	$2, %r12
	cvtsi2sdq	%r12, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	.pi_const(%rip), %xmm0
	movsd	-888(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -888(%rbp)
	movsd	-888(%rbp), %xmm0
	call	sin
	movsd	%xmm0, -880(%rbp)
	# float: 0.9999999
	movsd	-880(%rbp), %xmm0
	movsd	.LF11(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR SIN PI"
	# str: "ERROR SIN PI"
	leaq	-656(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# A=.3E-2
	# float: .3E-2
	movsd	.LF12(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# IF 2^2<>4 THEN PRINT "ERROR 2^2"
	# int: 2^2<>4 - %rsi
	# int: 2^2 - %rsi
	# int: 2 - %rsi
	movq	$2, %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	movq	%rsi, %rcx
	movq	%rdi, %rdx
	call	int_power
	movq	%rax, %rsi
	# int: 4 - %rdi
	movq	$4, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR 2^2"
	# str: "ERROR 2^2"
	leaq	-680(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# IF 2^0.5>1.41422 OR 2^0.5<1.41421 THEN PRINT "ERROR POW(2,0.5)"
	# int: 2^0.5>1.41422 OR 2^0.5<1.41421 - %rsi
	# int: 2^0.5>1.41422 - %rsi
	# float: 2^0.5
	# float: 2
	# int: 2 - %rdi
	movq	$2, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -880(%rbp)
	# float: 0.5
	movsd	-880(%rbp), %xmm0
	movsd	.LF14(%rip), %xmm1
	call	pow
	movsd	%xmm0, -888(%rbp)
	# float: 1.41422
	movsd	-888(%rbp), %xmm0
	movsd	.LF15(%rip), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: 2^0.5<1.41421 - %rdi
	# float: 2^0.5
	# float: 2
	# int: 2 - %r12
	movq	$2, %r12
	cvtsi2sdq	%r12, %xmm0
	movsd	%xmm0, -888(%rbp)
	# float: 0.5
	movsd	-888(%rbp), %xmm0
	movsd	.LF16(%rip), %xmm1
	call	pow
	movsd	%xmm0, -880(%rbp)
	# float: 1.41421
	movsd	-880(%rbp), %xmm0
	movsd	.LF17(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR POW(2,0.5)"
	# str: "ERROR POW(2,0.5)"
	leaq	-704(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# PRINT "END"
	# str: "END"
	leaq	-728(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    