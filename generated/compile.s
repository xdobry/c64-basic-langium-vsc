
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii ""
	.byte 0
.LC2:
	.ascii "TDIFF"
	.byte 0
.LC3:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 1000000
.LF1:
	.double 100
.LF2:
	.double 100

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$400, %rsp
	# init variable R$
	movq	$0, -104(%rbp)
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	# init variable strtmp0$
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	# init variable strtmp1$
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	# init variable strtmp2$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	# init variable strtmp3$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp4$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init array A$[] 1
	lea	-64(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-352(%rbp)
	andl	$0xFFFF9FFF, -352(%rbp)
	orl	$0x2000, -352(%rbp)
	ldmxcsr	-352(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# TSTART=TI
	# float: TI
	# int: TI - %rsi
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -344(%rbp)
	movsd	-344(%rbp), %xmm0
	movsd	%xmm0, -32(%rbp)
	# DIM A$(100)
	cmpq	$0, -64(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 100 - %rsi
	movq	$100, %rsi
	movq	%rsi, -48(%rbp)
	# FOR R=0 TO 1000000
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -344(%rbp)
	movsd	-344(%rbp), %xmm0
	movsd	%xmm0, -72(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-72(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -72(%rbp)
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	pop	%rax
.for0:
	# FOR I=0 TO 100
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -344(%rbp)
	movsd	-344(%rbp), %xmm0
	movsd	%xmm0, -80(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for1
.forNext1:
	movq	-80(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -80(%rbp)
	ucomisd	.LF1(%rip), %xmm0
	jbe	.forCont1
	ret
.forCont1:
	pop	%rax
.for1:
	# A$(I)=CHR$(65+RND(1)*10)
	# str: CHR$(65+RND(1)*10)
	# int: 65+RND(1)*10 - %rdx
	# float: 65+RND(1)*10
	# float: 65
	# int: 65 - %rsi
	movq	$65, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -344(%rbp)
	# float: RND(1)*10
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -328(%rbp)
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	-336(%rbp), %xmm1
	mulsd	%xmm1, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-344(%rbp), %xmm0
	movsd	-336(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdx
	leaq	-304(%rbp), %rcx
	call	assignChar
	# int: I - %rsi
	# float: I
	movsd	-80(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -40(%rbp)
	lea	-64(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	# NEXT I
	call	.forNext1
	# R$=""
	# str: ""
	leaq	-104(%rbp), %rcx
	leaq	-128(%rbp), %rdx
	call	assignBString
	# FOR I=0 TO 100
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	movsd	%xmm0, -80(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for2
.forNext2:
	movq	-80(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -80(%rbp)
	ucomisd	.LF2(%rip), %xmm0
	jbe	.forCont2
	ret
.forCont2:
	pop	%rax
.for2:
	# R$=R$+A$(I)
	# str: R$+A$(I)
	# str: R$
	leaq	-304(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	call	assignBString
	# str: A$(I)
	# int: I - %rsi
	# float: I
	movsd	-80(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -40(%rbp)
	lea	-64(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-280(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBStringAsConst
	leaq	-304(%rbp), %rcx
	leaq	-280(%rbp), %rdx
	call	appendBString
	leaq	-104(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	# NEXT I
	call	.forNext2
	# NEXT R
	call	.forNext0
	# TDIFF=TI-TSTART
	# float: TI-TSTART
	# float: TI
	# int: TI - %rsi
	xor	%rcx, %rcx
	call	time
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -336(%rbp)
	# float: TSTART
	movsd	-336(%rbp), %xmm1
	movsd	-32(%rbp), %xmm2
	subsd	%xmm2, %xmm1
	movsd	%xmm1, -336(%rbp)
	movsd	-336(%rbp), %xmm0
	movsd	%xmm0, -136(%rbp)
	# PRINT "TDIFF";TDIFF
	# str: "TDIFF";
	leaq	-160(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: TDIFF
	leaq	-304(%rbp), %rcx
	movsd	-136(%rbp), %xmm1
	call	assignDouble
	leaq	-304(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# PRINT "END"
	# str: "END"
	leaq	-184(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    