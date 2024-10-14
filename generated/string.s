
	.file	"string"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "TEST"
	.byte 0
.LC1:
	.ascii "A"
	.byte 0
.LC2:
	.ascii "="
	.byte 0
.LC3:
	.ascii "="
	.byte 0
.LC4:
	.ascii "TEST"
	.byte 0
.LC5:
	.ascii "TEST"
	.byte 0
.LC6:
	.ascii "ST"
	.byte 0
.LC7:
	.ascii "ERROR3"
	.byte 0
.LC8:
	.ascii "TEST"
	.byte 0
.LC9:
	.ascii "T"
	.byte 0
.LC10:
	.ascii "ERROR4"
	.byte 0
.LC11:
	.ascii "TEST"
	.byte 0
.LC12:
	.ascii "TEST"
	.byte 0
.LC13:
	.ascii "TE"
	.byte 0
.LC14:
	.ascii "ERROR5"
	.byte 0
.LC15:
	.ascii "TEST"
	.byte 0
.LC16:
	.ascii "T"
	.byte 0
.LC17:
	.ascii "ERROR6"
	.byte 0
.LC18:
	.ascii "TEST"
	.byte 0
.LC19:
	.ascii "TEST"
	.byte 0
.LC20:
	.ascii "EST"
	.byte 0
.LC21:
	.ascii "ERROR"
	.byte 0
.LC22:
	.ascii "MID11 "
	.byte 0
.LC23:
	.ascii "TEST"
	.byte 0
.LC24:
	.ascii "TEST"
	.byte 0
.LC25:
	.ascii "T"
	.byte 0
.LC26:
	.ascii "ERROR-1"
	.byte 0
.LC27:
	.ascii "TEST"
	.byte 0
.LC28:
	.ascii "E"
	.byte 0
.LC29:
	.ascii "ERROR2"
	.byte 0
.LC30:
	.ascii "TEST"
	.byte 0
.LC31:
	.ascii "EST"
	.byte 0
.LC32:
	.ascii "ERROR2"
	.byte 0
.LC33:
	.ascii "TEST"
	.byte 0
.LC34:
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
	subq	$1088, %rsp
	# init variable A$
	movq	$0, -24(%rbp)
	movq	$0, -16(%rbp)
	movq	$0, -8(%rbp)
	# init variable strtmp0$
	movq	$0, -904(%rbp)
	movq	$0, -896(%rbp)
	movq	$0, -888(%rbp)
	# init variable strtmp1$
	movq	$0, -928(%rbp)
	movq	$0, -920(%rbp)
	movq	$0, -912(%rbp)
	# init variable strtmp2$
	movq	$0, -952(%rbp)
	movq	$0, -944(%rbp)
	movq	$0, -936(%rbp)
	# init variable strtmp3$
	movq	$0, -976(%rbp)
	movq	$0, -968(%rbp)
	movq	$0, -960(%rbp)
	# init variable strtmp4$
	movq	$0, -1000(%rbp)
	movq	$0, -992(%rbp)
	movq	$0, -984(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-1048(%rbp)
	andl	$0xFFFF9FFF, -1048(%rbp)
	orl	$0x2000, -1048(%rbp)
	ldmxcsr	-1048(%rbp)
	 # init bstring constants
	leaq	-48(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-72(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
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
	leaq	-280(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-304(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-328(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-352(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-376(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-400(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-424(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-448(%rbp), %rcx
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
	leaq	-664(%rbp), %rcx
	leaq	.LC25(%rip), %rdx
	call	assignFromConst
	leaq	-688(%rbp), %rcx
	leaq	.LC26(%rip), %rdx
	call	assignFromConst
	leaq	-712(%rbp), %rcx
	leaq	.LC27(%rip), %rdx
	call	assignFromConst
	leaq	-736(%rbp), %rcx
	leaq	.LC28(%rip), %rdx
	call	assignFromConst
	leaq	-760(%rbp), %rcx
	leaq	.LC29(%rip), %rdx
	call	assignFromConst
	leaq	-784(%rbp), %rcx
	leaq	.LC30(%rip), %rdx
	call	assignFromConst
	leaq	-808(%rbp), %rcx
	leaq	.LC31(%rip), %rdx
	call	assignFromConst
	leaq	-832(%rbp), %rcx
	leaq	.LC32(%rip), %rdx
	call	assignFromConst
	leaq	-856(%rbp), %rcx
	leaq	.LC33(%rip), %rdx
	call	assignFromConst
	leaq	-880(%rbp), %rcx
	leaq	.LC34(%rip), %rdx
	call	assignFromConst
	# A$="TEST"
	# str: "TEST"
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# PRINT A$
	# str: A$
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT LEN(A$)
	# str: LEN(A$)
	# int: LEN(A$) - %rdx
	movq	-16(%rbp), %rax
	movq	%rax, -1048(%rbp)
	movq	-1048(%rbp), %rdx
	leaq	-1000(%rbp), %rcx
	call	assignInt
	leaq	-1000(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# PRINT ASC("A")
	# str: ASC("A")
	# int: ASC("A") - %rdx
	movq	-72(%rbp), %rax
	movzbl	(%eax), %rax
	movq	%rax, -1048(%rbp)
	movq	-1048(%rbp), %rdx
	leaq	-1000(%rbp), %rcx
	call	assignInt
	leaq	-1000(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# PRINT CHR$(65),CHR$(66)
	# str: CHR$(65),
	# int: 65 - %rdx
	movq	$65, %rdx
	leaq	-1000(%rbp), %rcx
	call	assignChar
	leaq	-1000(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# str: CHR$(66)
	# int: 66 - %rdx
	movq	$66, %rdx
	leaq	-1000(%rbp), %rcx
	call	assignChar
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# Z%=70
	# int: 70 - %rsi
	movq	$70, %rsi
	movq	%rsi, -80(%rbp)
	# PRINT Z%,"=",CHR$(Z%)
	# str: Z%,
	leaq	-1000(%rbp), %rcx
	movq	-80(%rbp), %rdx
	call	assignInt
	leaq	-1000(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# str: "=",
	leaq	-104(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: CHR$(Z%)
	# int: Z% - %rdx
	movq	-80(%rbp), %rdx
	leaq	-1000(%rbp), %rcx
	call	assignChar
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# FOR A%=65 TO 80
	# int: 65 - %rsi
	movq	$65, %rsi
	movq	%rsi, -112(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-112(%rbp), %rax
	addq	$1, %rax
	cmpq	$80, %rax
	jle	.forCont0
	ret
.forCont0:
	movq	%rax, -112(%rbp)
	pop	%rax
.for0:
	# PRINT A%,"=",CHR$(A%)
	# str: A%,
	leaq	-1000(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	leaq	-1000(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# str: "=",
	leaq	-136(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: CHR$(A%)
	# int: A% - %rdx
	movq	-112(%rbp), %rdx
	leaq	-1000(%rbp), %rcx
	call	assignChar
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext0
	# PRINT RIGHT$("TEST",2)
	# str: RIGHT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	bstrRight
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# IF RIGHT$("TEST",2)<>"ST" THEN PRINT "ERROR3"
	# int: RIGHT$("TEST",2)<>"ST" - %rsi
	# str: RIGHT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-184(%rbp), %rdx
	call	bstrRight
	# str: "ST"
	leaq	-1000(%rbp), %rcx
	leaq	-208(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR3"
	# str: "ERROR3"
	leaq	-232(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# IF RIGHT$("TEST",1)<>"T" THEN PRINT "ERROR4"
	# int: RIGHT$("TEST",1)<>"T" - %rsi
	# str: RIGHT$("TEST",1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-256(%rbp), %rdx
	call	bstrRight
	# str: "T"
	leaq	-1000(%rbp), %rcx
	leaq	-280(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR4"
	# str: "ERROR4"
	leaq	-304(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# PRINT LEFT$("TEST",2)
	# str: LEFT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-328(%rbp), %rdx
	call	bstrLeft
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# IF LEFT$("TEST",2)<>"TE" THEN PRINT "ERROR5"
	# int: LEFT$("TEST",2)<>"TE" - %rsi
	# str: LEFT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	bstrLeft
	# str: "TE"
	leaq	-1000(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR5"
	# str: "ERROR5"
	leaq	-400(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# IF LEFT$("TEST",1)<>"T" THEN PRINT "ERROR6"
	# int: LEFT$("TEST",1)<>"T" - %rsi
	# str: LEFT$("TEST",1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	leaq	-1000(%rbp), %rcx
	leaq	-424(%rbp), %rdx
	call	bstrLeft
	# str: "T"
	leaq	-1000(%rbp), %rcx
	leaq	-448(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR6"
	# str: "ERROR6"
	leaq	-472(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot3:
	# PRINT MID$("TEST",2)
	# str: MID$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	movq	$0, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-496(%rbp), %rdx
	call	bstrMid
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# IF MID$("TEST",2)<>"EST" THEN PRINT "ERROR"
	# int: MID$("TEST",2)<>"EST" - %rsi
	# str: MID$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	movq	$0, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-520(%rbp), %rdx
	call	bstrMid
	# str: "EST"
	leaq	-1000(%rbp), %rcx
	leaq	-544(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-568(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot4:
	# PRINT "MID11 ";MID$("TEST",1,1)
	# str: "MID11 ";
	leaq	-592(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: MID$("TEST",1,1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-616(%rbp), %rdx
	call	bstrMid
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# IF MID$("TEST",1,1)<>"T" THEN PRINT "ERROR-1"
	# int: MID$("TEST",1,1)<>"T" - %rsi
	# str: MID$("TEST",1,1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-640(%rbp), %rdx
	call	bstrMid
	# str: "T"
	leaq	-1000(%rbp), %rcx
	leaq	-664(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "ERROR-1"
	# str: "ERROR-1"
	leaq	-688(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot5:
	# IF MID$("TEST",2,1)<>"E" THEN PRINT "ERROR2"
	# int: MID$("TEST",2,1)<>"E" - %rsi
	# str: MID$("TEST",2,1)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-712(%rbp), %rdx
	call	bstrMid
	# str: "E"
	leaq	-1000(%rbp), %rcx
	leaq	-736(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-760(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot6:
	# IF MID$("TEST",2,10)<>"EST" THEN PRINT "ERROR2"
	# int: MID$("TEST",2,10)<>"EST" - %rsi
	# str: MID$("TEST",2,10)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	# int: 10 - %r9
	movq	$10, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-784(%rbp), %rdx
	call	bstrMid
	# str: "EST"
	leaq	-1000(%rbp), %rcx
	leaq	-808(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-1000(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot7
	# PRINT "ERROR2"
	# str: "ERROR2"
	leaq	-832(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot7:
	# PRINT MID$("TEST",1,1)
	# str: MID$("TEST",1,1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1000(%rbp), %rcx
	leaq	-856(%rbp), %rdx
	call	bstrMid
	leaq	-1000(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	leaq	-1000(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	leaq	-880(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    