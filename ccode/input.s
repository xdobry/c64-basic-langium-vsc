	.file	"input.c"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hello\0"
.LC1:
	.ascii " \0"
.LC3:
	.ascii "right 2 %s\12\0"
.LC4:
	.ascii "left 2 %s\12\0"
.LC5:
	.ascii "mid 2,2 %s\12\0"
.LC6:
	.ascii "mid 2,0 %s\12\0"
.LC7:
	.ascii "press a key\0"
.LC8:
	.ascii "pressed %s\12\0"
.LC9:
	.ascii "Get 2 values seperated by ,\0"
.LC10:
	.ascii "ss\0"
.LC11:
	.ascii "b=%s c=%s\12\0"
.LC12:
	.ascii "Get int value\0"
.LC13:
	.ascii "i\0"
.LC14:
	.ascii "int %lld\12\0"
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$176, %rsp
	.seh_stackalloc	176
	.seh_endprologue
	call	__main
	leaq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	initBString
	leaq	-64(%rbp), %rax
	movq	%rax, %rcx
	call	initBString
	leaq	-96(%rbp), %rax
	movq	%rax, %rcx
	call	initBString
	leaq	-32(%rbp), %rax
	leaq	.LC0(%rip), %rdx
	movq	%rax, %rcx
	call	assignFromConst
	movq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-64(%rbp), %rax
	movq	%rax, %rcx
	call	inputBString
	movq	-64(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-32(%rbp), %rax
	leaq	.LC1(%rip), %rdx
	movq	%rax, %rcx
	call	appendCString
	leaq	-64(%rbp), %rdx
	leaq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	appendBString
	movq	-32(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-64(%rbp), %rcx
	leaq	-32(%rbp), %rdx
	leaq	-96(%rbp), %rax
	movq	%rcx, %r8
	movq	%rax, %rcx
	call	concatBString
	movq	-96(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-128(%rbp), %rax
	movq	%rax, %rcx
	call	initBString
	leaq	-128(%rbp), %rax
	movl	$1234, %edx
	movq	%rax, %rcx
	call	assignInt
	movq	-128(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	movsd	.LC2(%rip), %xmm0
	leaq	-128(%rbp), %rax
	movapd	%xmm0, %xmm1
	movq	%rax, %rcx
	call	assignDouble
	movq	-128(%rbp), %rax
	movq	%rax, %rcx
	call	puts
	leaq	-64(%rbp), %rdx
	leaq	-128(%rbp), %rax
	movl	$2, %r8d
	movq	%rax, %rcx
	call	bstrRight
	movq	-128(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC3(%rip), %rcx
	call	printf
	leaq	-64(%rbp), %rdx
	leaq	-128(%rbp), %rax
	movl	$2, %r8d
	movq	%rax, %rcx
	call	bstrLeft
	movq	-128(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC4(%rip), %rcx
	call	printf
	leaq	-64(%rbp), %rdx
	leaq	-128(%rbp), %rax
	movl	$2, %r9d
	movl	$2, %r8d
	movq	%rax, %rcx
	call	bstrMid
	movq	-128(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC5(%rip), %rcx
	call	printf
	leaq	-64(%rbp), %rdx
	leaq	-128(%rbp), %rax
	movl	$0, %r9d
	movl	$2, %r8d
	movq	%rax, %rcx
	call	bstrMid
	movq	-128(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC6(%rip), %rcx
	call	printf
	leaq	.LC7(%rip), %rcx
	call	puts
	leaq	-128(%rbp), %rax
	movq	%rax, %rcx
	call	readChar
	movq	-128(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC8(%rip), %rcx
	call	printf
	leaq	-32(%rbp), %rax
	leaq	.LC9(%rip), %rdx
	movq	%rax, %rcx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	-64(%rbp), %rdx
	leaq	-32(%rbp), %rax
	movq	%rcx, %r9
	movq	%rdx, %r8
	leaq	.LC10(%rip), %rdx
	movq	%rax, %rcx
	call	inputData
	movq	-96(%rbp), %rdx
	movq	-64(%rbp), %rax
	movq	%rdx, %r8
	movq	%rax, %rdx
	leaq	.LC11(%rip), %rcx
	call	printf
	leaq	-32(%rbp), %rax
	leaq	.LC12(%rip), %rdx
	movq	%rax, %rcx
	call	assignFromConst
	leaq	-136(%rbp), %rdx
	leaq	-32(%rbp), %rax
	movq	%rdx, %r8
	leaq	.LC13(%rip), %rdx
	movq	%rax, %rcx
	call	inputData
	movq	-136(%rbp), %rax
	movq	%rax, %rdx
	leaq	.LC14(%rip), %rcx
	call	printf
	movl	$0, %eax
	addq	$176, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.section .rdata,"dr"
	.align 8
.LC2:
	.long	2061584302
	.long	1076407828
	.ident	"GCC: (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0"
	.def	initBString;	.scl	2;	.type	32;	.endef
	.def	assignFromConst;	.scl	2;	.type	32;	.endef
	.def	puts;	.scl	2;	.type	32;	.endef
	.def	inputBString;	.scl	2;	.type	32;	.endef
	.def	appendCString;	.scl	2;	.type	32;	.endef
	.def	appendBString;	.scl	2;	.type	32;	.endef
	.def	concatBString;	.scl	2;	.type	32;	.endef
	.def	assignInt;	.scl	2;	.type	32;	.endef
	.def	assignDouble;	.scl	2;	.type	32;	.endef
	.def	bstrRight;	.scl	2;	.type	32;	.endef
	.def	printf;	.scl	2;	.type	32;	.endef
	.def	bstrLeft;	.scl	2;	.type	32;	.endef
	.def	bstrMid;	.scl	2;	.type	32;	.endef
	.def	readChar;	.scl	2;	.type	32;	.endef
	.def	inputData;	.scl	2;	.type	32;	.endef
