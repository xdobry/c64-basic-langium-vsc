
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

    .section .bss
.buffer:
    .zero 2048
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
	# int: A+B+C - %rsi
	# int: A+B - %rsi
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: B - %rdi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	addq	%rdi, %rsi
	# int: C - %rdi
	# float: C
	movsd	-24(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	addq	%rdi, %rsi
	# int: 6.0 - %rdi
	# float: 6.0
	movsd	.LF4(%rip), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	movq	-56(%rbp), %rcx
	call	puts
.ifnot0:
	# IF A=A1 THEN PRINT "ERROR2"
	# int: A=A1 - %rsi
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: A1 - %rdi
	# float: A1
	movsd	-32(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2"
	# str: "ERROR2"
	movq	-80(%rbp), %rcx
	call	puts
.ifnot1:
	# IF B<A THEN PRINT "ERROR3"
	# int: B<A - %rsi
	# int: B - %rsi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: A - %rdi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	movq	-104(%rbp), %rcx
	call	puts
.ifnot2:
	# IF B<=A THEN PRINT "ERROR4"
	# int: B<=A - %rsi
	# int: B - %rsi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: A - %rdi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	setle	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR4"
	# str: "ERROR4"
	movq	-128(%rbp), %rcx
	call	puts
.ifnot3:
	# IF A>B THEN PRINT "ERROR5"
	# int: A>B - %rsi
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: B - %rdi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR5"
	# str: "ERROR5"
	movq	-152(%rbp), %rcx
	call	puts
.ifnot4:
	# IF A>=B THEN PRINT "ERROR6"
	# int: A>=B - %rsi
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: B - %rdi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	cmpq	%rdi, %rsi
	setge	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "ERROR6"
	# str: "ERROR6"
	movq	-176(%rbp), %rcx
	call	puts
.ifnot5:
	# IF A+B+C>=A1+B+C THEN PRINT "ERROR7"
	# int: A+B+C>=A1+B+C - %rsi
	# int: A+B+C - %rsi
	# int: A+B - %rsi
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: B - %rdi
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	addq	%rdi, %rsi
	# int: C - %rdi
	# float: C
	movsd	-24(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	addq	%rdi, %rsi
	# int: A1+B+C - %rdi
	# int: A1+B - %rdi
	# int: A1 - %rdi
	# float: A1
	movsd	-32(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	# int: B - %r8
	# float: B
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r8
	addq	%r8, %rdi
	# int: C - %r8
	# float: C
	movsd	-24(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r8
	addq	%r8, %rdi
	cmpq	%rdi, %rsi
	setge	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR7"
	# str: "ERROR7"
	movq	-200(%rbp), %rcx
	call	puts
.ifnot6:
	# PRINT "END"
	# str: "END"
	movq	-224(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    