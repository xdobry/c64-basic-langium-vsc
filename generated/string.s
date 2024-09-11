
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

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$432, %rsp
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
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# PRINT A$
	movq	-24(%rbp), %rcx
	call	puts
	# PRINT LEN(A$)
	movq	-16(%rbp), %rax
	movq	%rax, -384(%rbp)
	movq	-384(%rbp), %rdx
	leaq	-280(%rbp), %rcx
	call	assignInt
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT ASC("A")
	movq	-72(%rbp), %rax
	movzbl	(%eax), %rax
	movq	%rax, -384(%rbp)
	movq	-384(%rbp), %rdx
	leaq	-280(%rbp), %rcx
	call	assignInt
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT CHR$(65),CHR$(66)
	movq	$65, %rdx
	leaq	-304(%rbp), %rcx
	call	assignChar
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	movq	$66, %rdx
	leaq	-304(%rbp), %rcx
	call	assignChar
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	appendBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# Z%=70
	movq	$70, %rax
	movq	%rax, -80(%rbp)
	# PRINT Z%,"=",CHR$(Z%)
	leaq	-304(%rbp), %rcx
	movq	-80(%rbp), %rdx
	call	assignInt
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	leaq	-280(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	call	appendBString
	movq	-80(%rbp), %rdx
	leaq	-304(%rbp), %rcx
	call	assignChar
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	appendBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# FOR A%=65 TO 80
	movq	$65, %rax
	movq	%rax, -112(%rbp)
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
	leaq	-304(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	leaq	-280(%rbp), %rcx
	leaq	-136(%rbp), %rdx
	call	appendBString
	movq	-112(%rbp), %rdx
	leaq	-304(%rbp), %rcx
	call	assignChar
	leaq	-280(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	appendBString
	leaq	-304(%rbp), %rcx
	call	freeBString
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext0
	# PRINT RIGHT$("TEST",2)
	movq	$2, %r8
	leaq	-280(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	bstrRight
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT LEFT$("TEST",2)
	movq	$2, %r8
	leaq	-280(%rbp), %rcx
	leaq	-184(%rbp), %rdx
	call	bstrLeft
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT MID$("TEST",1)
	movq	$1, %r8
	movq	$0, %r9
	leaq	-280(%rbp), %rcx
	leaq	-208(%rbp), %rdx
	call	bstrMid
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT MID$("TEST",1,1)
	movq	$1, %r8
	movq	$1, %r9
	leaq	-280(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	bstrMid
	movq	-280(%rbp), %rcx
	call	puts
	leaq	-280(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	movq	-256(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    