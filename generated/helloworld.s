
	.file	"helloworld"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "HALLO "
	.byte 0
.LC1:
	.ascii "WORLD "
	.byte 0
.LC2:
	.ascii "TEST"
	.byte 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$112, %rsp
	# LET A$="HALLO "
	leaq	.LC0(%rip), %rax
	movq	%rax, -8(%rbp)
	# LET B$="WORLD "
	leaq	.LC1(%rip), %rax
	movq	%rax, -16(%rbp)
	# LET C%=4711
	movq	$4711, %rax
	movq	%rax, -24(%rbp)
	# PRINT A$ B$ C%
	leaq	.buffer(%rip), %rcx
	movq	-8(%rbp), %rbx
.copy0:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy0
	decq	%rcx
	movq	-16(%rbp), %rbx
.copy1:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy1
	decq	%rcx
	movq	-24(%rbp), %rbx
	pushq	%rcx
	movq	%rbx, %rcx
	leaq	-80(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-80(%rbp), %rbx
	popq	%rcx
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
	# LET MSG$=A$+B$
	movq	$2048, %rax
	call	malloc
	movb	$0, (%rax)
	pushq	%rax
	movq	%rax, %rbx
	movq	-8(%rbp), %rcx
.copy3:
	movb	(%rcx), %al
	movb	%al, (%rbx)
	incq	%rcx
	incq	%rbx
	cmpb	$0, %al
	jne	.copy3
	decq	%rbx
	movq	-16(%rbp), %rcx
.copy4:
	movb	(%rcx), %al
	movb	%al, (%rbx)
	incq	%rcx
	incq	%rbx
	cmpb	$0, %al
	jne	.copy4
	decq	%rbx
	popq	%rax
	movq	%rax, -32(%rbp)
	# PRINT MSG$
	movq	-32(%rbp), %rcx
	call	puts
	# LET MSG2$=A$+"TEST"
	movq	$2048, %rax
	call	malloc
	movb	$0, (%rax)
	pushq	%rax
	movq	%rax, %rbx
	movq	-8(%rbp), %rcx
.copy5:
	movb	(%rcx), %al
	movb	%al, (%rbx)
	incq	%rcx
	incq	%rbx
	cmpb	$0, %al
	jne	.copy5
	decq	%rbx
	leaq	.LC2(%rip), %rcx
.copy6:
	movb	(%rcx), %al
	movb	%al, (%rbx)
	incq	%rcx
	incq	%rbx
	cmpb	$0, %al
	jne	.copy6
	decq	%rbx
	popq	%rax
	movq	%rax, -40(%rbp)
	# PRINT MSG2$
	movq	-40(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    