
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
	movq	-24(%rbp), %rcx
	call	puts
	# INPUT "WHAT IS YOUR NAME, SURNAME" ; B$ , C$
	leaq	-48(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	leaq	-72(%rbp), %r8
	leaq	-96(%rbp), %r9
	call	inputData
	# PRINT "WELCOME ",B$," ",C$
	# str: "WELCOME ",
	leaq	-248(%rbp), %rcx
	leaq	-120(%rbp), %rdx
	call	assignBString
	# str: B$,
	leaq	-248(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	appendBString
	# str: " ",
	leaq	-248(%rbp), %rcx
	leaq	-144(%rbp), %rdx
	call	appendBString
	# str: C$
	leaq	-248(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	call	appendBString
	movq	-248(%rbp), %rcx
	call	puts
	leaq	-248(%rbp), %rcx
	call	freeBString
	# INPUT "GIVE A NUMBER";A
	leaq	-168(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	leaq	-176(%rbp), %r8
	call	inputData
	# PRINT "this is the 1/2 of is: ",A/2
	# str: "this is the 1/2 of is: ",
	leaq	-248(%rbp), %rcx
	leaq	-200(%rbp), %rdx
	call	assignBString
	# str: A/2
	# float: A/2
	# float: A
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -352(%rbp)
	movsd	-176(%rbp), %xmm0
	movsd	-352(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -352(%rbp)
	movsd	-352(%rbp), %xmm1
	leaq	-272(%rbp), %rcx
	call	assignDouble
	leaq	-248(%rbp), %rcx
	leaq	-272(%rbp), %rdx
	call	appendBString
	leaq	-272(%rbp), %rcx
	call	freeBString
	movq	-248(%rbp), %rcx
	call	puts
	leaq	-248(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-224(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    