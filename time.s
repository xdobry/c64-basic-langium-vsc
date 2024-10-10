
	.file	"time"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TIME "
	.byte 0
.LC2:
	.ascii "TIME INT "
	.byte 0
.LC3:
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
	subq	$320, %rsp
	# init variable strtmp0$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp1$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp2$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp3$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# init variable strtmp4$
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
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
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# MTIME=TI
	# float: TI
	# int: TI - %rsi
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -264(%rbp)
	movsd	-264(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "TIME ";MTIME
	# str: "TIME ";
	leaq	-224(%rbp), %rcx
	leaq	-56(%rbp), %rdx
	call	assignBString
	# str: MTIME
	leaq	-200(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-224(%rbp), %rcx
	leaq	-200(%rbp), %rdx
	call	appendBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	movq	-224(%rbp), %rcx
	call	puts
	leaq	-224(%rbp), %rcx
	call	freeBString
	# PRINT "TIME INT ",TI
	# str: "TIME INT ",
	leaq	-224(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	assignBString
	# str: TI
	# int: TI - %rdx
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rdx
	leaq	-200(%rbp), %rcx
	call	assignInt
	leaq	-224(%rbp), %rcx
	leaq	-200(%rbp), %rdx
	call	appendBString
	leaq	-200(%rbp), %rcx
	call	freeBString
	movq	-224(%rbp), %rcx
	call	puts
	leaq	-224(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-104(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    