
	.file	"ongoto"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR1"
	.byte 0
.LC2:
	.ascii "L1 LANDING"
	.byte 0
.LC3:
	.ascii "ERROR2"
	.byte 0
.LC4:
	.ascii "ERROR2"
	.byte 0
.LC5:
	.ascii "L2 LANDING"
	.byte 0
.LC6:
	.ascii "ERROR21"
	.byte 0
.LC7:
	.ascii "ERROR3"
	.byte 0
.LC8:
	.ascii "L3 LANDING"
	.byte 0
.LC9:
	.ascii "ERROR3"
	.byte 0
.LC10:
	.ascii "ERROR4"
	.byte 0
.LC11:
	.ascii "ERROR5"
	.byte 0
.LC12:
	.ascii "ERROR"
	.byte 0
.LC13:
	.ascii "230"
	.byte 0
.LC14:
	.ascii "290"
	.byte 0
.LC15:
	.ascii "350"
	.byte 0
.LC16:
	.ascii "410"
	.byte 0
.LC17:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
# jump tables for goto and gosub
.jt0:
	.quad .l1
	.quad .l2
	.quad .l3
.jt1:
	.quad .l1
	.quad .l2
	.quad .l3
.jt2:
	.quad .l1
	.quad .l2
	.quad .l3
.jt3:
	.quad .s1
	.quad .s2
.jt4:
	.quad .s1
	.quad .s2
.jt5:
	.quad .line230
	.quad .line290
	.quad .line350
	.quad .line410

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$672, %rsp
	# init variable strtmp0$
	movq	$0, -488(%rbp)
	movq	$0, -480(%rbp)
	movq	$0, -472(%rbp)
	# init variable strtmp1$
	movq	$0, -512(%rbp)
	movq	$0, -504(%rbp)
	movq	$0, -496(%rbp)
	# init variable strtmp2$
	movq	$0, -536(%rbp)
	movq	$0, -528(%rbp)
	movq	$0, -520(%rbp)
	# init variable strtmp3$
	movq	$0, -560(%rbp)
	movq	$0, -552(%rbp)
	movq	$0, -544(%rbp)
	# init variable strtmp4$
	movq	$0, -584(%rbp)
	movq	$0, -576(%rbp)
	movq	$0, -568(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-632(%rbp)
	andl	$0xFFFF9FFF, -632(%rbp)
	orl	$0x2000, -632(%rbp)
	ldmxcsr	-632(%rbp)
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
	leaq	-128(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-152(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-280(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-304(%rbp), %rcx
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
	leaq	-464(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# S%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -32(%rbp)
	# ON S% GOTO l1,l2,l3
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd0
	cmpq	$3, %rsi
	ja	.gotoEnd0
	decq	%rsi
	jmp	*.jt0(,%rsi,8)
.gotoEnd0:
	# PRINT "ERROR1"
	# str: "ERROR1"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
.l1:
	# PRINT "L1 LANDING"
	# str: "L1 LANDING"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# IF S%<>1 THEN PRINT "ERROR2"
	# int: S%<>1 - %rsi
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# S%=2
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -32(%rbp)
	# ON S% GOTO l1,l2,l3
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd1
	cmpq	$3, %rsi
	ja	.gotoEnd1
	decq	%rsi
	jmp	*.jt1(,%rsi,8)
.gotoEnd1:
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-128(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
.l2:
	# PRINT "L2 LANDING"
	# str: "L2 LANDING"
	leaq	-152(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# IF S%<>2 THEN PRINT "ERROR21"
	# int: S%<>2 - %rsi
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR21"
	# str: "ERROR21"
	leaq	-176(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# S%=3
	# int: 3 - %rsi
	movq	$3, %rsi
	movq	%rsi, -32(%rbp)
	# ON S% GOTO l1,l2,l3
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd2
	cmpq	$3, %rsi
	ja	.gotoEnd2
	decq	%rsi
	jmp	*.jt2(,%rsi,8)
.gotoEnd2:
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-200(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
.l3:
	# PRINT "L3 LANDING"
	# str: "L3 LANDING"
	leaq	-224(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# IF S%<>3 THEN PRINT "ERROR3"
	# int: S%<>3 - %rsi
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	# int: 3 - %rdi
	movq	$3, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-248(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# S%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -32(%rbp)
	# A%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
	# ON S% GOSUB s1,s2
	leaq	.gotoEnd3(%rip), %rcx
	call	pushEntry
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd3
	cmpq	$2, %rsi
	ja	.gotoEnd3
	decq	%rsi
	jmp	*.jt3(,%rsi,8)
.gotoEnd3:
	# IF A%<>1 THEN PRINT "ERROR4"
	# int: A%<>1 - %rsi
	# int: A% - %rsi
	movq	-256(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR4"
	# str: "ERROR4"
	leaq	-280(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# S%=2
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -32(%rbp)
	# ON S% GOSUB s1,s2
	leaq	.gotoEnd4(%rip), %rcx
	call	pushEntry
	# int: S% - %rsi
	movq	-32(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd4
	cmpq	$2, %rsi
	ja	.gotoEnd4
	decq	%rsi
	jmp	*.jt4(,%rsi,8)
.gotoEnd4:
	# IF A%<>2 THEN PRINT "ERROR5"
	# int: A%<>2 - %rsi
	# int: A% - %rsi
	movq	-256(%rbp), %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR5"
	# str: "ERROR5"
	leaq	-304(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# i%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -312(%rbp)
.line200:
	# rv% = RND(1)*4+1
	# int: RND(1)*4+1 - %rsi
	# float: RND(1)*4+1
	# float: RND(1)*4
	# float: RND(1)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -624(%rbp)
	movsd	-624(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -616(%rbp)
	# float: 4
	# int: 4 - %rdi
	movq	$4, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -624(%rbp)
	movsd	-616(%rbp), %xmm0
	movsd	-624(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -624(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -616(%rbp)
	movsd	-624(%rbp), %xmm0
	movsd	-616(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -616(%rbp)
	movsd	-616(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -320(%rbp)
	# ON rv% GOTO 230,290,350,410
	# int: rv% - %rsi
	movq	-320(%rbp), %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd5
	cmpq	$4, %rsi
	ja	.gotoEnd5
	decq	%rsi
	jmp	*.jt5(,%rsi,8)
.gotoEnd5:
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-344(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# GOTO 500
	jmp	.line500
.line230:
	# PRINT "230"
	# str: "230"
	leaq	-368(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# GOTO 500
	jmp	.line500
.line290:
	# PRINT "290"
	# str: "290"
	leaq	-392(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# GOTO 500
	jmp	.line500
.line350:
	# PRINT "350"
	# str: "350"
	leaq	-416(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# GOTO 500
	jmp	.line500
.line410:
	# PRINT "410"
	# str: "410"
	leaq	-440(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# GOTO 500
	jmp	.line500
.line500:
	# IF i%=10 THEN 1000
	# int: i%=10 - %rsi
	# int: i% - %rsi
	movq	-312(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot5
	jmp	.line1000
.ifnot5:
	# i%=i%+1
	# int: i%+1 - %rsi
	# int: i% - %rsi
	movq	-312(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	addq	%rdi, %rsi
	movq	%rsi, -312(%rbp)
	# GOTO 200
	jmp	.line200
.line1000:
	# PRINT "END"
	# str: "END"
	leaq	-464(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
.s1:
	# A%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -256(%rbp)
	# RETURN
	call	popEntry
	jmp	*%rax
.s2:
	# A%=2
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -256(%rbp)
	# RETURN
	call	popEntry
	jmp	*%rax

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    