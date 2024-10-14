
	.file	"floatcmp"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "ERROR1"
	.byte 0
.LC1:
	.ascii "ERROR2"
	.byte 0
.LC2:
	.ascii "ERROR3"
	.byte 0
.LC3:
	.ascii "ERROR4"
	.byte 0
.LC4:
	.ascii "ERROR5"
	.byte 0
.LC5:
	.ascii "ERROR6"
	.byte 0
.LC6:
	.ascii "ERROR7"
	.byte 0
.LC7:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 1
.LF1:
	.double 2
.LF2:
	.double 3
.LF3:
	.double 1.1
.LF4:
	.double 6

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$432, %rsp
	# init variable strtmp0$
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	# init variable strtmp1$
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	# init variable strtmp2$
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init variable strtmp3$
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	movq	$0, -304(%rbp)
	# init variable strtmp4$
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	movq	$0, -328(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-392(%rbp)
	andl	$0xFFFF9FFF, -392(%rbp)
	orl	$0x2000, -392(%rbp)
	ldmxcsr	-392(%rbp)
	 # init bstring constants
	leaq	-56(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-152(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	# A=1.0
	# float: 1.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	# B=2.0
	# float: 2.0
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	# C=3.0
	# float: 3.0
	movsd	.LF2(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
	# A1=1.1
	# float: 1.1
	movsd	.LF3(%rip), %xmm0
	movsd	%xmm0, -32(%rbp)
	# IF A+B+C<>6.0 THEN PRINT "ERROR1"
	# int: A+B+C<>6.0 - %rsi
	# float: A+B+C
	# float: A+B
	# float: A
	# float: B
	movsd	-8(%rbp), %xmm0
	movsd	-16(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -384(%rbp)
	# float: C
	movsd	-384(%rbp), %xmm0
	movsd	-24(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -384(%rbp)
	# float: 6.0
	movsd	-384(%rbp), %xmm0
	movsd	.LF4(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# IF A=A1 THEN PRINT "ERROR2"
	# int: A=A1 - %rsi
	# float: A
	# float: A1
	movsd	-8(%rbp), %xmm0
	movsd	-32(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# IF B<A THEN PRINT "ERROR3"
	# int: B<A - %rsi
	# float: B
	# float: A
	movsd	-16(%rbp), %xmm0
	movsd	-8(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# IF B<=A THEN PRINT "ERROR4"
	# int: B<=A - %rsi
	# float: B
	# float: A
	movsd	-16(%rbp), %xmm0
	movsd	-8(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setbe	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR4"
	# str: "ERROR4"
	leaq	-128(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# IF A>B THEN PRINT "ERROR5"
	# int: A>B - %rsi
	# float: A
	# float: B
	movsd	-8(%rbp), %xmm0
	movsd	-16(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR5"
	# str: "ERROR5"
	leaq	-152(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# IF A>=B THEN PRINT "ERROR6"
	# int: A>=B - %rsi
	# float: A
	# float: B
	movsd	-8(%rbp), %xmm0
	movsd	-16(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setae	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "ERROR6"
	# str: "ERROR6"
	leaq	-176(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot5:
	# IF A+B+C>=A1+B+C THEN PRINT "ERROR7"
	# int: A+B+C>=A1+B+C - %rsi
	# float: A+B+C
	# float: A+B
	# float: A
	# float: B
	movsd	-8(%rbp), %xmm0
	movsd	-16(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -384(%rbp)
	# float: C
	movsd	-384(%rbp), %xmm0
	movsd	-24(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -384(%rbp)
	# float: A1+B+C
	# float: A1+B
	# float: A1
	# float: B
	movsd	-32(%rbp), %xmm2
	movsd	-16(%rbp), %xmm3
	addsd	%xmm3, %xmm2
	movsd	%xmm2, -376(%rbp)
	# float: C
	movsd	-376(%rbp), %xmm2
	movsd	-24(%rbp), %xmm3
	addsd	%xmm3, %xmm2
	movsd	%xmm2, -376(%rbp)
	movsd	-384(%rbp), %xmm0
	movsd	-376(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setae	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR7"
	# str: "ERROR7"
	leaq	-200(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot6:
	# PRINT "END"
	# str: "END"
	leaq	-224(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    