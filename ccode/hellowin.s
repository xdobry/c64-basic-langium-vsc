	.file	"hellowin.c"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hello, world!\12\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$80, %rsp
	.seh_stackalloc	80
	.seh_endprologue
	call	__main
	leaq	.LC0(%rip), %rax
	movq	%rax, -8(%rbp)
	movl	$-11, %ecx
	movq	__imp_GetStdHandle(%rip), %rax
	call	*%rax
	movq	%rax, -16(%rbp)
	leaq	-20(%rbp), %rcx
	movq	-8(%rbp), %rdx
	movq	-16(%rbp), %rax
	movq	$0, 32(%rsp)
	movq	%rcx, %r9
	movl	$14, %r8d
	movq	%rax, %rcx
	movq	__imp_WriteFile(%rip), %rax
	call	*%rax
	movl	$0, %eax
	addq	$80, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
