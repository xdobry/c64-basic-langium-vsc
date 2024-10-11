
	.file	"rounding"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "A% "
	.byte 0
.LC1:
	.ascii "ERROR"
	.byte 0
.LC2:
	.ascii "ERROR2"
	.byte 0
.LC3:
	.ascii "TEST"
	.byte 0
.LC4:
	.ascii "=I% "
	.byte 0
.LC5:
	.ascii "EST"
	.byte 0
.LC6:
	.ascii "I% "
	.byte 0
.LC7:
	.ascii "I "
	.byte 0
.LC8:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 23.8
.LF1:
	.double 12.8

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$496, %rsp
	# init variable strtmp0$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init variable strtmp1$
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	# init variable strtmp2$
	movq	$0, -352(%rbp)
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	# init variable strtmp3$
	movq	$0, -376(%rbp)
	movq	$0, -368(%rbp)
	movq	$0, -360(%rbp)
	# init variable strtmp4$
	movq	$0, -400(%rbp)
	movq	$0, -392(%rbp)
	movq	$0, -384(%rbp)
	# init array A$[] 1
	lea	-96(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-448(%rbp)
	andl	$0xFFFF9FFF, -448(%rbp)
	orl	$0x2000, -448(%rbp)
	ldmxcsr	-448(%rbp)
	 # init bstring constants
	leaq	-40(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-64(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-232(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-256(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-280(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	# A=23.8
	# float: 23.8
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	# A%=A
	# int: A - %rsi
	# float: A
	movsd	-8(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -16(%rbp)
	# PRINT "A% ";A%
	# str: "A% ";
	leaq	-400(%rbp), %rcx
	leaq	-40(%rbp), %rdx
	call	assignBString
	# str: A%
	leaq	-376(%rbp), %rcx
	movq	-16(%rbp), %rdx
	call	assignInt
	leaq	-400(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	call	appendBString
	leaq	-376(%rbp), %rcx
	call	freeBString
	movq	-400(%rbp), %rcx
	call	puts
	leaq	-400(%rbp), %rcx
	call	freeBString
	# IF A%<>23 THEN PRINT "ERROR"
	# int: A%<>23 - %rsi
	# int: A% - %rsi
	movq	-16(%rbp), %rsi
	# int: 23 - %rdi
	movq	$23, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	movq	-64(%rbp), %rcx
	call	puts
.ifnot0:
	# DIM A$(12)
	cmpq	$0, -96(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 12 - %rsi
	movq	$12, %rsi
	movq	%rsi, -80(%rbp)
	# I=12.8
	# float: 12.8
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -104(%rbp)
	# I%=I
	# int: I - %rsi
	# float: I
	movsd	-104(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -112(%rbp)
	# IF I%<>12 THEN PRINT "ERROR2"
	# int: I%<>12 - %rsi
	# int: I% - %rsi
	movq	-112(%rbp), %rsi
	# int: 12 - %rdi
	movq	$12, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2"
	# str: "ERROR2"
	movq	-136(%rbp), %rcx
	call	puts
.ifnot1:
	# A$(10)="TEST"
	# str: "TEST"
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-160(%rbp), %rdx
	call	assignBString
	# PRINT "=I% ";I%
	# str: "=I% ";
	leaq	-400(%rbp), %rcx
	leaq	-184(%rbp), %rdx
	call	assignBString
	# str: I%
	leaq	-376(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	leaq	-400(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	call	appendBString
	leaq	-376(%rbp), %rcx
	call	freeBString
	movq	-400(%rbp), %rcx
	call	puts
	leaq	-400(%rbp), %rcx
	call	freeBString
	# A$(I%)="EST"
	# str: "EST"
	# int: I% - %rsi
	movq	-112(%rbp), %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-208(%rbp), %rdx
	call	assignBString
	# PRINT "I% ";A$(I%)
	# str: "I% ";
	leaq	-400(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	assignBString
	# str: A$(I%)
	# int: I% - %rsi
	movq	-112(%rbp), %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-376(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	leaq	-400(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	call	appendBString
	leaq	-376(%rbp), %rcx
	call	freeBString
	movq	-400(%rbp), %rcx
	call	puts
	leaq	-400(%rbp), %rcx
	call	freeBString
	# PRINT "I ";A$(I)
	# str: "I ";
	leaq	-400(%rbp), %rcx
	leaq	-256(%rbp), %rdx
	call	assignBString
	# str: A$(I)
	# int: I - %rsi
	# float: I
	movsd	-104(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-376(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	leaq	-400(%rbp), %rcx
	leaq	-376(%rbp), %rdx
	call	appendBString
	leaq	-376(%rbp), %rcx
	call	freeBString
	movq	-400(%rbp), %rcx
	call	puts
	leaq	-400(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-280(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    