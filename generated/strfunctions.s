
	.file	"strfunctions"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "STR$ INT="
	.byte 0
.LC2:
	.ascii "STR$ FLOAT="
	.byte 0
.LC3:
	.ascii "VAL1"
	.byte 0
.LC4:
	.ascii "10"
	.byte 0
.LC5:
	.ascii "ERROR VAL INT"
	.byte 0
.LC6:
	.ascii "VAL2"
	.byte 0
.LC7:
	.ascii "2.2"
	.byte 0
.LC8:
	.ascii "ERROR VAL FLOAT"
	.byte 0
.LC9:
	.ascii "AB"
	.byte 0
.LC10:
	.ascii "C"
	.byte 0
.LC11:
	.ascii "AB"
	.byte 0
.LC12:
	.ascii "ABC"
	.byte 0
.LC13:
	.ascii "ERROR APPEND"
	.byte 0
.LC14:
	.ascii "D"
	.byte 0
.LC15:
	.ascii "AB"
	.byte 0
.LC16:
	.ascii "DABC"
	.byte 0
.LC17:
	.ascii "ERROR PREPPEND"
	.byte 0
.LC18:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 2.2
.LF1:
	.double 2.2
.LF2:
	.double 2.2

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$736, %rsp
	# init variable A$
	movq	$0, -64(%rbp)
	movq	$0, -56(%rbp)
	movq	$0, -48(%rbp)
	# init variable S1$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp0$
	movq	$0, -544(%rbp)
	movq	$0, -536(%rbp)
	movq	$0, -528(%rbp)
	# init variable strtmp1$
	movq	$0, -568(%rbp)
	movq	$0, -560(%rbp)
	movq	$0, -552(%rbp)
	# init variable strtmp2$
	movq	$0, -592(%rbp)
	movq	$0, -584(%rbp)
	movq	$0, -576(%rbp)
	# init variable strtmp3$
	movq	$0, -616(%rbp)
	movq	$0, -608(%rbp)
	movq	$0, -600(%rbp)
	# init variable strtmp4$
	movq	$0, -640(%rbp)
	movq	$0, -632(%rbp)
	movq	$0, -624(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-688(%rbp)
	andl	$0xFFFF9FFF, -688(%rbp)
	orl	$0x2000, -688(%rbp)
	ldmxcsr	-688(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-88(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-112(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-232(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-256(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-448(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-328(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-448(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-376(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-400(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-424(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-448(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-472(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-496(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-520(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A%=10
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -32(%rbp)
	# A=2.2
	# float: 2.2
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -40(%rbp)
	# A$=STR$(A%)
	# str: STR$(A%)
	# int: A% - %rsi
	movq	-32(%rbp), %rsi
	leaq	-640(%rbp), %rcx
	movq	%rsi, %rdx
	call	assignInt
	leaq	-64(%rbp), %rcx
	leaq	-640(%rbp), %rdx
	call	assignBString
	# PRINT "STR$ INT=",A$
	# str: "STR$ INT=",
	leaq	-88(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A$
	leaq	-64(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A$=STR$(A)
	# str: STR$(A)
	# float: A
	leaq	-640(%rbp), %rcx
	movsd	-40(%rbp), %xmm1
	call	assignDouble
	leaq	-64(%rbp), %rcx
	leaq	-640(%rbp), %rdx
	call	assignBString
	# PRINT "STR$ FLOAT=",A$
	# str: "STR$ FLOAT=",
	leaq	-112(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A$
	leaq	-64(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT "VAL1"
	# str: "VAL1"
	leaq	-136(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A$="10"
	# str: "10"
	leaq	-64(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	assignBString
	# A%=VAL(A$)
	# int: VAL(A$) - %rsi
	# str: A$
	lea	-64(%rbp), %rcx
	call	bstringToInt
	movq	%rax, %rsi
	movq	%rsi, -32(%rbp)
	# IF A%<>10 THEN PRINT "ERROR VAL INT"
	# int: A%<>10 - %rsi
	# int: A% - %rsi
	movq	-32(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR VAL INT"
	# str: "ERROR VAL INT"
	leaq	-184(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# PRINT "VAL2"
	# str: "VAL2"
	leaq	-208(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A$="2.2"
	# str: "2.2"
	leaq	-64(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	assignBString
	# A=VAL(A$)
	# float: VAL(A$)
	# str: A$
	lea	-64(%rbp), %rcx
	call	bstringToDouble
	movq	%xmm0, -680(%rbp)
	movsd	-680(%rbp), %xmm0
	movsd	%xmm0, -40(%rbp)
	# IF A<>2.2 THEN PRINT "ERROR VAL FLOAT"
	# int: A<>2.2 - %rsi
	# float: A
	# float: 2.2
	movsd	-40(%rbp), %xmm0
	movsd	.LF2(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR VAL FLOAT"
	# str: "ERROR VAL FLOAT"
	leaq	-256(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# S1$="AB"
	# str: "AB"
	leaq	-280(%rbp), %rcx
	leaq	-448(%rbp), %rdx
	call	assignBString
	# S1$=S1$+"C"
	# str: S1$+"C"
	# str: S1$
	leaq	-640(%rbp), %rcx
	leaq	-280(%rbp), %rdx
	call	assignBString
	# str: "C"
	leaq	-640(%rbp), %rcx
	leaq	-328(%rbp), %rdx
	call	appendBString
	leaq	-280(%rbp), %rcx
	leaq	-640(%rbp), %rdx
	call	assignBString
	# IF S1$<>"ABC" THEN PRINT "ERROR APPEND"
	# int: S1$<>"ABC" - %rsi
	# str: S1$
	# str: "ABC"
	leaq	-280(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR APPEND"
	# str: "ERROR APPEND"
	leaq	-400(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# S1$ = "D" + S1$
	# str: "D" + S1$
	# str: "D"
	leaq	-640(%rbp), %rcx
	leaq	-424(%rbp), %rdx
	call	assignBString
	# str: S1$
	leaq	-640(%rbp), %rcx
	leaq	-280(%rbp), %rdx
	call	appendBString
	leaq	-280(%rbp), %rcx
	leaq	-640(%rbp), %rdx
	call	assignBString
	# IF S1$<>"DABC" THEN PRINT "ERROR PREPPEND"
	# int: S1$<>"DABC" - %rsi
	# str: S1$
	# str: "DABC"
	leaq	-280(%rbp), %rcx
	leaq	-472(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR PREPPEND"
	# str: "ERROR PREPPEND"
	leaq	-496(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# PRINT "END"
	# str: "END"
	leaq	-520(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    