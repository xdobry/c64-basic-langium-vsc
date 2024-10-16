
	.file	"compile"
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
	.ascii "="
	.byte 0
.LC3:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 16

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$384, %rsp
	# init variable strtmp0$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# init variable strtmp1$
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	# init variable strtmp2$
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	# init variable strtmp3$
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	# init variable strtmp4$
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init array E%[] 1
	lea	-56(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-344(%rbp)
	andl	$0xFFFF9FFF, -344(%rbp)
	orl	$0x2000, -344(%rbp)
	ldmxcsr	-344(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-152(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DIM E%(16)
	cmpq	$0, -56(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 16 - %rsi
	movq	$16, %rsi
	movq	%rsi, -40(%rbp)
	# FOR I%=0TO16
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-64(%rbp), %rax
	addq	$1, %rax
	cmpq	$16, %rax
	jle	.forCont0
	ret
.forCont0:
	movq	%rax, -64(%rbp)
	pop	%rax
.for0:
	# E%(I%)=0
	# int: I% - %rsi
	movq	-64(%rbp), %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item_ptr
	movq	%rax, %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, (%rsi)
	# NEXT I%
	call	.forNext0
	# Z=RND(-ti)
	# float: RND(-ti)
	# float: -ti
	# float: ti
	# int: ti - %rsi
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	movsd	%xmm0, -72(%rbp)
	# DEF FN R(x)=RND(1)*x+1
	leaq	.defn_exprR_0(%rip), %rax
	movq	%rax, -80(%rbp)
	jmp	.defn_endR_0
.defn_exprR_0:
	subq	$40, %rsp
	# float: RND(1)*x+1
	# float: RND(1)*x
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -328(%rbp)
	# float: x
	movsd	-328(%rbp), %xmm0
	movsd	-88(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -328(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	-336(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endR_0:
	# FOR I%=0 TO 100000
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for1
.forNext1:
	movq	-64(%rbp), %rax
	addq	$1, %rax
	cmpq	$100000, %rax
	jle	.forCont1
	ret
.forCont1:
	movq	%rax, -64(%rbp)
	pop	%rax
.for1:
	# Z%=FN R(16.0)
	# int: FN R(16.0) - %rsi
	# float: FN R(16.0)
	# float: 16.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -88(%rbp)
	movq	-80(%rbp), %rax
	pushq	%rsi
	pushq	%rax
	subq	$32, %rsp
	call	*%rax
	movsd	%xmm0, -336(%rbp)
	addq	$32, %rsp
	popq	%rax
	popq	%rsi
	movsd	-336(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -104(%rbp)
	# IF Z%>16 THEN PRINT "ERROR"
	# int: Z%>16 - %rsi
	# int: Z% - %rsi
	movq	-104(%rbp), %rsi
	# int: 16 - %rdi
	movq	$16, %rdi
	cmpq	%rdi, %rsi
	setg	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-128(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# E%(Z%)=E%(Z%)+1
	# int: Z% - %rsi
	movq	-104(%rbp), %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item_ptr
	movq	%rax, %rsi
	# int: E%(Z%)+1 - %rdi
	# int: E%(Z%) - %rdi
	# int: Z% - %r8
	movq	-104(%rbp), %r8
	movq	%r8, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item
	movq	%rax, %rdi
	# int: 1 - %r8
	movq	$1, %r8
	addq	%r8, %rdi
	movq	%rdi, (%rsi)
	# NEXT I%
	call	.forNext1
	# FOR I%=0TO16
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for2
.forNext2:
	movq	-64(%rbp), %rax
	addq	$1, %rax
	cmpq	$16, %rax
	jle	.forCont2
	ret
.forCont2:
	movq	%rax, -64(%rbp)
	pop	%rax
.for2:
	# PRINT I%;"=";E%(I%)
	# str: I%;
	leaq	-296(%rbp), %rcx
	movq	-64(%rbp), %rdx
	call	assignInt
	leaq	-296(%rbp), %rcx
	movq	$4, %rdx
	call	printBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	# str: "=";
	leaq	-152(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: E%(I%)
	# int: E%(I%) - %rdx
	# int: I% - %rsi
	movq	-64(%rbp), %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item
	movq	%rax, %rdx
	leaq	-296(%rbp), %rcx
	call	assignInt
	leaq	-296(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-296(%rbp), %rcx
	call	freeBString
	# NEXT I%
	call	.forNext2
	# PRINT "END"
	# str: "END"
	leaq	-176(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    