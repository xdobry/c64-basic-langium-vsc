
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
	subq	$224, %rsp
	# init variable strtmp0$
	movq	$0, -80(%rbp)
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	# init variable strtmp1$
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	# init variable strtmp2$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp3$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp4$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	 # init bstring constants
	leaq	-32(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	# L%=0
	movq	$0, %rax
	movq	%rax, -8(%rbp)
.line20:
	# PRINT "Hallo ",L%
	leaq	-80(%rbp), %rcx
	leaq	-32(%rbp), %rdx
	call	assignBString
	leaq	-104(%rbp), %rcx
	movq	-8(%rbp), %rdx
	call	assignInt
	leaq	-80(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	call	appendBString
	leaq	-104(%rbp), %rcx
	call	freeBString
	movq	-80(%rbp), %rcx
	call	puts
	leaq	-80(%rbp), %rcx
	call	freeBString
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
	movq	-56(%rbp), %rcx
	call	puts
	# PRINT L%
	leaq	-80(%rbp), %rcx
	movq	-8(%rbp), %rdx
	call	assignInt
	movq	-80(%rbp), %rcx
	call	puts
	leaq	-80(%rbp), %rcx
	call	freeBString
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
    