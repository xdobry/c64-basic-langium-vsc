	.file	"hello.c"
	.text
	.globl	test
	.def	test;	.scl	2;	.type	32;	.endef
	.seh_proc	test
test:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$64, %rsp
	.seh_stackalloc	64
	.seh_endprologue
	movl	%ecx, 16(%rbp)
	leaq	-32(%rbp), %rax
	movl	$10, %r8d
	movq	%rax, %rdx
	movl	16(%rbp), %ecx
	call	itoa
	leaq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	nop
	addq	$64, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.section .rdata,"dr"
.LC0:
	.ascii "Hallo test2\0"
	.text
	.globl	test2
	.def	test2;	.scl	2;	.type	32;	.endef
	.seh_proc	test2
test2:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$32, %rsp
	.seh_stackalloc	32
	.seh_endprologue
	leaq	.LC0(%rip), %rcx
	call	puts
	nop
	addq	$32, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC1:
	.ascii "Hello, World!\0"
.LC4:
	.ascii "r=%f s=%f p=%f\12\0"
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
	leaq	.LC1(%rip), %rcx
	call	puts
	call	test2
	movl	$12, %ecx
	call	test
	movl	$23, %ecx
	call	test
	movsd	.LC2(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	movsd	.LC3(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movsd	-8(%rbp), %xmm0
	divsd	-16(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
	movsd	-8(%rbp), %xmm0
	addsd	-16(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	movsd	-8(%rbp), %xmm0
	mulsd	-16(%rbp), %xmm0
	subsd	-32(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	movsd	-40(%rbp), %xmm3
	movsd	-40(%rbp), %xmm2
	movsd	-32(%rbp), %xmm5
	movsd	-32(%rbp), %xmm1
	movsd	-24(%rbp), %xmm4
	movsd	-24(%rbp), %xmm0
	movq	%xmm2, %r9
	movapd	%xmm5, %xmm2
	movq	%xmm1, %r8
	movapd	%xmm4, %xmm1
	movq	%xmm0, %rdx
	leaq	.LC4(%rip), %rcx
	call	printf
	movl	$0, %eax
	addq	$80, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.section .rdata,"dr"
	.align 8
.LC2:
	.double 12.0
	.align 8
.LC3:
	.double 5.0
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	itoa;	.scl	2;	.type	32;	.endef
	.def	puts;	.scl	2;	.type	32;	.endef
	.def	puts;	.scl	2;	.type	32;	.endef
	.def	printf;	.scl	2;	.type	32;	.endef
