
	.file	"fixes"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR"
	.byte 0
.LC2:
	.ascii "ERROR1"
	.byte 0
.LC3:
	.ascii "ERROR2"
	.byte 0
.LC4:
	.ascii "ERROR MATH"
	.byte 0
.LC5:
	.ascii "TEST"
	.byte 0
.LC6:
	.ascii "TEST"
	.byte 0
.LC7:
	.ascii "3"
	.byte 0
.LC8:
	.ascii " "
	.byte 0
.LC9:
	.ascii "ERROR"
	.byte 0
.LC10:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10
.LF1:
	.double 10
.LF2:
	.double 0.4
.LF3:
	.double 0.4
.LF4:
	.double 0.4

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$624, %rsp
	# init variable strtmp0$
	movq	$0, -440(%rbp)
	movq	$0, -432(%rbp)
	movq	$0, -424(%rbp)
	# init variable strtmp1$
	movq	$0, -464(%rbp)
	movq	$0, -456(%rbp)
	movq	$0, -448(%rbp)
	# init variable strtmp2$
	movq	$0, -488(%rbp)
	movq	$0, -480(%rbp)
	movq	$0, -472(%rbp)
	# init variable strtmp3$
	movq	$0, -512(%rbp)
	movq	$0, -504(%rbp)
	movq	$0, -496(%rbp)
	# init variable strtmp4$
	movq	$0, -536(%rbp)
	movq	$0, -528(%rbp)
	movq	$0, -520(%rbp)
	# init array A$[] 1
	lea	-96(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# init array B$[] 2
	lea	-304(%rbp), %rcx
	movq	$2, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-584(%rbp)
	andl	$0xFFFF9FFF, -584(%rbp)
	orl	$0x2000, -584(%rbp)
	ldmxcsr	-584(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-232(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-256(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-344(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-368(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-392(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-416(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A=RND(1)*5+1
	# float: RND(1)*5+1
	# float: RND(1)*5
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -568(%rbp)
	# float: 5
	# int: 5 - %rsi
	movq	$5, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-568(%rbp), %xmm1
	movsd	-576(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -576(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-576(%rbp), %xmm1
	movsd	-568(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT A
	# str: A
	leaq	-536(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-536(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# IF A=26 THEN PRINT "ERROR"
	# int: A=26 - %rsi
	# float: A
	# float: 26
	# int: 26 - %rdi
	movq	$26, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-568(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# A=RND(-3)
	# float: RND(-3)
	# float: -3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# FOR I=0 TO 10
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-64(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -64(%rbp)
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	pop	%rax
.for0:
	# A$(I) = STR$(I)
	# str: STR$(I)
	# float: I
	leaq	-536(%rbp), %rcx
	movsd	-64(%rbp), %xmm1
	call	assignDouble
	# int: I - %rsi
	# float: I
	movsd	-64(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-536(%rbp), %rdx
	call	assignBString
	# NEXT I
	call	.forNext0
	# PRINT A$(RND(1)*2)
	# str: A$(RND(1)*2)
	# int: RND(1)*2 - %rsi
	# float: RND(1)*2
	# float: RND(1)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -576(%rbp)
	# float: 2
	# int: 2 - %rdi
	movq	$2, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-576(%rbp), %xmm0
	movsd	-568(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-536(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBStringAsConst
	leaq	-536(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# D2=32
	# float: 32
	# int: 32 - %rsi
	movq	$32, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	%xmm0, -104(%rbp)
	# IF A<0 THEN N=D2:B=A
	# int: A<0 - %rsi
	# float: A
	# float: 0
	# int: 0 - %rdi
	movq	$0, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -568(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-568(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# N=D2
	# float: D2
	movsd	-104(%rbp), %xmm0
	movsd	%xmm0, -112(%rbp)
	# B=A
	# float: A
	movsd	-32(%rbp), %xmm0
	movsd	%xmm0, -120(%rbp)
.ifnot1:
	# PRINT N;B
	# str: N;
	leaq	-536(%rbp), %rcx
	movsd	-112(%rbp), %xmm1
	call	assignDouble
	leaq	-536(%rbp), %rcx
	movq	$4, %rdx
	call	printBString
	# str: B
	leaq	-536(%rbp), %rcx
	movsd	-120(%rbp), %xmm1
	call	assignDouble
	leaq	-536(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# LL=10.0
	# float: 10.0
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -128(%rbp)
	# Z%=INT(0.4*LL+1)
	# int: INT(0.4*LL+1) - %rsi
	# float: INT(0.4*LL+1)
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF4(%rip), %xmm0
	movsd	-128(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -568(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	call	trunc
	movsd	%xmm0, -568(%rbp)
	movsd	-568(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -136(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR1"
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-136(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR1"
	# str: "ERROR1"
	leaq	-160(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# Z%=0.4*LL+1
	# int: 0.4*LL+1 - %rsi
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF3(%rip), %xmm0
	movsd	-128(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -568(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-568(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -136(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR2";Z%
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-136(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR2";Z%
	# str: "ERROR2";
	leaq	-184(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: Z%
	leaq	-536(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-536(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
.ifnot3:
	# IF 20-4/2<>18 THEN PRINT "ERROR MATH"
	# int: 20-4/2<>18 - %rsi
	# int: 20-4/2 - %rsi
	# int: 20 - %rsi
	movq	$20, %rsi
	# int: 4/2 - %rdi
	# int: 4 - %rdi
	movq	$4, %rdi
	# int: 2 - %r12
	movq	$2, %r12
	movq	%rdi, %rax
	cqto
	idivq	%r12
	movq	%rax, %rdi
	subq	%rdi, %rsi
	# int: 18 - %rdi
	movq	$18, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR MATH"
	# str: "ERROR MATH"
	leaq	-208(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# PRINT TAB(20-4/2);"TEST"
	# str: TAB(20-4/2);
	# int: 20-4/2 - %rdx
	# int: 20 - %rdx
	movq	$20, %rdx
	# int: 4/2 - %rsi
	# int: 4 - %rsi
	movq	$4, %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	movq	%rsi, %rax
	pushq	%rdx
	cqto
	idivq	%rdi
	movq	%rax, %rsi
	popq	%rdx
	subq	%rsi, %rdx
	leaq	-536(%rbp), %rcx
	call	bstrTab
	leaq	-536(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: "TEST"
	leaq	-232(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# IF 2=3 THEN PRINT "TEST":
	# int: 2=3 - %rsi
	# int: 2 - %rsi
	movq	$2, %rsi
	# int: 3 - %rdi
	movq	$3, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "TEST"
	# str: "TEST"
	leaq	-256(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot5:
	# DIM B$(20,39)
	cmpq	$0, -304(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 20 - %rsi
	movq	$20, %rsi
	movq	%rsi, -288(%rbp)
	# int: 39 - %rsi
	movq	$39, %rsi
	movq	%rsi, -280(%rbp)
	# X=30
	# float: 30
	# int: 30 - %rsi
	movq	$30, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	movsd	%xmm0, -312(%rbp)
	# Y=2
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	movsd	%xmm0, -320(%rbp)
	# B$(Y,X+1)="3"
	# str: "3"
	# int: Y - %rsi
	# float: Y
	movsd	-320(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -272(%rbp)
	# int: X+1 - %rsi
	# float: X+1
	# float: X
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-312(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -264(%rbp)
	lea	-304(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-344(%rbp), %rdx
	call	assignBString
	# IF X=39 OR (X<39 AND B$(Y,X+1)=" ") THEN PRINT "ERROR"
	# int: X=39 OR (X<39 AND B$(Y,X+1)=" ") - %rsi
	# int: X=39 - %rsi
	# float: X
	# float: 39
	# int: 39 - %rdi
	movq	$39, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-312(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: (X<39 AND B$(Y,X+1)=" ") - %rdi
	# int: X<39 AND B$(Y,X+1)=" " - %rdi
	# int: X<39 - %rdi
	# float: X
	# float: 39
	# int: 39 - %r12
	movq	$39, %r12
	cvtsi2sdq	%r12, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-312(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rdi
	negq	%rdi
	# int: B$(Y,X+1)=" " - %r12
	# str: B$(Y,X+1)
	# int: Y - %r13
	# float: Y
	movsd	-320(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r13
	movq	%r13, -272(%rbp)
	# int: X+1 - %r13
	# float: X+1
	# float: X
	# float: 1
	# int: 1 - %r14
	movq	$1, %r14
	cvtsi2sdq	%r14, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-312(%rbp), %xmm0
	movsd	-576(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -576(%rbp)
	movsd	-576(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r13
	movq	%r13, -264(%rbp)
	lea	-304(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-536(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBStringAsConst
	# str: " "
	leaq	-536(%rbp), %rcx
	leaq	-368(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %r12
	andq	%r12, %rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-392(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot6:
	# PRINT "END"
	# str: "END"
	leaq	-416(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    