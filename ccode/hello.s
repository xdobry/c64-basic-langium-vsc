	.file	"hello.c"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hello, World2!\0"
	.text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$32, %rsp
	call	__main
	leaq	.LC0(%rip), %rcx
	addq    $1, %rcx
	call	puts
	movl	$0, %eax
	addq	$32, %rsp
	popq	%rbp
	ret
