
	.file	"labels"
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
.LC6:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$480, %rsp
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
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init variable strtmp1$
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	movq	$0, -304(%rbp)
	# init variable strtmp2$
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	movq	$0, -328(%rbp)
	# init variable strtmp3$
	movq	$0, -368(%rbp)
	movq	$0, -360(%rbp)
	movq	$0, -352(%rbp)
	# init variable strtmp4$
	movq	$0, -392(%rbp)
	movq	$0, -384(%rbp)
	movq	$0, -376(%rbp)
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
	leaq	-272(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	# LET A$="HALLO "
	# str: "HALLO "
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# LET B$="WORLD "
	# str: "WORLD "
	leaq	-72(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	call	assignBString
	# LET C%=4711
	# int: 4711 - %rsi
	movq	$4711, %rsi
	movq	%rsi, -104(%rbp)
	# PRINT A$ B$ C%
	# str: A$
	leaq	-296(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	# str: B$
	leaq	-296(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	appendBString
	# str: C%
	leaq	-320(%rbp), %rcx
	movq	-104(%rbp), %rdx
	call	assignInt
	leaq	-296(%rbp), %rcx
	leaq	-320(%rbp), %rdx
	call	appendBString
	leaq	-320(%rbp), %rcx
	call	freeBString
	movq	-296(%rbp), %rcx
	call	puts
	leaq	-296(%rbp), %rcx
	call	freeBString
	# LET MSG$=A$+B$
	# str: A$+B$
	# str: A$
	leaq	-296(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	# str: B$
	leaq	-296(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	appendBString
	leaq	-128(%rbp), %rcx
	leaq	-296(%rbp), %rdx
	call	assignBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	# PRINT MSG$
	# str: MSG$
	movq	-128(%rbp), %rcx
	call	puts
	# LET MSG2$=A$+"TEST"
	# str: A$+"TEST"
	# str: A$
	leaq	-296(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	assignBString
	# str: "TEST"
	leaq	-296(%rbp), %rcx
	leaq	-176(%rbp), %rdx
	call	appendBString
	leaq	-152(%rbp), %rcx
	leaq	-296(%rbp), %rdx
	call	assignBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	# PRINT MSG2$
	# str: MSG2$
	movq	-152(%rbp), %rcx
	call	puts
	# PRINT "HALLO"
	# str: "HALLO"
	movq	-200(%rbp), %rcx
	call	puts
	# PRINT "WORLD"
	# str: "WORLD"
	movq	-224(%rbp), %rcx
	call	puts
	# LET C%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -104(%rbp)
.loop:
	# PRINT "IF LOOP ",C%
	# str: "IF LOOP ",
	leaq	-296(%rbp), %rcx
	leaq	-248(%rbp), %rdx
	call	assignBString
	# str: C%
	leaq	-320(%rbp), %rcx
	movq	-104(%rbp), %rdx
	call	assignInt
	leaq	-296(%rbp), %rcx
	leaq	-320(%rbp), %rdx
	call	appendBString
	leaq	-320(%rbp), %rcx
	call	freeBString
	movq	-296(%rbp), %rcx
	call	puts
	leaq	-296(%rbp), %rcx
	call	freeBString
	# C%=C%+1
	# int: C%+1 - %rsi
	# int: C% - %rsi
	movq	-104(%rbp), %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	addq	%rdi, %rsi
	movq	%rsi, -104(%rbp)
	# IF C%<5 THEN GOTO loop
	# int: C%<5 - %rsi
	# int: C% - %rsi
	movq	-104(%rbp), %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	cmpq	%rdi, %rsi
	setl	%al
	movzbq	%al, %rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# GOTO loop
	jmp	.loop
.ifnot0:
	# PRINT "END"
	# str: "END"
	movq	-272(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    