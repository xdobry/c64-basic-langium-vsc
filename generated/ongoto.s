
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

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$544, %rsp
	# init variable strtmp0$
	movq	$0, -352(%rbp)
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	# init variable strtmp1$
	movq	$0, -376(%rbp)
	movq	$0, -368(%rbp)
	movq	$0, -360(%rbp)
	# init variable strtmp2$
	movq	$0, -400(%rbp)
	movq	$0, -392(%rbp)
	movq	$0, -384(%rbp)
	# init variable strtmp3$
	movq	$0, -424(%rbp)
	movq	$0, -416(%rbp)
	movq	$0, -408(%rbp)
	# init variable strtmp4$
	movq	$0, -448(%rbp)
	movq	$0, -440(%rbp)
	movq	$0, -432(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-496(%rbp)
	andl	$0xFFFF9FFF, -496(%rbp)
	orl	$0x2000, -496(%rbp)
	ldmxcsr	-496(%rbp)
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
	leaq	-328(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
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
	movq	-56(%rbp), %rcx
	call	puts
	# END
	jmp	.basicend
.l1:
	# PRINT "L1 LANDING"
	# str: "L1 LANDING"
	movq	-80(%rbp), %rcx
	call	puts
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
	movq	-104(%rbp), %rcx
	call	puts
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
	movq	-128(%rbp), %rcx
	call	puts
	# END
	jmp	.basicend
.l2:
	# PRINT "L2 LANDING"
	# str: "L2 LANDING"
	movq	-152(%rbp), %rcx
	call	puts
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
	movq	-176(%rbp), %rcx
	call	puts
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
	movq	-200(%rbp), %rcx
	call	puts
	# END
	jmp	.basicend
.l3:
	# PRINT "L3 LANDING"
	# str: "L3 LANDING"
	movq	-224(%rbp), %rcx
	call	puts
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
	movq	-248(%rbp), %rcx
	call	puts
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
	movq	-280(%rbp), %rcx
	call	puts
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
	movq	-304(%rbp), %rcx
	call	puts
.ifnot4:
	# PRINT "END"
	# str: "END"
	movq	-328(%rbp), %rcx
	call	puts
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
    