
	.file	"print_spc"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TEST"
	.byte 0
.LC2:
	.ascii "TEST"
	.byte 0
.LC3:
	.ascii "TEST"
	.byte 0
.LC4:
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
	subq	$352, %rsp
	# init variable strtmp0$
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	# init variable strtmp1$
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	# init variable strtmp2$
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	# init variable strtmp3$
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	# init variable strtmp4$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
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
	leaq	-136(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# A=20
	# float: 20
	# int: 20 - %rsi
	movq	$20, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT "TEST";SPC(5);A
	# str: "TEST";
	leaq	-256(%rbp), %rcx
	leaq	-56(%rbp), %rdx
	call	assignBString
	# str: SPC(5);
	# int: 5 - %rdx
	movq	$5, %rdx
	leaq	-232(%rbp), %rcx
	call	bstrSpc
	leaq	-256(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	appendBString
	leaq	-232(%rbp), %rcx
	call	freeBString
	# str: A
	leaq	-232(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-256(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	appendBString
	leaq	-232(%rbp), %rcx
	call	freeBString
	movq	-256(%rbp), %rcx
	call	puts
	leaq	-256(%rbp), %rcx
	call	freeBString
	# PRINT "TEST";TAB(10);A
	# str: "TEST";
	leaq	-256(%rbp), %rcx
	leaq	-80(%rbp), %rdx
	call	assignBString
	# str: TAB(10);
	# int: 10 - %rdx
	movq	$10, %rdx
	leaq	-232(%rbp), %rcx
	call	bstrTab
	leaq	-256(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	appendBString
	leaq	-232(%rbp), %rcx
	call	freeBString
	# str: A
	leaq	-232(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	leaq	-256(%rbp), %rcx
	leaq	-232(%rbp), %rdx
	call	appendBString
	leaq	-232(%rbp), %rcx
	call	freeBString
	movq	-256(%rbp), %rcx
	call	puts
	leaq	-256(%rbp), %rcx
	call	freeBString
	# PRINT "TEST";
	# str: "TEST";
	movq	-104(%rbp), %rcx
	call	puts
	# A%=POS(0)
	# int: POS(0) - %rsi
	movq	$0, %rsi
	movq	%rsi, -112(%rbp)
	# PRINT A%
	# str: A%
	leaq	-256(%rbp), %rcx
	movq	-112(%rbp), %rdx
	call	assignInt
	movq	-256(%rbp), %rcx
	call	puts
	leaq	-256(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-136(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    