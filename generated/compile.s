
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
.LF0:
	.double 2

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$272, %rsp
	# init variable strtmp0$
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	movq	$0, -72(%rbp)
	# init variable strtmp1$
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	# init variable strtmp2$
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	# init variable strtmp3$
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	# init variable strtmp4$
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-64(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# B=2.0
	# float: 2.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# A=-B
	# float: -B
	# float: B
	movsd	-32(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -192(%rbp)
	movsd	-192(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	# PRINT A
	# str: A
	leaq	-88(%rbp), %rcx
	movsd	-40(%rbp), %xmm1
	call	assignDouble
	movq	-88(%rbp), %rcx
	call	puts
	leaq	-88(%rbp), %rcx
	call	freeBString
	# PRINT -A
	# str: -A
	# float: -A
	# float: A
	movsd	-40(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -192(%rbp)
	movsd	-192(%rbp), %xmm1
	leaq	-88(%rbp), %rcx
	call	assignDouble
	movq	-88(%rbp), %rcx
	call	puts
	leaq	-88(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-64(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    