
	.file	"fixes"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR"
	.byte 0
.LC2:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$352, %rsp
	# init variable strtmp0$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable strtmp1$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init variable strtmp2$
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	# init variable strtmp3$
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	# init variable strtmp4$
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	# init array A$[] 1
	lea	-96(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# A=RND(1)*5+1
	# float: RND(1)*5+1
	# float: RND(1)*5
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -296(%rbp)
	# float: 5
	# int: 5 - %rsi
	movq	$5, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-296(%rbp), %xmm1
	movsd	-304(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -304(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-304(%rbp), %xmm1
	movsd	-296(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# PRINT A
	# str: A
	leaq	-264(%rbp), %rcx
	movsd	-32(%rbp), %xmm1
	call	assignDouble
	movq	-264(%rbp), %rcx
	call	puts
	leaq	-264(%rbp), %rcx
	call	freeBString
	# IF A=26 THEN PRINT "ERROR"
	# int: A=26 - %rsi
	# float: A
	# float: 26
	# int: 26 - %rdi
	movq	$26, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-296(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	movq	-56(%rbp), %rcx
	call	puts
.ifnot0:
	# A=RND(-3)
	# float: RND(-3)
	# float: -3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# FOR I=0 TO 10
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-64(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	movq	%xmm0, -64(%rbp)
	pop	%rax
.for0:
	# A$(I) = STR$(I)
	# str: STR$(I)
	# float: I
	leaq	-264(%rbp), %rcx
	movsd	-64(%rbp), %xmm1
	call	assignDouble
	# int: I - %rsi
	# float: I
	movsd	-64(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-264(%rbp), %rdx
	call	assignBString
	leaq	-264(%rbp), %rcx
	call	freeBString
	# NEXT I
	call	.forNext0
	# PRINT A$(RND(1)*2)
	# str: A$(RND(1)*2)
	# int: RND(1)*2 - %rsi
	# int: RND(1) - %rsi
	# float: RND(1)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -296(%rbp)
	movsd	-296(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	imulq	%rdi, %rsi
	movq	%rsi, -72(%rbp)
	lea	-96(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-264(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	movq	-264(%rbp), %rcx
	call	puts
	leaq	-264(%rbp), %rcx
	call	freeBString
	# D2=32
	# float: 32
	# int: 32 - %rsi
	movq	$32, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -104(%rbp)
	# IF A<0 THEN N=D2:B=A
	# int: A<0 - %rsi
	# float: A
	# float: 0
	# int: 0 - %rdi
	movq	$0, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -304(%rbp)
	movsd	-32(%rbp), %xmm0
	movsd	-304(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# N=D2
	# float: D2
	movsd	-104(%rbp), %xmm0
	movsd	%xmm0, -112(%rbp)
	# B=A
	# float: A
	movsd	-32(%rbp), %xmm0
	movsd	%xmm0, -120(%rbp)
.ifnot1:
	# PRINT "END"
	# str: "END"
	movq	-144(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    