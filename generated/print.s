
	.file	"print"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "HALLO "
	.byte 0
.LC1:
	.ascii "WORLD "
	.byte 0
.LC2:
	.ascii "TEST"
	.byte 0
.LC3:
	.ascii "HALLO"
	.byte 0
.LC4:
	.ascii "WORLD"
	.byte 0
.LC5:
	.ascii "IF LOOP "
	.byte 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$416, %rsp
	# init variable A$
	movq	$0, -24(%rbp)
	movq	$0, -16(%rbp)
	movq	$0, -8(%rbp)
	# init variable B$
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	movq	$0, -56(%rbp)
	# init variable MSG$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable MSG2$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp0$
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	# init variable strtmp1$
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init variable strtmp2$
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	movq	$0, -304(%rbp)
	# init variable strtmp3$
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	movq	$0, -328(%rbp)
	# init variable strtmp4$
	movq	$0, -368(%rbp)
	movq	$0, -360(%rbp)
	movq	$0, -352(%rbp)
	 # init bstring constants
	leaq	-48(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	# LET A$="HALLO "
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# LET B$="WORLD "
	leaq	-72(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	call	assignBString
	# LET C%=4711
	movq	$4711, %rax
	movq	%rax, -104(%rbp)
	# PRINT A$ B$ C%
	leaq	-272(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	leaq	-272(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	appendBString
	leaq	-296(%rbp), %rcx
	movq	-104(%rbp), %rdx
	call	assignInt
	leaq	-272(%rbp), %rcx
	leaq	-296(%rbp), %rdx
	call	appendBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	movq	-272(%rbp), %rcx
	call	puts
	leaq	-272(%rbp), %rcx
	call	freeBString
	# LET MSG$=A$+B$
	leaq	-272(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	leaq	-272(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	appendBString
	leaq	-128(%rbp), %rcx
	leaq	-272(%rbp), %rdx
	call	assignBString
	leaq	-272(%rbp), %rcx
	call	freeBString
	# PRINT MSG$
	movq	-128(%rbp), %rcx
	call	puts
	# LET MSG2$=A$+"TEST"
	leaq	-272(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	leaq	-272(%rbp), %rcx
	leaq	-176(%rbp), %rdx
	call	appendBString
	leaq	-152(%rbp), %rcx
	leaq	-272(%rbp), %rdx
	call	assignBString
	leaq	-272(%rbp), %rcx
	call	freeBString
	# PRINT MSG2$
	movq	-152(%rbp), %rcx
	call	puts
	# PRINT "HALLO"
	movq	-200(%rbp), %rcx
	call	puts
	# PRINT "WORLD"
	movq	-224(%rbp), %rcx
	call	puts
	# LET C%=0
	movq	$0, %rax
	movq	%rax, -104(%rbp)
.loop:
	# PRINT "IF LOOP ",C%
	leaq	-272(%rbp), %rcx
	leaq	-248(%rbp), %rdx
	call	assignBString
	leaq	-296(%rbp), %rcx
	movq	-104(%rbp), %rdx
	call	assignInt
	leaq	-272(%rbp), %rcx
	leaq	-296(%rbp), %rdx
	call	appendBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	movq	-272(%rbp), %rcx
	call	puts
	leaq	-272(%rbp), %rcx
	call	freeBString
	# C%=C%+1
	movq	-104(%rbp), %rax
	movq	$1, %rbx
	addq	%rbx, %rax
	movq	%rax, -104(%rbp)
	# IF C%<5 THEN GOTO loop
	movq	-104(%rbp), %rbx
	movq	$5, %rcx
	cmpq	%rcx, %rbx
	setl	%al
	movzbq	%al, %rbx
	cmpq	$0, %rbx
	je	.ifnot0
	# GOTO loop
	jmp	.loop
.ifnot0:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    