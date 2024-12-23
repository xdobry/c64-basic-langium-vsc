
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "TEST"
	.byte 0
.LC1:
	.ascii "PAUSE"
	.byte 0
.LC2:
	.ascii "TEST"
	.byte 0
.LC3:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
# jump tables for goto and gosub
.jt0:
	.quad .loop
	.quad .loop2
.jt1:
	.quad .loop
	.quad .loop2

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$352, %rsp
	# init variable strtmp0$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable strtmp1$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init variable strtmp2$
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	# init variable strtmp3$
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	# init variable strtmp4$
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-312(%rbp)
	andl	$0xFFFF9FFF, -312(%rbp)
	orl	$0x2000, -312(%rbp)
	ldmxcsr	-312(%rbp)
	 # init bstring constants
	leaq	-40(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	# C = 3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
	# A = 3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# PRINT A,"TEST"
	# str: A,
	leaq	-264(%rbp), %rcx
	movsd	-16(%rbp), %xmm1
	call	assignDouble
	leaq	-264(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: "TEST"
	leaq	-40(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# LET A = 4
	# float: 4
	# int: 4 - %rsi
	movq	$4, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# PRINT A+2
	# str: A+2
	# float: A+2
	# float: A
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-16(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm1
	leaq	-264(%rbp), %rcx
	call	assignDouble
	leaq	-264(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# B = A
	# float: A
	movsd	-16(%rbp), %xmm0
	movsd	%xmm0, -48(%rbp)
	# DEF FN F(X)=X+1
	leaq	.defn_exprF_0(%rip), %rax
	movq	%rax, -56(%rbp)
	jmp	.defn_endF_0
.defn_exprF_0:
	subq	$40, %rsp
	# float: X+1
	# float: X
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-64(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endF_0:
	# PRINT "PAUSE"
	# str: "PAUSE"
	leaq	-96(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DEF FN F(X)=X+2
	leaq	.defn_exprF_1(%rip), %rax
	movq	%rax, -56(%rbp)
	jmp	.defn_endF_1
.defn_exprF_1:
	subq	$40, %rsp
	# float: X+2
	# float: X
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-64(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endF_1:
	# PRINT FN F(3)
	# str: FN F(3)
	# float: FN F(3)
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
	movq	-56(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm1
	leaq	-264(%rbp), %rcx
	call	assignDouble
	leaq	-264(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# C = FN F(2)
	# float: FN F(2)
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
	movq	-56(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
.loop:
	# PRINT "TEST"
	# str: "TEST"
	leaq	-120(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.loop2:
	# PRINT C,B+1,1+2+3
	# str: C,
	leaq	-264(%rbp), %rcx
	movsd	-8(%rbp), %xmm1
	call	assignDouble
	leaq	-264(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: B+1,
	# float: B+1,
	# float: B
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-48(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm1
	leaq	-264(%rbp), %rcx
	call	assignDouble
	leaq	-264(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: 1+2+3
	# int: 1+2+3 - %rdx
	# int: 1+2 - %rdx
	# int: 1 - %rdx
	movq	$1, %rdx
	# int: 2 - %rsi
	movq	$2, %rsi
	addq	%rsi, %rdx
	# int: 3 - %rsi
	movq	$3, %rsi
	addq	%rsi, %rdx
	leaq	-264(%rbp), %rcx
	call	assignInt
	leaq	-264(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "END"
	# str: "END"
	leaq	-144(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
	# GOTO loop
	jmp	.loop
	# GOSUB loop
	leaq	.gosubCont0(%rip), %rcx
	call	pushEntry
	jmp	.loop
.gosubCont0:
	# IF A>0 THEN loop
	# int: A>0 - %rsi
	# float: A
	# float: 0
	# int: 0 - %rdi
	movq	$0, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-16(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	jmp	.loop
	jmp	.loop
.ifnot0:
	# ON A GOTO loop,loop2
	# int: A - %rsi
	# float: A
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd1
	cmpq	$2, %rsi
	ja	.gotoEnd1
	decq	%rsi
	jmp	*.jt0(,%rsi,8)
.gotoEnd1:
	# ON A GOSUB loop,loop2
	leaq	.gotoEnd2(%rip), %rcx
	call	pushEntry
	# int: A - %rsi
	# float: A
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd2
	cmpq	$2, %rsi
	ja	.gotoEnd2
	decq	%rsi
	jmp	*.jt1(,%rsi,8)
.gotoEnd2:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    