
	.file	"deffn"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR1"
	.byte 0
.LC2:
	.ascii "ERROR2"
	.byte 0
.LC3:
	.ascii "ERROR3"
	.byte 0
.LC4:
	.ascii "COMPLEX CASES"
	.byte 0
.LC5:
	.ascii "CALL INT FN WIHT FLOAT: "
	.byte 0
.LC6:
	.ascii "CALL FLOAT FN WIHT INT: "
	.byte 0
.LC7:
	.ascii "NESTED FLOAT COMPLEX: "
	.byte 0
.LC8:
	.ascii "R1 "
	.byte 0
.LC9:
	.ascii "I1 "
	.byte 0
.LC10:
	.ascii "I2 "
	.byte 0
.LC11:
	.ascii "NESTED INT "
	.byte 0
.LC12:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 2
.LF1:
	.double 3
.LF2:
	.double 2
.LF3:
	.double 1
.LF4:
	.double 1
.LF5:
	.double 2

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$672, %rsp
	# init variable strtmp0$
	movq	$0, -480(%rbp)
	movq	$0, -472(%rbp)
	movq	$0, -464(%rbp)
	# init variable strtmp1$
	movq	$0, -504(%rbp)
	movq	$0, -496(%rbp)
	movq	$0, -488(%rbp)
	# init variable strtmp2$
	movq	$0, -528(%rbp)
	movq	$0, -520(%rbp)
	movq	$0, -512(%rbp)
	# init variable strtmp3$
	movq	$0, -552(%rbp)
	movq	$0, -544(%rbp)
	movq	$0, -536(%rbp)
	# init variable strtmp4$
	movq	$0, -576(%rbp)
	movq	$0, -568(%rbp)
	movq	$0, -560(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-304(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-360(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-384(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-408(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-432(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-456(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# A%=10
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -32(%rbp)
	# DEF FN C(X%) = A%+X%
	leaq	.defn_exprC_0(%rip), %rax
	movq	%rax, -40(%rbp)
	jmp	.defn_endC_0
.defn_exprC_0:
	subq	$40, %rsp
	# int: A%+X% - %rax
	# int: A% - %rax
	movq	-32(%rbp), %rax
	# int: X% - %rsi
	movq	-48(%rbp), %rsi
	addq	%rsi, %rax
	addq	$40, %rsp
	ret
.defn_endC_0:
	# P%=10
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -64(%rbp)
	# D% = FN C(P%)
	# int: FN C(P%) - %rsi
	# int: P% - %rdi
	movq	-64(%rbp), %rdi
	movq	%rdi, -48(%rbp)
	movq	-40(%rbp), %rax
	call	*%rax
	movq	%rax, %rsi
	movq	%rsi, -72(%rbp)
	# PRINT D%
	# str: D%
	leaq	-480(%rbp), %rcx
	movq	-72(%rbp), %rdx
	call	assignInt
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# IF D%<>20 THEN PRINT "ERROR1"
	# int: D%<>20 - %rsi
	# int: D% - %rsi
	movq	-72(%rbp), %rsi
	# int: 20 - %rdi
	movq	$20, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR1"
	# str: "ERROR1"
	movq	-96(%rbp), %rcx
	call	puts
.ifnot0:
	# DEF FN C(X%) = X%+1
	leaq	.defn_exprC_1(%rip), %rax
	movq	%rax, -40(%rbp)
	jmp	.defn_endC_1
.defn_exprC_1:
	subq	$40, %rsp
	# int: X%+1 - %rax
	# int: X% - %rax
	movq	-48(%rbp), %rax
	# int: 1 - %rsi
	movq	$1, %rsi
	addq	%rsi, %rax
	addq	$40, %rsp
	ret
.defn_endC_1:
	# PRINT FN C(2)
	# str: FN C(2)
	# int: FN C(2) - %rdx
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -48(%rbp)
	movq	-40(%rbp), %rax
	call	*%rax
	movq	%rax, %rdx
	leaq	-480(%rbp), %rcx
	call	assignInt
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# IF FN C(2)<>3 THEN PRINT "ERROR2"
	# int: FN C(2)<>3 - %rsi
	# int: FN C(2) - %rsi
	# int: 2 - %rdi
	movq	$2, %rdi
	movq	%rdi, -48(%rbp)
	movq	-40(%rbp), %rax
	call	*%rax
	movq	%rax, %rsi
	# int: 3 - %rdi
	movq	$3, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2"
	# str: "ERROR2"
	movq	-120(%rbp), %rcx
	call	puts
.ifnot1:
	# DEF FN C1(X) = 2.0+X
	leaq	.defn_exprC1_2(%rip), %rax
	movq	%rax, -128(%rbp)
	jmp	.defn_endC1_2
.defn_exprC1_2:
	subq	$40, %rsp
	# float: 2.0+X
	# float: 2.0
	# float: X
	movsd	.LF0(%rip), %xmm0
	movsd	-136(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endC1_2:
	# F=FN C1(3.0)
	# float: FN C1(3.0)
	# float: 3.0
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -136(%rbp)
	movq	-128(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	%xmm0, -152(%rbp)
	# PRINT F
	# str: F
	leaq	-480(%rbp), %rcx
	movsd	-152(%rbp), %xmm1
	call	assignDouble
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# IF F<>5 THEN PRINT "ERROR3"
	# int: F<>5 - %rsi
	# float: F
	# float: 5
	# int: 5 - %rdi
	movq	$5, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-152(%rbp), %xmm0
	movsd	-584(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR3"
	# str: "ERROR3"
	movq	-176(%rbp), %rcx
	call	puts
.ifnot2:
	# PRINT "COMPLEX CASES"
	# str: "COMPLEX CASES"
	movq	-200(%rbp), %rcx
	call	puts
	# PRINT "CALL INT FN WIHT FLOAT: ";FN C(2.0+SIN(1.0))
	# str: "CALL INT FN WIHT FLOAT: ";
	leaq	-480(%rbp), %rcx
	leaq	-224(%rbp), %rdx
	call	assignBString
	# str: FN C(2.0+SIN(1.0))
	# int: FN C(2.0+SIN(1.0)) - %rdx
	# int: 2.0+SIN(1.0) - %rsi
	# int: 2.0 - %rsi
	# float: 2.0
	movsd	.LF2(%rip), %xmm0
	cvtsd2siq	%xmm0, %rsi
	# int: SIN(1.0) - %rdi
	# float: SIN(1.0)
	# float: 1.0
	movsd	.LF3(%rip), %xmm0
	call	sin
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rdi
	addq	%rdi, %rsi
	movq	%rsi, -48(%rbp)
	movq	-40(%rbp), %rax
	call	*%rax
	movq	%rax, %rdx
	leaq	-504(%rbp), %rcx
	call	assignInt
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# PRINT "CALL FLOAT FN WIHT INT: ";FN C1(A%)
	# str: "CALL FLOAT FN WIHT INT: ";
	leaq	-480(%rbp), %rcx
	leaq	-248(%rbp), %rdx
	call	assignBString
	# str: FN C1(A%)
	# float: FN C1(A%)
	# float: A%
	# int: A% - %rsi
	movq	-32(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	%xmm0, -136(%rbp)
	movq	-128(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm1
	leaq	-504(%rbp), %rcx
	call	assignDouble
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# DEF FN R1(X) = SIN(X)+COS(X)
	leaq	.defn_exprR1_3(%rip), %rax
	movq	%rax, -256(%rbp)
	jmp	.defn_endR1_3
.defn_exprR1_3:
	subq	$40, %rsp
	# float: SIN(X)+COS(X)
	# float: SIN(X)
	# float: X
	movsd	-264(%rbp), %xmm0
	call	sin
	movsd	%xmm0, -584(%rbp)
	# float: COS(X)
	# float: X
	movsd	-264(%rbp), %xmm0
	call	cos
	movsd	%xmm0, -592(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	-592(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endR1_3:
	# DEF FN R2(X) = FN R1(X) / FN R1(X)
	leaq	.defn_exprR2_4(%rip), %rax
	movq	%rax, -272(%rbp)
	jmp	.defn_endR2_4
.defn_exprR2_4:
	subq	$40, %rsp
	# float: FN R1(X) / FN R1(X)
	# float: FN R1(X)
	# float: X
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -264(%rbp)
	movq	-256(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	# float: FN R1(X)
	# float: X
	movsd	-280(%rbp), %xmm0
	movsd	%xmm0, -264(%rbp)
	movq	-256(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -592(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	-592(%rbp), %xmm1
	divsd	%xmm1, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endR2_4:
	# PRINT "NESTED FLOAT COMPLEX: "; FN R2(1.0)
	# str: "NESTED FLOAT COMPLEX: ";
	leaq	-480(%rbp), %rcx
	leaq	-304(%rbp), %rdx
	call	assignBString
	# str: FN R2(1.0)
	# float: FN R2(1.0)
	# float: 1.0
	movsd	.LF4(%rip), %xmm0
	movsd	%xmm0, -280(%rbp)
	movq	-272(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm1
	leaq	-504(%rbp), %rcx
	call	assignDouble
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# DEF FN I1(X%) = X%+FN R1(X%)
	leaq	.defn_exprI1_5(%rip), %rax
	movq	%rax, -312(%rbp)
	jmp	.defn_endI1_5
.defn_exprI1_5:
	subq	$40, %rsp
	# int: X%+FN R1(X%) - %rax
	# int: X% - %rax
	movq	-320(%rbp), %rax
	# int: FN R1(X%) - %rsi
	# float: FN R1(X%)
	# float: X%
	# int: X% - %rdi
	movq	-320(%rbp), %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	%xmm0, -264(%rbp)
	movq	-256(%rbp), %rax
	pushq	%rsi
	pushq	%rax
	subq	$32, %rsp
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	popq	%rax
	popq	%rsi
	addq	$32, %rsp
	movsd	-584(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	addq	%rsi, %rax
	addq	$40, %rsp
	ret
.defn_endI1_5:
	# DEF FN I2(X%) = (X%+1)/FN I1(X%)
	leaq	.defn_exprI2_6(%rip), %rax
	movq	%rax, -328(%rbp)
	jmp	.defn_endI2_6
.defn_exprI2_6:
	subq	$40, %rsp
	# int: (X%+1)/FN I1(X%) - %rax
	# int: (X%+1) - %rax
	# int: X%+1 - %rax
	# int: X% - %rax
	movq	-336(%rbp), %rax
	# int: 1 - %rsi
	movq	$1, %rsi
	addq	%rsi, %rax
	# int: FN I1(X%) - %rsi
	# int: X% - %rdi
	movq	-336(%rbp), %rdi
	movq	%rdi, -320(%rbp)
	movq	-312(%rbp), %rax
	call	*%rax
	movq	%rax, %rsi
	movq	%rax, %rax
	cqto
	idivq	%rsi
	movq	%rax, %rax
	addq	$40, %rsp
	ret
.defn_endI2_6:
	# PRINT "R1 "; FN R1(10)
	# str: "R1 ";
	leaq	-480(%rbp), %rcx
	leaq	-360(%rbp), %rdx
	call	assignBString
	# str: FN R1(10)
	# float: FN R1(10)
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm0
	movsd	%xmm0, -264(%rbp)
	movq	-256(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm1
	leaq	-504(%rbp), %rcx
	call	assignDouble
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# PRINT "I1 "; FN I1(10)
	# str: "I1 ";
	leaq	-480(%rbp), %rcx
	leaq	-384(%rbp), %rdx
	call	assignBString
	# str: FN I1(10)
	# int: FN I1(10) - %rdx
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -320(%rbp)
	movq	-312(%rbp), %rax
	call	*%rax
	movq	%rax, %rdx
	leaq	-504(%rbp), %rcx
	call	assignInt
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# PRINT "I2 "; FN I2(10)
	# str: "I2 ";
	leaq	-480(%rbp), %rcx
	leaq	-408(%rbp), %rdx
	call	assignBString
	# str: FN I2(10)
	# int: FN I2(10) - %rdx
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -336(%rbp)
	movq	-328(%rbp), %rax
	call	*%rax
	movq	%rax, %rdx
	leaq	-504(%rbp), %rcx
	call	assignInt
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# PRINT "NESTED INT "; 2.0+FN I2(A%)
	# str: "NESTED INT ";
	leaq	-480(%rbp), %rcx
	leaq	-432(%rbp), %rdx
	call	assignBString
	# str: 2.0+FN I2(A%)
	# float: 2.0+FN I2(A%)
	# float: 2.0
	# float: FN I2(A%)
	# int: FN I2(A%) - %rsi
	# int: A% - %rdi
	movq	-32(%rbp), %rdi
	movq	%rdi, -336(%rbp)
	movq	-328(%rbp), %rax
	call	*%rax
	movq	%rax, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	.LF5(%rip), %xmm0
	movsd	-584(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -584(%rbp)
	movsd	-584(%rbp), %xmm1
	leaq	-504(%rbp), %rcx
	call	assignDouble
	leaq	-480(%rbp), %rcx
	leaq	-504(%rbp), %rdx
	call	appendBString
	leaq	-504(%rbp), %rcx
	call	freeBString
	movq	-480(%rbp), %rcx
	call	puts
	leaq	-480(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-456(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    