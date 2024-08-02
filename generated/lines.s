
	.file	"lines"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hallo "
	.byte 0
.LC1:
	.ascii "HALLO"
	.byte 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$80, %rsp
	# L%=0
	movq	$0, %rax
	movq	%rax, -8(%rbp)
.line20:
	# PRINT "Hallo ",L%
	leaq	.buffer(%rip), %rcx
	leaq	.LC0(%rip), %rbx
.copy0:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy0
	decq	%rcx
	movq	-8(%rbp), %rbx
	pushq	%rcx
	movq	%rbx, %rcx
	leaq	-48(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-48(%rbp), %rbx
	popq	%rcx
.copy1:
	movb	(%rbx), %al
	movb	%al, (%rcx)
	incq	%rbx
	incq	%rcx
	cmpb	$0, %al
	jne	.copy1
	decq	%rcx
	leaq	.buffer(%rip), %rcx
	call	puts
	# L%=L%+1
	movq	-8(%rbp), %rax
	movq	$1, %rbx
	addq	%rbx, %rax
	movq	%rax, -8(%rbp)
	# IF L%<5 THEN GOTO 20
	movq	-8(%rbp), %rbx
	movq	$5, %rcx
	cmpq	%rcx, %rbx
	setl	%al
	movzbq	%al, %rbx
	cmpq	$0, %rbx
	je	.ifnot0
	# GOTO 20
	jmp	.line20
.ifnot0:
	# L%=0
	movq	$0, %rax
	movq	%rax, -8(%rbp)
.line55:
	# PRINT "HALLO"
	leaq	.LC1(%rip), %rcx
	call	puts
	# PRINT L%
	movq	-8(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-48(%rbp), %rcx
	call	puts
	# L%=L%+1
	movq	-8(%rbp), %rax
	movq	$1, %rbx
	addq	%rbx, %rax
	movq	%rax, -8(%rbp)
	# IF L%<5 THEN 55
	movq	-8(%rbp), %rbx
	movq	$5, %rcx
	cmpq	%rcx, %rbx
	setl	%al
	movzbq	%al, %rbx
	cmpq	$0, %rbx
	je	.ifnot1
	jmp	.line55
.ifnot1:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    