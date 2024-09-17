	.file	"math.c"
	.text
	.globl	sign
	.def	sign;	.scl	2;	.type	32;	.endef
	.seh_proc	sign
sign:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	.seh_endprologue
	movsd	%xmm0, 16(%rbp)
	pxor	%xmm0, %xmm0
	comisd	16(%rbp), %xmm0
	jbe	.L9
	movq	$-1, %rax
	jmp	.L4
.L9:
	movsd	16(%rbp), %xmm0
	pxor	%xmm1, %xmm1
	comisd	%xmm1, %xmm0
	jbe	.L10
	movl	$1, %eax
	jmp	.L4
.L10:
	movl	$0, %eax
.L4:
	popq	%rbp
	ret
	.seh_endproc
	.globl	signd
	.def	signd;	.scl	2;	.type	32;	.endef
	.seh_proc	signd
signd:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	.seh_endprologue
	movsd	%xmm0, 16(%rbp)
	pxor	%xmm0, %xmm0
	comisd	16(%rbp), %xmm0
	jbe	.L19
	movsd	.LC1(%rip), %xmm0
	jmp	.L14
.L19:
	movsd	16(%rbp), %xmm0
	pxor	%xmm1, %xmm1
	comisd	%xmm1, %xmm0
	jbe	.L20
	movsd	.LC2(%rip), %xmm0
	jmp	.L14
.L20:
	pxor	%xmm0, %xmm0
.L14:
	movq	%xmm0, %rax
	movq	%rax, %xmm0
	popq	%rbp
	ret
	.seh_endproc
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC3:
	.ascii "Hello Math\0"
.LC6:
	.ascii "sin=%f exp=%f\12\0"
.LC7:
	.ascii "power=%f\12\0"
.LC8:
	.ascii "floor=%f\12\0"
.LC9:
	.ascii "log=%f\12\0"
.LC10:
	.ascii "sqrt=%f\12\0"
.LC12:
	.ascii "abs=%f\12\0"
.LC15:
	.ascii "less than 30\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$144, %rsp
	.seh_stackalloc	144
	.seh_endprologue
	call	__main
	leaq	.LC3(%rip), %rcx
	call	puts
	movsd	.LC4(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	movsd	.LC5(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movq	-8(%rbp), %rax
	movq	%rax, %xmm0
	call	sin
	movq	%xmm0, %rax
	movq	%rax, -24(%rbp)
	movq	-16(%rbp), %rax
	movq	%rax, %xmm0
	call	exp
	movq	%xmm0, %rax
	movq	%rax, -32(%rbp)
	movsd	-24(%rbp), %xmm0
	cvttsd2siq	%xmm0, %rax
	movq	%rax, -40(%rbp)
	cvtsi2sdq	-40(%rbp), %xmm0
	movsd	-8(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -48(%rbp)
	movsd	-32(%rbp), %xmm2
	movsd	-32(%rbp), %xmm1
	movsd	-24(%rbp), %xmm3
	movsd	-24(%rbp), %xmm0
	movq	%xmm1, %r8
	movapd	%xmm3, %xmm1
	movq	%xmm0, %rdx
	leaq	.LC6(%rip), %rcx
	call	printf
	movq	-8(%rbp), %rax
	movq	%rax, %xmm0
	call	sign
	movq	%rax, -56(%rbp)
	movsd	-16(%rbp), %xmm0
	movq	-8(%rbp), %rax
	movapd	%xmm0, %xmm1
	movq	%rax, %xmm0
	call	pow
	movq	%xmm0, %rax
	movq	%rax, -64(%rbp)
	movsd	-64(%rbp), %xmm1
	movsd	-64(%rbp), %xmm0
	movq	%xmm0, %rdx
	leaq	.LC7(%rip), %rcx
	call	printf
	movq	-8(%rbp), %rax
	movq	%rax, %xmm0
	call	floor
	movq	%xmm0, %rax
	movq	%rax, -72(%rbp)
	movsd	-72(%rbp), %xmm1
	movsd	-72(%rbp), %xmm0
	movq	%xmm0, %rdx
	leaq	.LC8(%rip), %rcx
	call	printf
	movq	-8(%rbp), %rax
	movq	%rax, %xmm0
	call	log
	movq	%xmm0, %rax
	movq	%rax, -80(%rbp)
	movsd	-80(%rbp), %xmm1
	movsd	-80(%rbp), %xmm0
	movq	%xmm0, %rdx
	leaq	.LC9(%rip), %rcx
	call	printf
	movq	-8(%rbp), %rax
	movq	%rax, %xmm0
	call	sqrt
	movq	%xmm0, %rax
	movq	%rax, -88(%rbp)
	movsd	-88(%rbp), %xmm1
	movsd	-88(%rbp), %xmm0
	movq	%xmm0, %rdx
	leaq	.LC10(%rip), %rcx
	call	printf
	movsd	-8(%rbp), %xmm0
	movq	.LC11(%rip), %xmm1
	andpd	%xmm1, %xmm0
	movsd	%xmm0, -96(%rbp)
	movsd	-96(%rbp), %xmm1
	movsd	-96(%rbp), %xmm0
	movq	%xmm0, %rdx
	leaq	.LC12(%rip), %rcx
	call	printf
	movsd	.LC13(%rip), %xmm0
	movsd	%xmm0, -104(%rbp)
	movsd	.LC14(%rip), %xmm0
	comisd	-104(%rbp), %xmm0
	jb	.L22
	leaq	.LC15(%rip), %rcx
	call	puts
	movsd	-104(%rbp), %xmm1
	movsd	.LC2(%rip), %xmm0
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -104(%rbp)
.L22:
	movl	$0, %eax
	addq	$144, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.section .rdata,"dr"
	.align 8
.LC1:
	.long	0
	.long	-1074790400
	.align 8
.LC2:
	.long	0
	.long	1072693248
	.align 8
.LC4:
	.long	858993459
	.long	1076114227
	.align 8
.LC5:
	.long	-1717986918
	.long	1073846681
	.align 16
.LC11:
	.long	-1
	.long	2147483647
	.long	0
	.long	0
	.align 8
.LC13:
	.long	0
	.long	1077149696
	.align 8
.LC14:
	.long	0
	.long	1077805056
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	puts;	.scl	2;	.type	32;	.endef
	.def	sin;	.scl	2;	.type	32;	.endef
	.def	exp;	.scl	2;	.type	32;	.endef
	.def	printf;	.scl	2;	.type	32;	.endef
	.def	pow;	.scl	2;	.type	32;	.endef
	.def	floor;	.scl	2;	.type	32;	.endef
	.def	log;	.scl	2;	.type	32;	.endef
	.def	sqrt;	.scl	2;	.type	32;	.endef
