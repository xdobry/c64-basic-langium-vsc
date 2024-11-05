
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "d"
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

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$336, %rsp
	# init variable strtmp0$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable strtmp1$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable strtmp2$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init variable strtmp3$
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	# init variable strtmp4$
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-288(%rbp)
	andl	$0xFFFF9FFF, -288(%rbp)
	orl	$0x2000, -288(%rbp)
	ldmxcsr	-288(%rbp)
	 # init bstring constants
	leaq	-72(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	# C = 3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
	# A = 3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# PRINT A
	# str: A
	leaq	-240(%rbp), %rcx
	movsd	-16(%rbp), %xmm1
	call	assignDouble
	leaq	-240(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# A = 4
	# float: 4
	# int: 4 - %rsi
	movq	$4, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# INPUT A
	xor	%rcx, %rcx
	leaq	.LC0(%rip), %rdx
	leaq	-16(%rbp), %r8
	call	inputData
	# PRINT A+2
	# str: A+2
	# float: A+2
	# float: A
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-16(%rbp), %xmm0
	movsd	-280(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm1
	leaq	-240(%rbp), %rcx
	call	assignDouble
	leaq	-240(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# GOTO loop
	jmp	.loop
	# B = A
	# float: A
	movsd	-16(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
	# GOTO loop
	jmp	.loop
	# DEF FN F(X)=X+1
	leaq	.defn_exprF_0(%rip), %rax
	movq	%rax, -32(%rbp)
	jmp	.defn_endF_0
.defn_exprF_0:
	subq	$40, %rsp
	# float: X+1
	# float: X
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-40(%rbp), %xmm0
	movsd	-280(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endF_0:
	# PRINT "PAUSE"
	# str: "PAUSE"
	leaq	-72(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DEF FN F(X)=X+2
	leaq	.defn_exprF_1(%rip), %rax
	movq	%rax, -32(%rbp)
	jmp	.defn_endF_1
.defn_exprF_1:
	subq	$40, %rsp
	# float: X+2
	# float: X
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-40(%rbp), %xmm0
	movsd	-280(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
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
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	movq	-32(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm1
	leaq	-240(%rbp), %rcx
	call	assignDouble
	leaq	-240(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# C = FN F(2)
	# float: FN F(2)
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	movq	-32(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -280(%rbp)
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
.loop:
	# PRINT "TEST"
	# str: "TEST"
	leaq	-96(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT C,B
	# str: C,
	leaq	-240(%rbp), %rcx
	movsd	-8(%rbp), %xmm1
	call	assignDouble
	leaq	-240(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: B
	leaq	-240(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-240(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "END"
	# str: "END"
	leaq	-120(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    