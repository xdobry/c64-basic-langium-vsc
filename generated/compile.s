
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "ERROR1"
	.byte 0
.LC1:
	.ascii "ERROR2"
	.byte 0
.LC2:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10
.LF1:
	.double 0.4
.LF2:
	.double 0.4

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$304, %rsp
	# init variable strtmp0$
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	# init variable strtmp1$
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	# init variable strtmp2$
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	# init variable strtmp3$
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	# init variable strtmp4$
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-256(%rbp)
	andl	$0xFFFF9FFF, -256(%rbp)
	orl	$0x2000, -256(%rbp)
	ldmxcsr	-256(%rbp)
	 # init bstring constants
	leaq	-40(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-64(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-88(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	# LL=10.0
	# float: 10.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	# Z%=INT(0.4*LL+1)
	# int: INT(0.4*LL+1) - %rsi
	# float: INT(0.4*LL+1)
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF1(%rip), %xmm0
	movsd	-8(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -248(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-248(%rbp), %xmm0
	movsd	-240(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	call	trunc
	movsd	%xmm0, -248(%rbp)
	movsd	-248(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -16(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR1"
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-16(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	movq	-40(%rbp), %rcx
	call	puts
.ifnot0:
	# Z%=0.4*LL+1
	# int: 0.4*LL+1 - %rsi
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF2(%rip), %xmm0
	movsd	-8(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -248(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-248(%rbp), %xmm0
	movsd	-240(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -16(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR2";Z%
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-16(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2";Z%
	# str: "ERROR2";
	leaq	-208(%rbp), %rcx
	leaq	-64(%rbp), %rdx
	call	assignBString
	# str: Z%
	leaq	-184(%rbp), %rcx
	movq	-16(%rbp), %rdx
	call	assignInt
	leaq	-208(%rbp), %rcx
	leaq	-184(%rbp), %rdx
	call	appendBString
	leaq	-184(%rbp), %rcx
	call	freeBString
	movq	-208(%rbp), %rcx
	call	puts
	leaq	-208(%rbp), %rcx
	call	freeBString
.ifnot1:
	# PRINT "END"
	# str: "END"
	movq	-88(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    