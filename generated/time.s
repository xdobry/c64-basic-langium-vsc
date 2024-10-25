
	.file	"time"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TIME "
	.byte 0
.LC2:
	.ascii "TIME INT "
	.byte 0
.LC3:
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
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-272(%rbp)
	andl	$0xFFFF9FFF, -272(%rbp)
	orl	$0x2000, -272(%rbp)
	ldmxcsr	-272(%rbp)
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
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# MTIME=TI
	# float: TI
	# int: TI - %rsi
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -264(%rbp)
	movsd	-264(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "TIME ";MTIME
	# str: "TIME ";
	leaq	-56(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: MTIME
	leaq	-224(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-224(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "TIME INT ",TI
	# str: "TIME INT ",
	leaq	-80(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: TI
	# int: TI - %rdx
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rdx
	leaq	-224(%rbp), %rcx
	call	assignInt
	leaq	-224(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "END"
	# str: "END"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    