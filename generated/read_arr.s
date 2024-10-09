
	.file	"read_arr"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "READ "
	.byte 0
.LC2:
	.ascii "d"
	.byte 0
.LC3:
	.ascii "ERROR1"
	.byte 0
.LC4:
	.ascii "ERROR2"
	.byte 0
.LC5:
	.ascii "READ2 "
	.byte 0
.LC6:
	.ascii "s"
	.byte 0
.LC7:
	.ascii "A"
	.byte 0
.LC8:
	.ascii "ERROR3"
	.byte 0
.LC9:
	.ascii "C"
	.byte 0
.LC10:
	.ascii "ERROR4"
	.byte 0
.LC11:
	.ascii "A"
	.byte 0
.LC12:
	.ascii "B"
	.byte 0
.LC13:
	.ascii "C"
	.byte 0
.LC14:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
	.align 4
dataDefinition:
	.align 4
	.quad 1
	.double 1
	.quad 1
	.ascii "1"
	.align 4
	.quad 1
	.double 2
	.quad 2
	.ascii "2"
	.align 4
	.quad 1
	.double 3
	.quad 3
	.ascii "3"
	.align 4
	.quad 1
	.double 4
	.quad 4
	.ascii "4"
	.align 4
	.quad 1
	.double 5
	.quad 5
	.ascii "5"
	.align 4
	.quad 1
	.double 6
	.quad 6
	.ascii "6"
	.align 4
	.quad 1
	.double NaN
	.quad 0
	.ascii "A"
	.align 4
	.quad 1
	.double NaN
	.quad 0
	.ascii "B"
	.align 4
	.quad 1
	.double NaN
	.quad 0
	.ascii "C"

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$608, %rsp
	# init variable strtmp0$
	movq	$0, -408(%rbp)
	movq	$0, -400(%rbp)
	movq	$0, -392(%rbp)
	# init variable strtmp1$
	movq	$0, -432(%rbp)
	movq	$0, -424(%rbp)
	movq	$0, -416(%rbp)
	# init variable strtmp2$
	movq	$0, -456(%rbp)
	movq	$0, -448(%rbp)
	movq	$0, -440(%rbp)
	# init variable strtmp3$
	movq	$0, -480(%rbp)
	movq	$0, -472(%rbp)
	movq	$0, -464(%rbp)
	# init variable strtmp4$
	movq	$0, -504(%rbp)
	movq	$0, -496(%rbp)
	movq	$0, -488(%rbp)
	# init array A[] 1
	lea	-56(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# init array A$[] 1
	lea	-168(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# init data pointer
	lea	dataDefinition(%rip), %rax
	movq	%rax, -560(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-88(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-112(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-136(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-192(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-216(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-240(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-264(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-288(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-312(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-336(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-360(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-384(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# DIM A(5)
	cmpq	$0, -56(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 5 - %rsi
	movq	$5, %rsi
	movq	%rsi, -40(%rbp)
	# FOR X%=0 TO 5
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-64(%rbp), %rax
	addq	$1, %rax
	cmpq	$5, %rax
	jle	.forCont0
	ret
.forCont0:
	movq	%rax, -64(%rbp)
	pop	%rax
.for0:
	# PRINT "READ ";X%
	# str: "READ ";
	leaq	-504(%rbp), %rcx
	leaq	-88(%rbp), %rdx
	call	assignBString
	# str: X%
	leaq	-480(%rbp), %rcx
	movq	-64(%rbp), %rdx
	call	assignInt
	leaq	-504(%rbp), %rcx
	leaq	-480(%rbp), %rdx
	call	appendBString
	leaq	-480(%rbp), %rcx
	call	freeBString
	movq	-504(%rbp), %rcx
	call	puts
	leaq	-504(%rbp), %rcx
	call	freeBString
	# READ A(X%)
	leaq	-560(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	pushq	%rcx
	pushq	%rdx
	subq	$32, %rsp
	# int: X% - %rsi
	movq	-64(%rbp), %rsi
	movq	%rsi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item_ptr
	movq	%rax, %r8
	addq	$32, %rsp
	popq	%rdx
	popq	%rcx
	call	readData
	# NEXT X%
	call	.forNext0
	# IF A(0)<> 1 THEN PRINT "ERROR1"
	# int: A(0)<> 1 - %rsi
	# float: A(0)
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -544(%rbp)
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -536(%rbp)
	movsd	-544(%rbp), %xmm0
	movsd	-536(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	movq	-112(%rbp), %rcx
	call	puts
.ifnot0:
	# IF A(5)<> 6 THEN PRINT "ERROR2"
	# int: A(5)<> 6 - %rsi
	# float: A(5)
	# int: 5 - %rdi
	movq	$5, %rdi
	movq	%rdi, -32(%rbp)
	lea	-56(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -536(%rbp)
	# float: 6
	# int: 6 - %rdi
	movq	$6, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -544(%rbp)
	movsd	-536(%rbp), %xmm0
	movsd	-544(%rbp), %xmm1
	comisd	%xmm1, %xmm0
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
	# DATA 1,2,3,4,5,6
	# DIM A$(2)
	cmpq	$0, -168(%rbp)
	je	.dim_ok1
	movq	$5, %rcx
	call	c64_error
.dim_ok1:
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -152(%rbp)
	# FOR X%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -64(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for1
.forNext1:
	movq	-64(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont1
	ret
.forCont1:
	movq	%rax, -64(%rbp)
	pop	%rax
.for1:
	# PRINT "READ2 ";X%
	# str: "READ2 ";
	leaq	-504(%rbp), %rcx
	leaq	-192(%rbp), %rdx
	call	assignBString
	# str: X%
	leaq	-480(%rbp), %rcx
	movq	-64(%rbp), %rdx
	call	assignInt
	leaq	-504(%rbp), %rcx
	leaq	-480(%rbp), %rdx
	call	appendBString
	leaq	-480(%rbp), %rcx
	call	freeBString
	movq	-504(%rbp), %rcx
	call	puts
	leaq	-504(%rbp), %rcx
	call	freeBString
	# READ A$(X%)
	leaq	-560(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	pushq	%rcx
	pushq	%rdx
	subq	$32, %rsp
	# int: X% - %rsi
	movq	-64(%rbp), %rsi
	movq	%rsi, -144(%rbp)
	lea	-168(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %r8
	addq	$32, %rsp
	popq	%rdx
	popq	%rcx
	call	readData
	# NEXT X%
	call	.forNext1
	# IF A$(0)<> "A" THEN PRINT "ERROR3"
	# int: A$(0)<> "A" - %rsi
	# str: A$(0)
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, -144(%rbp)
	lea	-168(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-504(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	# str: "A"
	leaq	-504(%rbp), %rcx
	leaq	-216(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-504(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	movq	-240(%rbp), %rcx
	call	puts
.ifnot2:
	# IF A$(2)<> "C" THEN PRINT "ERROR4"
	# int: A$(2)<> "C" - %rsi
	# str: A$(2)
	# int: 2 - %rdi
	movq	$2, %rdi
	movq	%rdi, -144(%rbp)
	lea	-168(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-504(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBString
	# str: "C"
	leaq	-504(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	leaq	-504(%rbp), %rcx
	call	freeBString
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "ERROR4"
	# str: "ERROR4"
	movq	-288(%rbp), %rcx
	call	puts
.ifnot3:
	# DATA "A","B","C"
	# PRINT "END"
	# str: "END"
	movq	-384(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    