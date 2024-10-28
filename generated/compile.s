
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TEST3"
	.byte 0
.LC2:
	.ascii "ENDE"
	.byte 0
	.align 8
.LONE:
	.double 1.0

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$320, %rsp
	# init variable strtmp0$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp1$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp2$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp3$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# init variable strtmp4$
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	# init array A$[] 1
	lea	-56(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-272(%rbp)
	andl	$0xFFFF9FFF, -272(%rbp)
	orl	$0x2000, -272(%rbp)
	ldmxcsr	-272(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A$(0)="TEST3"
	# str: "TEST3"
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-80(%rbp), %rdx
	call	assignBString
	# PRINT A$(0)
	# str: A$(0)
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-224(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBStringAsConst
	leaq	-224(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT "ENDE"
	# str: "ENDE"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    