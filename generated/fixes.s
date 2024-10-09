
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
	subq	$288, %rsp
	# init variable strtmp0$
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	# init variable strtmp1$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp2$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp3$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp4$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
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
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# A=RND(1)*5+1
	# float: RND(1)*5+1
	# float: RND(1)*5
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -232(%rbp)
	# float: 5
	# int: 5 - %rsi
	movq	$5, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-232(%rbp), %xmm1
	movsd	-240(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -240(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -232(%rbp)
	movsd	-240(%rbp), %xmm1
	movsd	-232(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -232(%rbp)
	movsd	-232(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT A
	# str: A
	leaq	-200(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	movq	-200(%rbp), %rcx
	call	puts
	leaq	-200(%rbp), %rcx
	call	freeBString
	# IF A=26 THEN PRINT "ERROR"
	# int: A=26 - %rsi
	# float: A
	# float: 26
	# int: 26 - %rdi
	movq	$26, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -232(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-232(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	movq	-56(%rbp), %rcx
	call	puts
.ifnot0:
	# PRINT "END"
	# str: "END"
	movq	-80(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    