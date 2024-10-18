
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
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
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-248(%rbp)
	andl	$0xFFFF9FFF, -248(%rbp)
	orl	$0x2000, -248(%rbp)
	ldmxcsr	-248(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# X=10
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# B=5
	# float: 5
	# int: 5 - %rsi
	movq	$5, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	# FOR I=X TO X+B
	# float: X
	movsd	-32(%rbp), %xmm0
	movsd	%xmm0, -56(%rbp)
# stepoffset undefined tooffset -48
	# float: X+B
	# float: X
	# float: B
	movsd	-32(%rbp), %xmm0
	movsd	-40(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -240(%rbp)
	movsd	-240(%rbp), %xmm0
	movsd	%xmm0, -48(%rbp)
	jmp	.for0
.forNext0:
	movq	-56(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	-48(%rbp), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	movq	%xmm0, -56(%rbp)
	pop	%rax
.for0:
	# PRINT I
	# str: I
	leaq	-200(%rbp), %rcx
	movsd	-56(%rbp), %xmm1
	call	assignDouble
	leaq	-200(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	# NEXT I
	call	.forNext0
	# PRINT I
	# str: I
	leaq	-200(%rbp), %rcx
	movsd	-56(%rbp), %xmm1
	call	assignDouble
	leaq	-200(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    