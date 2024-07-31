	.file	"hello2.c"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hello, World!\12\0"
.LC1:
	.ascii "Hello, World2!\12\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$96, %rsp
	.seh_stackalloc	96
	.seh_endprologue
	call	__main
	leaq	.LC0(%rip), %rax
	movq	%rax, -8(%rbp)
	leaq	.LC1(%rip), %rax
	movq	%rax, -16(%rbp)
	movl	$20, -20(%rbp)
	leaq	-64(%rbp), %rax
	movl	-20(%rbp), %ecx
	movl	$10, %r8d
	movq	%rax, %rdx
	call	itoa
	movq	-8(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	movq	-16(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-64(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	movl	$0, %eax
	addq	$96, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	itoa;	.scl	2;	.type	32;	.endef
	.def	puts;	.scl	2;	.type	32;	.endef
