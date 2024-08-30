
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "HALLO WORLD"
	.byte 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$224, %rsp
	# init variable A$
	movq	$0, -24(%rbp)
	movq	$0, -16(%rbp)
	movq	$0, -8(%rbp)
	# init variable strtmp0$
	movq	$0, -48(%rbp)
	movq	$0, -40(%rbp)
	movq	$0, -32(%rbp)
	# init variable strtmp1$
	movq	$0, -80(%rbp)
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	# init variable strtmp2$
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	# init variable strtmp3$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable strtmp4$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# LET A$="HALLO WORLD"
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	# PRINT A$
	leaq	-48(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	movq	-48(%rbp), %rcx
	call	puts
	leaq	-48(%rbp), %rcx
	call	freeBString
	# PRINT RIGHT$(A$,4)
	leaq	-80(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	movq	$4, %r8
	leaq	-48(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	bstrRight
	leaq	-80(%rbp), %rcx
	call	freeBString
	movq	-48(%rbp), %rcx
	call	puts
	leaq	-48(%rbp), %rcx
	call	freeBString
	# PRINT LEFT$(A$,4)
	leaq	-80(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	movq	$4, %r8
	leaq	-48(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	bstrLeft
	leaq	-80(%rbp), %rcx
	call	freeBString
	movq	-48(%rbp), %rcx
	call	puts
	leaq	-48(%rbp), %rcx
	call	freeBString
	# PRINT MID$(A$,4)
	leaq	-80(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	movq	$4, %r8
	movq	$0, %r9
	leaq	-48(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	bstrMid
	leaq	-80(%rbp), %rcx
	call	freeBString
	movq	-48(%rbp), %rcx
	call	puts
	leaq	-48(%rbp), %rcx
	call	freeBString
	# PRINT MID$(A$,4,3)
	leaq	-80(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	movq	$4, %r8
	movq	$3, %r9
	leaq	-48(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	bstrMid
	leaq	-80(%rbp), %rcx
	call	freeBString
	movq	-48(%rbp), %rcx
	call	puts
	leaq	-48(%rbp), %rcx
	call	freeBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    