
	.file	"print_spc"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TEST"
	.byte 0
.LC2:
	.ascii "TEST"
	.byte 0
.LC3:
	.ascii "TEST"
	.byte 0
.LC4:
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
	subq	$352, %rsp
	# init variable strtmp0$
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	# init variable strtmp1$
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	# init variable strtmp2$
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	# init variable strtmp3$
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	# init variable strtmp4$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-304(%rbp)
	andl	$0xFFFF9FFF, -304(%rbp)
	orl	$0x2000, -304(%rbp)
	ldmxcsr	-304(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A=20
	# float: 20
	# int: 20 - %rsi
	movq	$20, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "TEST";SPC(5);A
	# str: "TEST";
	leaq	-56(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: SPC(5);
	# int: 5 - %rdx
	movq	$5, %rdx
	leaq	-256(%rbp), %rcx
	call	bstrSpc
	leaq	-256(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: A
	leaq	-256(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-256(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "TEST";TAB(10);A
	# str: "TEST";
	leaq	-80(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: TAB(10);
	# int: 10 - %rdx
	movq	$10, %rdx
	leaq	-256(%rbp), %rcx
	call	bstrTab
	leaq	-256(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: A
	leaq	-256(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-256(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "TEST";
	# str: "TEST";
	leaq	-104(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# A%=POS(0)
	# int: POS(0) - %rsi
	call	get_car_pos
	movq	%rax, %rsi
	movq	%rsi, -112(%rbp)
	# PRINT A%
	# str: A%
	leaq	-256(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	leaq	-256(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "END"
	# str: "END"
	leaq	-136(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    