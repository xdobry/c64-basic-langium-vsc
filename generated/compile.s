
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "SE"
	.byte 0
.LC1:
	.ascii "s"
	.byte 0
.LC2:
	.ascii "s"
	.byte 0
.LC3:
	.ascii "s"
	.byte 0
.LC4:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
	.align 4
dataDefinition:
	.align 4
	.quad 1
	.double NaN
	.quad 0
	.ascii "W"
	.align 4
	.quad 6
	.double NaN
	.quad 0
	.ascii "AR TUR"
	.align 4
	.quad 2
	.double 23
	.quad 23
	.ascii "23"

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$288, %rsp
	# init variable A$
	movq	$0, -48(%rbp)
	movq	$0, -40(%rbp)
	movq	$0, -32(%rbp)
	# init variable strtmp0$
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	# init variable strtmp1$
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	# init variable strtmp2$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable strtmp3$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable strtmp4$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init data pointer
	lea	dataDefinition(%rip), %rax
	movq	%rax, -248(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-240(%rbp)
	andl	$0xFFFF9FFF, -240(%rbp)
	orl	$0x2000, -240(%rbp)
	ldmxcsr	-240(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-72(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	# PRINT "SE"
	# str: "SE"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# READ A$
	leaq	-248(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	leaq	-48(%rbp), %r8
	call	readData
	# PRINT A$
	# str: A$
	leaq	-48(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# READ A$
	leaq	-248(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	leaq	-48(%rbp), %r8
	call	readData
	# PRINT A$
	# str: A$
	leaq	-48(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# READ A$
	leaq	-248(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	leaq	-48(%rbp), %r8
	call	readData
	# PRINT A$
	# str: A$
	leaq	-48(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DATA W,"AR TUR",23
	# PRINT "END"
	# str: "END"
	leaq	-72(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    