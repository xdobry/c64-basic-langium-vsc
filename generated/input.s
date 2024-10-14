
	.file	"input"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "STARTING INPUT"
	.byte 0
.LC1:
	.ascii "ss"
	.byte 0
.LC2:
	.ascii "WHAT IS YOUR NAME, SURNAME"
	.byte 0
.LC3:
	.ascii "WELCOME "
	.byte 0
.LC4:
	.ascii " "
	.byte 0
.LC5:
	.ascii "d"
	.byte 0
.LC6:
	.ascii "GIVE A NUMBER"
	.byte 0
.LC7:
	.ascii "this is the 1/2 of is: "
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
	subq	$432, %rsp
	# init variable B$
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	movq	$0, -56(%rbp)
	# init variable C$
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	# init variable strtmp0$
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	# init variable strtmp1$
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	# init variable strtmp2$
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init variable strtmp3$
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	movq	$0, -304(%rbp)
	# init variable strtmp4$
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	movq	$0, -328(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-392(%rbp)
	andl	$0xFFFF9FFF, -392(%rbp)
	orl	$0x2000, -392(%rbp)
	ldmxcsr	-392(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-48(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-168(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	# PRINT "STARTING INPUT"
	# str: "STARTING INPUT"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# INPUT "WHAT IS YOUR NAME, SURNAME" ; B$ , C$
	leaq	-48(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	leaq	-72(%rbp), %r8
	leaq	-96(%rbp), %r9
	call	inputData
	# PRINT "WELCOME ",B$," ",C$
	# str: "WELCOME ",
	leaq	-120(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: B$,
	leaq	-72(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: " ",
	leaq	-144(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: C$
	leaq	-96(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# INPUT "GIVE A NUMBER";A
	leaq	-168(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	leaq	-176(%rbp), %r8
	call	inputData
	# PRINT "this is the 1/2 of is: ",A/2
	# str: "this is the 1/2 of is: ",
	leaq	-200(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: A/2
	# float: A/2
	# float: A
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -384(%rbp)
	movsd	-176(%rbp), %xmm0
	movsd	-384(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -384(%rbp)
	movsd	-384(%rbp), %xmm1
	leaq	-344(%rbp), %rcx
	call	assignDouble
	leaq	-344(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-344(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	leaq	-224(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    