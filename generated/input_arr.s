
	.file	"input_arr"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "STARTING INPUT"
	.byte 0
.LC1:
	.ascii "s"
	.byte 0
.LC2:
	.ascii "GIVE STRING"
	.byte 0
.LC3:
	.ascii "STR"
	.byte 0
.LC4:
	.ascii "ERROR"
	.byte 0
.LC5:
	.ascii "d"
	.byte 0
.LC6:
	.ascii "GIVE A NUMBER"
	.byte 0
.LC7:
	.ascii "ERROR1"
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
	subq	$448, %rsp
	# init variable strtmp0$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	# init variable strtmp1$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp2$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init variable strtmp3$
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	# init variable strtmp4$
	movq	$0, -352(%rbp)
	movq	$0, -344(%rbp)
	movq	$0, -336(%rbp)
	# init array A$[] 1
	lea	-80(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# init array A[] 1
	lea	-184(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-48(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-152(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-232(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	# PRINT "STARTING INPUT"
	# str: "STARTING INPUT"
	movq	-24(%rbp), %rcx
	call	puts
	# INPUT "GIVE STRING" ; A$(0)
	leaq	-48(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	pushq	%rcx
	pushq	%rdx
	subq	$32, %rsp
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -56(%rbp)
	lea	-80(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %r8
	addq	$32, %rsp
	popq	%rdx
	popq	%rcx
	call	inputData
	# PRINT A$(0)
	# str: A$(0)
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -56(%rbp)
	lea	-80(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-352(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	movq	-352(%rbp), %rcx
	call	puts
	leaq	-352(%rbp), %rcx
	call	freeBString
	# IF A$(0)<>"STR" THEN PRINT "ERROR"
	# int: A$(0)<>"STR" - %rsi
	# str: A$(0)
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, -56(%rbp)
	lea	-80(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-352(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	# str: "STR"
	leaq	-352(%rbp), %rcx
	leaq	-104(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-352(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	movq	-128(%rbp), %rcx
	call	puts
.ifnot0:
	# INPUT "GIVE A NUMBER";A(1)
	leaq	-152(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	pushq	%rcx
	pushq	%rdx
	subq	$32, %rsp
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -160(%rbp)
	lea	-184(%rbp), %rcx
	call	c64_get_item_ptr
	movq	%rax, %r8
	addq	$32, %rsp
	popq	%rdx
	popq	%rcx
	call	inputData
	# IF A(1)<>42 THEN PRINT "ERROR1"
	# int: A(1)<>42 - %rsi
	# float: A(1)
	# int: 1 - %rdi
	movq	$1, %rdi
	movq	%rdi, -160(%rbp)
	lea	-184(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -392(%rbp)
	# float: 42
	# int: 42 - %rdi
	movq	$42, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -384(%rbp)
	movsd	-392(%rbp), %xmm0
	movsd	-384(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR1"
	# str: "ERROR1"
	movq	-208(%rbp), %rcx
	call	puts
.ifnot1:
	# PRINT "END"
	# str: "END"
	movq	-232(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    