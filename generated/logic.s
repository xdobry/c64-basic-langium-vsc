
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
	.ascii "w"
	.byte 0
.LC25:
	.ascii "w"
	.byte 0
.LC26:
	.ascii "a"
	.byte 0
.LC27:
	.ascii "s"
	.byte 0
.LC28:
	.ascii "ERROR L1"
	.byte 0
.LC29:
	.ascii "a"
	.byte 0
.LC30:
	.ascii "w"
	.byte 0
.LC31:
	.ascii "s"
	.byte 0
.LC32:
	.ascii "ERROR L2"
	.byte 0
.LC33:
	.ascii "a"
	.byte 0
.LC34:
	.ascii "s"
	.byte 0
.LC35:
	.ascii "w"
	.byte 0
.LC36:
	.ascii "ERROR L2"
	.byte 0
.LC37:
	.ascii "a"
	.byte 0
.LC38:
	.ascii "w"
	.byte 0
.LC39:
	.ascii "a"
	.byte 0
.LC40:
	.ascii "ERROR L2"
	.byte 0
.LC41:
	.ascii "d"
	.byte 0
.LC42:
	.ascii "a"
	.byte 0
.LC43:
	.ascii "w"
	.byte 0
.LC44:
	.ascii "ERROR L2"
	.byte 0
.LC45:
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
	subq	$1408, %rsp
	# init variable A$
	movq	$0, -640(%rbp)
	movq	$0, -632(%rbp)
	movq	$0, -624(%rbp)
	# init variable B$
	movq	$0, -984(%rbp)
	movq	$0, -976(%rbp)
	movq	$0, -968(%rbp)
	# init variable strtmp0$
	movq	$0, -1224(%rbp)
	movq	$0, -1216(%rbp)
	movq	$0, -1208(%rbp)
	# init variable strtmp1$
	movq	$0, -1248(%rbp)
	movq	$0, -1240(%rbp)
	movq	$0, -1232(%rbp)
	# init variable strtmp2$
	movq	$0, -1272(%rbp)
	movq	$0, -1264(%rbp)
	movq	$0, -1256(%rbp)
	# init variable strtmp3$
	movq	$0, -1296(%rbp)
	movq	$0, -1288(%rbp)
	movq	$0, -1280(%rbp)
	# init variable strtmp4$
	movq	$0, -1320(%rbp)
	movq	$0, -1312(%rbp)
	movq	$0, -1304(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-1368(%rbp)
	andl	$0xFFFF9FFF, -1368(%rbp)
	orl	$0x2000, -1368(%rbp)
	ldmxcsr	-1368(%rbp)
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
	leaq	-664(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	leaq	-696(%rbp), %rcx
	leaq	.LC25(%rip), %rdx
	call	assignFromConst
	leaq	-720(%rbp), %rcx
	leaq	.LC26(%rip), %rdx
	call	assignFromConst
	leaq	-744(%rbp), %rcx
	leaq	.LC27(%rip), %rdx
	call	assignFromConst
	leaq	-768(%rbp), %rcx
	leaq	.LC28(%rip), %rdx
	call	assignFromConst
	leaq	-792(%rbp), %rcx
	leaq	.LC29(%rip), %rdx
	call	assignFromConst
	leaq	-816(%rbp), %rcx
	leaq	.LC30(%rip), %rdx
	call	assignFromConst
	leaq	-840(%rbp), %rcx
	leaq	.LC31(%rip), %rdx
	call	assignFromConst
	leaq	-864(%rbp), %rcx
	leaq	.LC32(%rip), %rdx
	call	assignFromConst
	leaq	-888(%rbp), %rcx
	leaq	.LC33(%rip), %rdx
	call	assignFromConst
	leaq	-912(%rbp), %rcx
	leaq	.LC34(%rip), %rdx
	call	assignFromConst
	leaq	-936(%rbp), %rcx
	leaq	.LC35(%rip), %rdx
	call	assignFromConst
	leaq	-960(%rbp), %rcx
	leaq	.LC36(%rip), %rdx
	call	assignFromConst
	leaq	-1008(%rbp), %rcx
	leaq	.LC37(%rip), %rdx
	call	assignFromConst
	leaq	-1032(%rbp), %rcx
	leaq	.LC38(%rip), %rdx
	call	assignFromConst
	leaq	-1056(%rbp), %rcx
	leaq	.LC39(%rip), %rdx
	call	assignFromConst
	leaq	-1080(%rbp), %rcx
	leaq	.LC40(%rip), %rdx
	call	assignFromConst
	leaq	-1104(%rbp), %rcx
	leaq	.LC41(%rip), %rdx
	call	assignFromConst
	leaq	-1128(%rbp), %rcx
	leaq	.LC42(%rip), %rdx
	call	assignFromConst
	leaq	-1152(%rbp), %rcx
	leaq	.LC43(%rip), %rdx
	call	assignFromConst
	leaq	-1176(%rbp), %rcx
	leaq	.LC44(%rip), %rdx
	call	assignFromConst
	leaq	-1200(%rbp), %rcx
	leaq	.LC45(%rip), %rdx
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
	leaq	-1320(%rbp), %rcx
	call	assignInt
	leaq	-1320(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1320(%rbp), %rcx
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
	leaq	-1320(%rbp), %rcx
	call	assignInt
	leaq	-1320(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1320(%rbp), %rcx
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
	leaq	-1320(%rbp), %rcx
	call	assignInt
	leaq	-1320(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1320(%rbp), %rcx
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
	# int: A% - %r12
	movq	-8(%rbp), %r12
	cmpq	%r12, %rdi
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
	# int: A% - %r12
	movq	-8(%rbp), %r12
	cmpq	%r12, %rdi
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
	# int: A% - %r12
	movq	-8(%rbp), %r12
	cmpq	%r12, %rdi
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
	# int: A% - %r12
	movq	-8(%rbp), %r12
	cmpq	%r12, %rdi
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
	# int: C% - %r12
	movq	-24(%rbp), %r12
	cmpq	%r12, %rdi
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
	# int: C% - %r12
	movq	-24(%rbp), %r12
	cmpq	%r12, %rdi
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
	leaq	-1320(%rbp), %rcx
	call	assignInt
	leaq	-1320(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1320(%rbp), %rcx
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
	leaq	-1320(%rbp), %rcx
	call	assignInt
	leaq	-1320(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1320(%rbp), %rcx
	call	freeBString
	# IF 3 AND 1 <> 1 THEN PRINT "ERROR8"
	# int: 3 AND 1 <> 1 - %rsi
	# int: 3 - %rsi
	movq	$3, %rsi
	# int: 1 <> 1 - %rdi
	# int: 1 - %rdi
	movq	$1, %rdi
	# int: 1 - %r12
	movq	$1, %r12
	cmpq	%r12, %rdi
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
	# int: 3 - %r12
	movq	$3, %r12
	cmpq	%r12, %rdi
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
	movsd	%xmm0, -1360(%rbp)
	movsd	-1360(%rbp), %xmm0
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
	movsd	%xmm0, -1360(%rbp)
	movsd	-1360(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -1352(%rbp)
	movsd	-1352(%rbp), %xmm0
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
	movsd	%xmm0, -1352(%rbp)
	movsd	-1352(%rbp), %xmm0
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
	movsd	%xmm0, -1352(%rbp)
	movsd	-1352(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -1360(%rbp)
	movsd	-448(%rbp), %xmm0
	movsd	-1360(%rbp), %xmm1
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
	# A$="w"
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-664(%rbp), %rdx
	call	assignBString
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# IF A$="w" OR A$="a" OR A$="s" THEN R%=1
	# int: A$="w" OR A$="a" OR A$="s" - %rsi
	# int: A$="w" OR A$="a" - %rsi
	# int: A$="w" - %rsi
	# str: A$
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-696(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: A$="a" - %rdi
	# str: A$
	# str: "a"
	leaq	-640(%rbp), %rcx
	leaq	-720(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	# int: A$="s" - %rdi
	# str: A$
	# str: "s"
	leaq	-640(%rbp), %rcx
	leaq	-744(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot20
	# R%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -672(%rbp)
.ifnot20:
	# IF R%=0 THEN PRINT "ERROR L1"
	# int: R%=0 - %rsi
	# int: R% - %rsi
	movq	-672(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot21
	# PRINT "ERROR L1"
	# str: "ERROR L1"
	leaq	-768(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot21:
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# IF A$="a" OR A$="w" OR A$="s" THEN R%=1
	# int: A$="a" OR A$="w" OR A$="s" - %rsi
	# int: A$="a" OR A$="w" - %rsi
	# int: A$="a" - %rsi
	# str: A$
	# str: "a"
	leaq	-640(%rbp), %rcx
	leaq	-792(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: A$="w" - %rdi
	# str: A$
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-816(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	# int: A$="s" - %rdi
	# str: A$
	# str: "s"
	leaq	-640(%rbp), %rcx
	leaq	-840(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot22
	# R%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -672(%rbp)
.ifnot22:
	# IF R%=0 THEN PRINT "ERROR L2"
	# int: R%=0 - %rsi
	# int: R% - %rsi
	movq	-672(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot23
	# PRINT "ERROR L2"
	# str: "ERROR L2"
	leaq	-864(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot23:
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# IF A$="a" OR A$="s" OR A$="w" THEN R%=1
	# int: A$="a" OR A$="s" OR A$="w" - %rsi
	# int: A$="a" OR A$="s" - %rsi
	# int: A$="a" - %rsi
	# str: A$
	# str: "a"
	leaq	-640(%rbp), %rcx
	leaq	-888(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: A$="s" - %rdi
	# str: A$
	# str: "s"
	leaq	-640(%rbp), %rcx
	leaq	-912(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	# int: A$="w" - %rdi
	# str: A$
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-936(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot24
	# R%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -672(%rbp)
.ifnot24:
	# IF R%=0 THEN PRINT "ERROR L2"
	# int: R%=0 - %rsi
	# int: R% - %rsi
	movq	-672(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot25
	# PRINT "ERROR L2"
	# str: "ERROR L2"
	leaq	-960(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot25:
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# B$="a"
	# str: "a"
	leaq	-984(%rbp), %rcx
	leaq	-1008(%rbp), %rdx
	call	assignBString
	# IF A$="w" AND B$="a" THEN R%=1
	# int: A$="w" AND B$="a" - %rsi
	# int: A$="w" - %rsi
	# str: A$
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-1032(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: B$="a" - %rdi
	# str: B$
	# str: "a"
	leaq	-984(%rbp), %rcx
	leaq	-1056(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	andq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot26
	# R%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -672(%rbp)
.ifnot26:
	# IF R%=0 THEN PRINT "ERROR L2"
	# int: R%=0 - %rsi
	# int: R% - %rsi
	movq	-672(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot27
	# PRINT "ERROR L2"
	# str: "ERROR L2"
	leaq	-1080(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot27:
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# IF A$="d" OR (B$="a" AND A$="w") THEN R%=1
	# int: A$="d" OR (B$="a" AND A$="w") - %rsi
	# int: A$="d" - %rsi
	# str: A$
	# str: "d"
	leaq	-640(%rbp), %rcx
	leaq	-1104(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: (B$="a" AND A$="w") - %rdi
	# int: B$="a" AND A$="w" - %rdi
	# int: B$="a" - %rdi
	# str: B$
	# str: "a"
	leaq	-984(%rbp), %rcx
	leaq	-1128(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rdi
	# int: A$="w" - %r12
	# str: A$
	# str: "w"
	leaq	-640(%rbp), %rcx
	leaq	-1152(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %r12
	andq	%r12, %rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot28
	# R%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -672(%rbp)
.ifnot28:
	# IF R%=0 THEN PRINT "ERROR L2"
	# int: R%=0 - %rsi
	# int: R% - %rsi
	movq	-672(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot29
	# PRINT "ERROR L2"
	# str: "ERROR L2"
	leaq	-1176(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot29:
	# R%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -672(%rbp)
	# PRINT "END"
	# str: "END"
	leaq	-1200(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    