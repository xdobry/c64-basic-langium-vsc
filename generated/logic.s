
	.file	"logic"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "-1 OR -1 "
	.byte 0
.LC1:
	.ascii "-1 AND 0 "
	.byte 0
.LC2:
	.ascii "-1 AND -1 "
	.byte 0
.LC3:
	.ascii "ERROR2"
	.byte 0
.LC4:
	.ascii "ERROR3"
	.byte 0
.LC5:
	.ascii "ERROR4"
	.byte 0
.LC6:
	.ascii "ERROR5"
	.byte 0
.LC7:
	.ascii "ERROR6"
	.byte 0
.LC8:
	.ascii "ERROR7"
	.byte 0
.LC9:
	.ascii "A%>B% OR A%>C% "
	.byte 0
.LC10:
	.ascii "A%<B% AND C%<A% "
	.byte 0
.LC11:
	.ascii "ERROR8"
	.byte 0
.LC12:
	.ascii "ERROR9"
	.byte 0
.LC13:
	.ascii "ERROR10"
	.byte 0
.LC14:
	.ascii "ERROR11"
	.byte 0
.LC15:
	.ascii "ERROR12"
	.byte 0
.LC16:
	.ascii "ERROR13"
	.byte 0
.LC17:
	.ascii "ERROR14"
	.byte 0
.LC18:
	.ascii "ERROR15"
	.byte 0
.LC19:
	.ascii "ERROR16"
	.byte 0
.LC20:
	.ascii "ERROR17"
	.byte 0
.LC21:
	.ascii "ERROR 18"
	.byte 0
.LC22:
	.ascii "ERROR19"
	.byte 0
.LC23:
	.ascii "ERROR20"
	.byte 0
.LC24:
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
	subq	$848, %rsp
	# init variable strtmp0$
	movq	$0, -664(%rbp)
	movq	$0, -656(%rbp)
	movq	$0, -648(%rbp)
	# init variable strtmp1$
	movq	$0, -688(%rbp)
	movq	$0, -680(%rbp)
	movq	$0, -672(%rbp)
	# init variable strtmp2$
	movq	$0, -712(%rbp)
	movq	$0, -704(%rbp)
	movq	$0, -696(%rbp)
	# init variable strtmp3$
	movq	$0, -736(%rbp)
	movq	$0, -728(%rbp)
	movq	$0, -720(%rbp)
	# init variable strtmp4$
	movq	$0, -760(%rbp)
	movq	$0, -752(%rbp)
	movq	$0, -744(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-808(%rbp)
	andl	$0xFFFF9FFF, -808(%rbp)
	orl	$0x2000, -808(%rbp)
	ldmxcsr	-808(%rbp)
	 # init bstring constants
	leaq	-48(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-72(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-168(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-192(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-272(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-296(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-320(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-344(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-368(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-392(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-416(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-440(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-472(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-496(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-520(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-544(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-568(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-592(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-616(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	leaq	-640(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	# A%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -8(%rbp)
	# B%=2
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -16(%rbp)
	# C%=3
	# int: 3 - %rsi
	movq	$3, %rsi
	movq	%rsi, -24(%rbp)
	# PRINT "-1 OR -1 ", -1 OR -1
	# str: "-1 OR -1 ",
	leaq	-48(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: -1 OR -1
	# int: -1 OR -1 - %rdx
	# int: -1 - %rdx
	# int: 1 - %rdx
	movq	$1, %rdx
	negq	%rdx
	# int: -1 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	negq	%rsi
	orq	%rsi, %rdx
	leaq	-760(%rbp), %rcx
	call	assignInt
	leaq	-760(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-760(%rbp), %rcx
	call	freeBString
	# PRINT "-1 AND 0 ", -1 AND 0
	# str: "-1 AND 0 ",
	leaq	-72(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: -1 AND 0
	# int: -1 AND 0 - %rdx
	# int: -1 - %rdx
	# int: 1 - %rdx
	movq	$1, %rdx
	negq	%rdx
	# int: 0 - %rsi
	movq	$0, %rsi
	andq	%rsi, %rdx
	leaq	-760(%rbp), %rcx
	call	assignInt
	leaq	-760(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-760(%rbp), %rcx
	call	freeBString
	# PRINT "-1 AND -1 ", -1 AND -1
	# str: "-1 AND -1 ",
	leaq	-96(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: -1 AND -1
	# int: -1 AND -1 - %rdx
	# int: -1 - %rdx
	# int: 1 - %rdx
	movq	$1, %rdx
	negq	%rdx
	# int: -1 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	negq	%rsi
	andq	%rsi, %rdx
	leaq	-760(%rbp), %rcx
	call	assignInt
	leaq	-760(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-760(%rbp), %rcx
	call	freeBString
	# IF B%<A% OR C%<A% THEN PRINT "ERROR2"
	# int: B%<A% OR C%<A% - %rsi
	# int: B%<A% - %rsi
	# int: B% - %rsi
	movq	-16(%rbp), %rsi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: C%<A% - %rdi
	# int: C% - %rdi
	movq	-24(%rbp), %rdi
	# int: A% - %r8
	movq	-8(%rbp), %r8
	cmpq	%r8, %rdi
	setl	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-120(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# IF C%<A% OR B%<A% THEN PRINT "ERROR3"
	# int: C%<A% OR B%<A% - %rsi
	# int: C%<A% - %rsi
	# int: C% - %rsi
	movq	-24(%rbp), %rsi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: B%<A% - %rdi
	# int: B% - %rdi
	movq	-16(%rbp), %rdi
	# int: A% - %r8
	movq	-8(%rbp), %r8
	cmpq	%r8, %rdi
	setl	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-144(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# IF B%<A% AND C%>A% THEN PRINT "ERROR4"
	# int: B%<A% AND C%>A% - %rsi
	# int: B%<A% - %rsi
	# int: B% - %rsi
	movq	-16(%rbp), %rsi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: C%>A% - %rdi
	# int: C% - %rdi
	movq	-24(%rbp), %rdi
	# int: A% - %r8
	movq	-8(%rbp), %r8
	cmpq	%r8, %rdi
	setg	%al
	movzbq	%al, %rdi
	negq	%rdi
	andq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR4"
	# str: "ERROR4"
	leaq	-168(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# IF C%>A% AND B%<A% THEN PRINT "ERROR5"
	# int: C%>A% AND B%<A% - %rsi
	# int: C%>A% - %rsi
	# int: C% - %rsi
	movq	-24(%rbp), %rsi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: B%<A% - %rdi
	# int: B% - %rdi
	movq	-16(%rbp), %rdi
	# int: A% - %r8
	movq	-8(%rbp), %r8
	cmpq	%r8, %rdi
	setl	%al
	movzbq	%al, %rdi
	negq	%rdi
	andq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR5"
	# str: "ERROR5"
	leaq	-192(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# D% = A%>B% OR A%>C%
	# int: A%>B% OR A%>C% - %rsi
	# int: A%>B% - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	# int: B% - %rdi
	movq	-16(%rbp), %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: A%>C% - %rdi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	# int: C% - %r8
	movq	-24(%rbp), %r8
	cmpq	%r8, %rdi
	setg	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	movq	%rsi, -200(%rbp)
	# IF D%<>0 THEN PRINT "ERROR6"
	# int: D%<>0 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR6"
	# str: "ERROR6"
	leaq	-224(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# D% = A%<B% AND A%<C%
	# int: A%<B% AND A%<C% - %rsi
	# int: A%<B% - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	# int: B% - %rdi
	movq	-16(%rbp), %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: A%<C% - %rdi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	# int: C% - %r8
	movq	-24(%rbp), %r8
	cmpq	%r8, %rdi
	setl	%al
	movzbq	%al, %rdi
	negq	%rdi
	andq	%rdi, %rsi
	movq	%rsi, -200(%rbp)
	# IF D%=0 THEN PRINT "ERROR7"
	# int: D%=0 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "ERROR7"
	# str: "ERROR7"
	leaq	-248(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot5:
	# PRINT "A%>B% OR A%>C% ", A%>B% OR A%>C%
	# str: "A%>B% OR A%>C% ",
	leaq	-272(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A%>B% OR A%>C%
	# int: A%>B% OR A%>C% - %rdx
	# int: A%>B% - %rdx
	# int: A% - %rdx
	movq	-8(%rbp), %rdx
	# int: B% - %rsi
	movq	-16(%rbp), %rsi
	cmpq	%rsi, %rdx
	setg	%al
	movzbq	%al, %rdx
	negq	%rdx
	# int: A%>C% - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	# int: C% - %rdi
	movq	-24(%rbp), %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	orq	%rsi, %rdx
	leaq	-760(%rbp), %rcx
	call	assignInt
	leaq	-760(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-760(%rbp), %rcx
	call	freeBString
	# PRINT "A%<B% AND C%<A% ", A%<B% AND C%<A%
	# str: "A%<B% AND C%<A% ",
	leaq	-296(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A%<B% AND C%<A%
	# int: A%<B% AND C%<A% - %rdx
	# int: A%<B% - %rdx
	# int: A% - %rdx
	movq	-8(%rbp), %rdx
	# int: B% - %rsi
	movq	-16(%rbp), %rsi
	cmpq	%rsi, %rdx
	setl	%al
	movzbq	%al, %rdx
	negq	%rdx
	# int: C%<A% - %rsi
	# int: C% - %rsi
	movq	-24(%rbp), %rsi
	# int: A% - %rdi
	movq	-8(%rbp), %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	negq	%rsi
	andq	%rsi, %rdx
	leaq	-760(%rbp), %rcx
	call	assignInt
	leaq	-760(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-760(%rbp), %rcx
	call	freeBString
	# IF 3 AND 1 <> 1 THEN PRINT "ERROR8"
	# int: 3 AND 1 <> 1 - %rsi
	# int: 3 - %rsi
	movq	$3, %rsi
	# int: 1 <> 1 - %rdi
	# int: 1 - %rdi
	movq	$1, %rdi
	# int: 1 - %r8
	movq	$1, %r8
	cmpq	%r8, %rdi
	setne	%al
	movzbq	%al, %rdi
	negq	%rdi
	andq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR8"
	# str: "ERROR8"
	leaq	-320(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot6:
	# D% = 1 OR 2 <> 3
	# int: 1 OR 2 <> 3 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	# int: 2 <> 3 - %rdi
	# int: 2 - %rdi
	movq	$2, %rdi
	# int: 3 - %r8
	movq	$3, %r8
	cmpq	%r8, %rdi
	setne	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	movq	%rsi, -200(%rbp)
	# IF D%=0 THEN PRINT "ERROR9"
	# int: D%=0 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot7
	# PRINT "ERROR9"
	# str: "ERROR9"
	leaq	-344(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot7:
	# IF NOT 0 <> -1 THEN PRINT "ERROR10"
	# int: NOT 0 <> -1 - %rsi
	# int: 0 <> -1 - %rsi
	# int: 0 - %rsi
	movq	$0, %rsi
	# int: -1 - %rdi
	# int: 1 - %rdi
	movq	$1, %rdi
	negq	%rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot8
	# PRINT "ERROR10"
	# str: "ERROR10"
	leaq	-368(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot8:
	# IF NOT -1 <> 0 THEN PRINT "ERROR11"
	# int: NOT -1 <> 0 - %rsi
	# int: -1 <> 0 - %rsi
	# int: -1 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	negq	%rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot9
	# PRINT "ERROR11"
	# str: "ERROR11"
	leaq	-392(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot9:
	# IF NOT 2 <> -3 THEN PRINT "ERROR12"
	# int: NOT 2 <> -3 - %rsi
	# int: 2 <> -3 - %rsi
	# int: 2 - %rsi
	movq	$2, %rsi
	# int: -3 - %rdi
	# int: 3 - %rdi
	movq	$3, %rdi
	negq	%rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot10
	# PRINT "ERROR12"
	# str: "ERROR12"
	leaq	-416(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot10:
	# A%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -8(%rbp)
	# IF A% THEN PRINT "ERROR13"
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	cmpq	$0, %rsi
	je	.ifnot11
	# PRINT "ERROR13"
	# str: "ERROR13"
	leaq	-440(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot11:
	# A=0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -800(%rbp)
	movsd	-800(%rbp), %xmm0
	movsd	%xmm0, -448(%rbp)
	# IF A THEN PRINT "ERROR14"
	# int: A - %rsi
	# float: A
	movsd	-448(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	je	.ifnot12
	# PRINT "ERROR14"
	# str: "ERROR14"
	leaq	-472(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot12:
	# A%=-1
	# int: -1 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	negq	%rsi
	movq	%rsi, -8(%rbp)
	# IF NOT A% THEN PRINT "ERROR15"
	# int: NOT A% - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot13
	# PRINT "ERROR15"
	# str: "ERROR15"
	leaq	-496(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot13:
	# A=-1
	# float: -1
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -800(%rbp)
	movsd	-800(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -792(%rbp)
	movsd	-792(%rbp), %xmm0
	movsd	%xmm0, -448(%rbp)
	# IF NOT A THEN PRINT "ERROR16"
	# int: NOT A - %rsi
	# int: A - %rsi
	# float: A
	movsd	-448(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot14
	# PRINT "ERROR16"
	# str: "ERROR16"
	leaq	-520(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot14:
	# A=3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -792(%rbp)
	movsd	-792(%rbp), %xmm0
	movsd	%xmm0, -448(%rbp)
	# D%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -200(%rbp)
	# IF NOT A THEN D%=1
	# int: NOT A - %rsi
	# int: A - %rsi
	# float: A
	movsd	-448(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot15
	# D%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -200(%rbp)
.ifnot15:
	# IF D%<>1 THEN PRINT "ERROR17"
	# int: D%<>1 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot16
	# PRINT "ERROR17"
	# str: "ERROR17"
	leaq	-544(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot16:
	# IF NOT A <> -2 THEN PRINT "ERROR 18"
	# int: NOT A <> -2 - %rsi
	# int: A <> -2 - %rsi
	# float: A
	# float: -2
	# float: 2
	# int: 2 - %rdi
	movq	$2, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -792(%rbp)
	movsd	-792(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -800(%rbp)
	movsd	-448(%rbp), %xmm0
	movsd	-800(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	notq	%rsi
	cmpq	$0, %rsi
	je	.ifnot17
	# PRINT "ERROR 18"
	# str: "ERROR 18"
	leaq	-568(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot17:
	# D%=NOT 2>3
	# int: NOT 2>3 - %rsi
	# int: 2>3 - %rsi
	# int: 2 - %rsi
	movq	$2, %rsi
	# int: 3 - %rdi
	movq	$3, %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	notq	%rsi
	movq	%rsi, -200(%rbp)
	# IF D%<>-1 THEN PRINT "ERROR19"
	# int: D%<>-1 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: -1 - %rdi
	# int: 1 - %rdi
	movq	$1, %rdi
	negq	%rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot18
	# PRINT "ERROR19"
	# str: "ERROR19"
	leaq	-592(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot18:
	# D%=(NOT 2)>3
	# int: (NOT 2)>3 - %rsi
	# int: (NOT 2) - %rsi
	# int: NOT 2 - %rsi
	# int: 2 - %rsi
	movq	$2, %rsi
	notq	%rsi
	# int: 3 - %rdi
	movq	$3, %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	movq	%rsi, -200(%rbp)
	# IF D%<>0 THEN PRINT "ERROR20"
	# int: D%<>0 - %rsi
	# int: D% - %rsi
	movq	-200(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot19
	# PRINT "ERROR20"
	# str: "ERROR20"
	leaq	-616(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot19:
	# PRINT "END"
	# str: "END"
	leaq	-640(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    