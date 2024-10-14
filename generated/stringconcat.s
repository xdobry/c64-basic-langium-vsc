
	.file	"stringconcat"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "Hallo "
	.byte 0
.LC1:
	.ascii "HALLO"
	.byte 0
.LC2:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$288, %rsp
	# init variable strtmp0$
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	# init variable strtmp1$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp2$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp3$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp4$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-248(%rbp)
	andl	$0xFFFF9FFF, -248(%rbp)
	orl	$0x2000, -248(%rbp)
	ldmxcsr	-248(%rbp)
	 # init bstring constants
	leaq	-32(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	# L%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -8(%rbp)
	# PRINT "Hallo ",L%
	# str: "Hallo ",
	leaq	-32(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: L%
	leaq	-200(%rbp), %rcx
	movq	-8(%rbp), %rdx
	call	assignInt
	leaq	-200(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	# PRINT "HALLO"
	# str: "HALLO"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT L%
	# str: L%
	leaq	-200(%rbp), %rcx
	movq	-8(%rbp), %rdx
	call	assignInt
	leaq	-200(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    