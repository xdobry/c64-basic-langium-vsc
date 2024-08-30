
	.file	"string"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "TEST"
	.byte 0
.LC1:
	.ascii "A"
	.byte 0
.LC2:
	.ascii "="
	.byte 0
.LC3:
	.ascii "="
	.byte 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$96, %rsp
	# A$="TEST"
	leaq	.LC0(%rip), %rax
	movq	%rax, -8(%rbp)
	# PRINT A$
	movq	-8(%rbp), %rcx
	call	puts
	# PRINT LEN(A$)
	movq	-8(%rbp), %rbx
	movq	$0, %rcx
.len0:
	movb	(%rbx), %al
	incq	%rcx
	incq	%rbx
	cmpb	$0, %al
	jne	.len0
	decq	%rcx
	leaq	-64(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-64(%rbp), %rcx
	call	puts
	# PRINT ASC("A")
	leaq	.LC1(%rip), %rbx
	movzbl	(%rbx), %rcx
	leaq	-64(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-64(%rbp), %rcx
	call	puts
	# PRINT CHR$(65),CHR$(66)
	leaq	.buffer(%rip), %rcx
	movq	$65, %rdx
	leaq	-64(%rbp), %rbx
	movq	%rdx, %rax
	movb	%al, (%rbx)
	movb	$0, 1(%rbx)
.copy1:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy1
	decq	%rcx
	movq	$66, %rdx
	leaq	-64(%rbp), %rbx
	movq	%rdx, %rax
	movb	%al, (%rbx)
	movb	$0, 1(%rbx)
.copy2:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy2
	decq	%rcx
	leaq	.buffer(%rip), %rcx
	call	puts
	# Z%=70
	movq	$70, %rax
	movq	%rax, -16(%rbp)
	# PRINT Z%,"=",CHR$(Z%)
	leaq	.buffer(%rip), %rcx
	movq	-16(%rbp), %rbx
	pushq	%rcx
	movq	%rbx, %rcx
	leaq	-64(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-64(%rbp), %rbx
	popq	%rcx
.copy3:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy3
	decq	%rcx
	leaq	.LC2(%rip), %rbx
.copy4:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy4
	decq	%rcx
	movq	-16(%rbp), %rdx
	leaq	-64(%rbp), %rbx
	movq	%rdx, %rax
	movb	%al, (%rbx)
	movb	$0, 1(%rbx)
.copy5:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy5
	decq	%rcx
	leaq	.buffer(%rip), %rcx
	call	puts
	# FOR A%=65 TO 80
	movq	$65, %rax
	movq	%rax, -24(%rbp)
	jmp	.for0
.forNext0:
	movq	-24(%rbp), %rax
	addq	$1, %rax
	cmpq	$80, %rax
	jle	.forCont0
	ret
.forCont0:
	movq	%rax, -24(%rbp)
	pop	%rax
.for0:
	# PRINT A%,"=",CHR$(A%)
	leaq	.buffer(%rip), %rcx
	movq	-24(%rbp), %rbx
	pushq	%rcx
	movq	%rbx, %rcx
	leaq	-64(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-64(%rbp), %rbx
	popq	%rcx
.copy6:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy6
	decq	%rcx
	leaq	.LC3(%rip), %rbx
.copy7:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy7
	decq	%rcx
	movq	-24(%rbp), %rdx
	leaq	-64(%rbp), %rbx
	movq	%rdx, %rax
	movb	%al, (%rbx)
	movb	$0, 1(%rbx)
.copy8:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy8
	decq	%rcx
	leaq	.buffer(%rip), %rcx
	call	puts
	# NEXT A%
	call	.forNext0

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    