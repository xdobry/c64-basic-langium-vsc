	.file	"strconcat.c"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hello, \0"
.LC1:
	.ascii "World!\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$64, %rsp
	.seh_stackalloc	64
	.seh_endprologue
	call	__main
	leaq	.LC0(%rip), %rax
	movq	%rax, -8(%rbp)
	leaq	.LC1(%rip), %rax
	movq	%rax, -16(%rbp)
	movq	-8(%rbp), %rax
	movq	%rax, %rcx
	call	strlen
	movl	%eax, -20(%rbp)
	movq	-16(%rbp), %rax
	movq	%rax, %rcx
	call	strlen
	movl	%eax, -24(%rbp)
	movl	-20(%rbp), %edx
	movl	-24(%rbp), %eax
	addl	%edx, %eax
	addl	$1, %eax
	cltq
	movq	%rax, %rcx
	call	malloc
	movq	%rax, -32(%rbp)
	movq	-8(%rbp), %rdx
	movq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	strcpy
	movl	-20(%rbp), %eax
	cltq
	movq	-32(%rbp), %rdx
	addq	%rdx, %rax
	movq	-16(%rbp), %rdx
	movq	%rax, %rcx
	call	strcpy
	movq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	movq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	free
	movl	$0, %eax
	addq	$64, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	strlen;	.scl	2;	.type	32;	.endef
	.def	malloc;	.scl	2;	.type	32;	.endef
	.def	strcpy;	.scl	2;	.type	32;	.endef
	.def	puts;	.scl	2;	.type	32;	.endef
	.def	free;	.scl	2;	.type	32;	.endef
