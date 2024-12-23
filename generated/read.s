
	.file	"read"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "i"
	.byte 0
.LC1:
	.ascii "ERROR1"
	.byte 0
.LC2:
	.ascii "d"
	.byte 0
.LC3:
	.ascii "ERROR2"
	.byte 0
.LC4:
	.ascii "s"
	.byte 0
.LC5:
	.ascii "ONE"
	.byte 0
.LC6:
	.ascii "ERROR3"
	.byte 0
.LC7:
	.ascii "i"
	.byte 0
.LC8:
	.ascii "ERROR4"
	.byte 0
.LC9:
	.ascii "ds"
	.byte 0
.LC10:
	.ascii "ERROR2"
	.byte 0
.LC11:
	.ascii "ONE"
	.byte 0
.LC12:
	.ascii "ERROR3"
	.byte 0
.LC13:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 1.2
.LF1:
	.double 1.2
	.align 4
dataDefinition:
	.align 4
	.quad 1
	.double 1
	.quad 1
	.ascii "1"
	.align 4
	.quad 3
	.double 1.2
	.quad 1
	.ascii "1.2"
	.align 4
	.quad 3
	.double NaN
	.quad 0
	.ascii "ONE"
	.align 4
	.quad 4
	.double NaN
	.quad 0
	.ascii "AR-3"
	.align 4
	.quad 10
	.double NaN
	.quad 0
	.ascii "TEST SPACE"
	.align 4
	.quad 12
	.double NaN
	.quad 0
	.ascii "TEST, ME NOW"

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$480, %rsp
	# init variable A$
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	movq	$0, -72(%rbp)
	# init variable strtmp0$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp1$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init variable strtmp2$
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	# init variable strtmp3$
	movq	$0, -352(%rbp)
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	# init variable strtmp4$
	movq	$0, -376(%rbp)
	movq	$0, -368(%rbp)
	movq	$0, -360(%rbp)
	# init data pointer
	lea	dataDefinition(%rip), %rax
	movq	%rax, -432(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-424(%rbp)
	andl	$0xFFFF9FFF, -424(%rbp)
	orl	$0x2000, -424(%rbp)
	ldmxcsr	-424(%rbp)
	 # init bstring constants
	leaq	-32(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-64(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-112(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-232(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-256(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	# READ A%
	leaq	-432(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	leaq	-8(%rbp), %r8
	call	readData
	# IF A%<>1 THEN PRINT "ERROR1"
	# int: A%<>1 - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	leaq	-32(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# READ A
	leaq	-432(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	leaq	-40(%rbp), %r8
	call	readData
	# IF A<>1.2 THEN PRINT "ERROR2"
	# int: A<>1.2 - %rsi
	# float: A
	# float: 1.2
	movsd	-40(%rbp), %xmm0
	movsd	.LF0(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-64(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# READ A$
	leaq	-432(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	leaq	-88(%rbp), %r8
	call	readData
	# IF A$<>"ONE" THEN PRINT "ERROR3"
	# int: A$<>"ONE" - %rsi
	# str: A$
	# str: "ONE"
	leaq	-88(%rbp), %rcx
	leaq	-112(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-136(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# RESTORE
	lea	dataDefinition(%rip), %rax
	movq	%rax, -432(%rbp)
	# READ A%
	leaq	-432(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	leaq	-8(%rbp), %r8
	call	readData
	# IF A%<>1 THEN PRINT "ERROR4"
	# int: A%<>1 - %rsi
	# int: A% - %rsi
	movq	-8(%rbp), %rsi
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
	leaq	-160(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# READ A, A$
	leaq	-432(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	leaq	-40(%rbp), %r8
	leaq	-88(%rbp), %r9
	call	readData
	# IF A<>1.2 THEN PRINT "ERROR2"
	# int: A<>1.2 - %rsi
	# float: A
	# float: 1.2
	movsd	-40(%rbp), %xmm0
	movsd	.LF1(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-184(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# IF A$<>"ONE" THEN PRINT "ERROR3"
	# int: A$<>"ONE" - %rsi
	# str: A$
	# str: "ONE"
	leaq	-88(%rbp), %rcx
	leaq	-208(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-232(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot5:
	# PRINT "END"
	# str: "END"
	leaq	-256(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DATA 1,1.2,"ONE"
	# DATA AR-3,TEST SPACE,"TEST, ME NOW"

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    