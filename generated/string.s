
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
	.ascii "TEST"
	.byte 0
.LC7:
	.ascii "TEST"
	.byte 0
.LC8:
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
	subq	$464, %rsp
	# init variable A$
	movq	$0, -24(%rbp)
	movq	$0, -16(%rbp)
	movq	$0, -8(%rbp)
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
	# A$="TEST"
	# str: "TEST"
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# PRINT A$
	# str: A$
	movq	-24(%rbp), %rcx
	call	puts
	# PRINT LEN(A$)
	# str: LEN(A$)
	# int: LEN(A$) - %rdx
	movq	-16(%rbp), %rax
	movq	%rax, -424(%rbp)
	movq	-424(%rbp), %rdx
	leaq	-376(%rbp), %rcx
	call	assignInt
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT ASC("A")
	# str: ASC("A")
	# int: ASC("A") - %rdx
	movq	-72(%rbp), %rax
	movzbl	(%eax), %rax
	movq	%rax, -424(%rbp)
	movq	-424(%rbp), %rdx
	leaq	-376(%rbp), %rcx
	call	assignInt
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT CHR$(65),CHR$(66)
	# str: CHR$(65),
	# int: 65 - %rdx
	movq	$65, %rdx
	leaq	-352(%rbp), %rcx
	call	assignChar
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	assignBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	# str: CHR$(66)
	# int: 66 - %rdx
	movq	$66, %rdx
	leaq	-352(%rbp), %rcx
	call	assignChar
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	appendBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# Z%=70
	# int: 70 - %rsi
	movq	$70, %rsi
	movq	%rsi, -80(%rbp)
	# PRINT Z%,"=",CHR$(Z%)
	# str: Z%,
	leaq	-352(%rbp), %rcx
	movq	-80(%rbp), %rdx
	call	assignInt
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	assignBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	# str: "=",
	leaq	-376(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	call	appendBString
	# str: CHR$(Z%)
	# int: Z% - %rdx
	movq	-80(%rbp), %rdx
	leaq	-352(%rbp), %rcx
	call	assignChar
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	appendBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
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
	leaq	-352(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	assignBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	# str: "=",
	leaq	-376(%rbp), %rcx
	leaq	-136(%rbp), %rdx
	call	appendBString
	# str: CHR$(A%)
	# int: A% - %rdx
	movq	-112(%rbp), %rdx
	leaq	-352(%rbp), %rcx
	call	assignChar
	leaq	-376(%rbp), %rcx
	leaq	-352(%rbp), %rdx
	call	appendBString
	leaq	-352(%rbp), %rcx
	call	freeBString
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext0
	# PRINT RIGHT$("TEST",2)
	# str: RIGHT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-376(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	bstrRight
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT LEFT$("TEST",2)
	# str: LEFT$("TEST",2)
	# str: "TEST"
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-376(%rbp), %rcx
	leaq	-184(%rbp), %rdx
	call	bstrLeft
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT MID$("TEST",1)
	# str: MID$("TEST",1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	movq	$0, %r9
	leaq	-376(%rbp), %rcx
	leaq	-208(%rbp), %rdx
	call	bstrMid
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT MID$("TEST",1,1)
	# str: MID$("TEST",1,1)
	# str: "TEST"
	# int: 1 - %r8
	movq	$1, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-376(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	bstrMid
	movq	-376(%rbp), %rcx
	call	puts
	leaq	-376(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-256(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    