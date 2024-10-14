
	.file	"fixes"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR"
	.byte 0
.LC2:
	.ascii "ERROR1"
	.byte 0
.LC3:
	.ascii "ERROR2"
	.byte 0
.LC4:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10
.LF1:
	.double 10
.LF2:
	.double 0.4
.LF3:
	.double 0.4

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$416, %rsp
	# init variable strtmp0$
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	# init variable strtmp1$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	# init variable strtmp2$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp3$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init variable strtmp4$
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	# init array A$[] 1
	lea	-96(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-376(%rbp)
	andl	$0xFFFF9FFF, -376(%rbp)
	orl	$0x2000, -376(%rbp)
	ldmxcsr	-376(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A=RND(1)*5+1
	# float: RND(1)*5+1
	# float: RND(1)*5
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -360(%rbp)
	# float: 5
	# int: 5 - %rsi
	movq	$5, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-360(%rbp), %xmm1
	movsd	-368(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -368(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-368(%rbp), %xmm1
	movsd	-360(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT A
	# str: A
	leaq	-328(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-328(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-328(%rbp), %rcx
	call	freeBString
	# IF A=26 THEN PRINT "ERROR"
	# int: A=26 - %rsi
	# float: A
	# float: 26
	# int: 26 - %rdi
	movq	$26, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-360(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# A=RND(-3)
	# float: RND(-3)
	# float: -3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# FOR I=0 TO 10
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-64(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	movq	%xmm0, -64(%rbp)
	pop	%rax
.for0:
	# A$(I) = STR$(I)
	# str: STR$(I)
	# float: I
	leaq	-328(%rbp), %rcx
	movsd	-64(%rbp), %xmm1
	call	assignDouble
	# int: I - %rsi
	# float: I
	movsd	-64(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-328(%rbp), %rdx
	call	assignBString
	leaq	-328(%rbp), %rcx
	call	freeBString
	# NEXT I
	call	.forNext0
	# PRINT A$(RND(1)*2)
	# str: A$(RND(1)*2)
	# int: RND(1)*2 - %rsi
	# float: RND(1)*2
	# float: RND(1)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -368(%rbp)
	# float: 2
	# int: 2 - %rdi
	movq	$2, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-368(%rbp), %xmm0
	movsd	-360(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-328(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	leaq	-328(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-328(%rbp), %rcx
	call	freeBString
	# D2=32
	# float: 32
	# int: 32 - %rsi
	movq	$32, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	%xmm0, -104(%rbp)
	# IF A<0 THEN N=D2:B=A
	# int: A<0 - %rsi
	# float: A
	# float: 0
	# int: 0 - %rdi
	movq	$0, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -360(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-360(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# N=D2
	# float: D2
	movsd	-104(%rbp), %xmm0
	movsd	%xmm0, -112(%rbp)
	# B=A
	# float: A
	movsd	-32(%rbp), %xmm0
	movsd	%xmm0, -120(%rbp)
.ifnot1:
	# LL=10.0
	# float: 10.0
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -128(%rbp)
	# Z%=INT(0.4*LL+1)
	# int: INT(0.4*LL+1) - %rsi
	# float: INT(0.4*LL+1)
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF2(%rip), %xmm0
	movsd	-128(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -360(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	-368(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	call	trunc
	movsd	%xmm0, -360(%rbp)
	movsd	-360(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -136(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR1"
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-136(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR1"
	# str: "ERROR1"
	leaq	-160(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# Z%=0.4*LL+1
	# int: 0.4*LL+1 - %rsi
	# float: 0.4*LL+1
	# float: 0.4*LL
	# float: 0.4
	# float: LL
	movsd	.LF3(%rip), %xmm0
	movsd	-128(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -360(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-360(%rbp), %xmm0
	movsd	-368(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -136(%rbp)
	# IF Z%<>5 THEN PRINT "ERROR2";Z%
	# int: Z%<>5 - %rsi
	# int: Z% - %rsi
	movq	-136(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR2";Z%
	# str: "ERROR2";
	leaq	-184(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: Z%
	leaq	-328(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-328(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-328(%rbp), %rcx
	call	freeBString
.ifnot3:
	# PRINT "END"
	# str: "END"
	leaq	-208(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    