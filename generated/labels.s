
	.file	"labels"
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
.LC3:
	.ascii "HALLO"
	.byte 0
.LC4:
	.ascii "WORLD"
	.byte 0
.LC5:
	.ascii "IF LOOP "
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
	# PRINT "HALLO"
	leaq	.LC3(%rip), %rcx
	call	puts
	# PRINT "WORLD"
	leaq	.LC4(%rip), %rcx
	call	puts
	# LET C%=0
	movq	$0, %rax
	movq	%rax, -24(%rbp)
.loop:
	# PRINT "IF LOOP ",C%
	leaq	.buffer(%rip), %rcx
	leaq	.LC5(%rip), %rbx
.copy7:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy7
	decq	%rcx
	movq	-24(%rbp), %rbx
	pushq	%rcx
	movq	%rbx, %rcx
	leaq	-80(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-80(%rbp), %rbx
	popq	%rcx
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
	# C%=C%+1
	movq	-24(%rbp), %rax
	movq	$1, %rbx
	addq	%rbx, %rax
	movq	%rax, -24(%rbp)
	# IF C%<5 THEN GOTO loop
	movq	-24(%rbp), %rbx
	movq	$5, %rcx
	cmpq	%rcx, %rbx
	setl	%al
	movzbq	%al, %rbx
	cmpq	$0, %rbx
	je	.ifnot0
	# GOTO loop
	jmp	.loop
.ifnot0:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    