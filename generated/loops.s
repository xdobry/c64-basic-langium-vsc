
	.file	"loops"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "FLOAT "
	.byte 0
.LC1:
	.ascii "FLOAT "
	.byte 0
.LC2:
	.ascii "FLOAT "
	.byte 0
.LC3:
	.ascii "INT "
	.byte 0
.LC4:
	.ascii " REAL 0 to 2.0"
	.byte 0
.LC5:
	.ascii "REAL "
	.byte 0
.LC6:
	.ascii " REAL 0 to 2"
	.byte 0
.LC7:
	.ascii "REAL 2 "
	.byte 0
.LC8:
	.ascii " REAL 0 to 3 STEP 0.5 VARS"
	.byte 0
.LC9:
	.ascii "REAL 3 "
	.byte 0
.LC10:
	.ascii " STEP 2"
	.byte 0
.LC11:
	.ascii "STEP-2 "
	.byte 0
.LC12:
	.ascii "STEP-b2 "
	.byte 0
.LC13:
	.ascii " NESTED 2 NEXT"
	.byte 0
.LC14:
	.ascii "A="
	.byte 0
.LC15:
	.ascii " B="
	.byte 0
.LC16:
	.ascii " NESTED NEXT WITH 2 VARIABLES"
	.byte 0
.LC17:
	.ascii "A="
	.byte 0
.LC18:
	.ascii " B="
	.byte 0
.LC19:
	.ascii " REVERSE FLOAT LOOP"
	.byte 0
.LC20:
	.ascii " REVERSE FLOAT LOOP2"
	.byte 0
.LC21:
	.ascii " REVERSE INT LOOP2"
	.byte 0
.LC22:
	.ascii " REVERSE INT LOOP3"
	.byte 0
.LC23:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 0
.LF1:
	.double 2
.LF2:
	.double 1
.LF3:
	.double 2
.LF4:
	.double 0
.LF5:
	.double 1
.LF6:
	.double 2
.LF7:
	.double 2
.LF8:
	.double 1
.LF9:
	.double 2
.LF10:
	.double 2
.LF11:
	.double 0.5
.LF12:
	.double 0

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$976, %rsp
	# init variable strtmp0$
	movq	$0, -792(%rbp)
	movq	$0, -784(%rbp)
	movq	$0, -776(%rbp)
	# init variable strtmp1$
	movq	$0, -816(%rbp)
	movq	$0, -808(%rbp)
	movq	$0, -800(%rbp)
	# init variable strtmp2$
	movq	$0, -840(%rbp)
	movq	$0, -832(%rbp)
	movq	$0, -824(%rbp)
	# init variable strtmp3$
	movq	$0, -864(%rbp)
	movq	$0, -856(%rbp)
	movq	$0, -848(%rbp)
	# init variable strtmp4$
	movq	$0, -888(%rbp)
	movq	$0, -880(%rbp)
	movq	$0, -872(%rbp)
	 # init bstring constants
	leaq	-48(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-88(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-160(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-216(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-240(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-264(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-288(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-344(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-368(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-392(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-440(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-464(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-496(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-520(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-544(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-568(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-592(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-616(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-648(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-688(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-728(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-768(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	# FOR A=0.0 TO 2.0 STEP 1.0
	# float: 0.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -8 tooffset -16
	# float: 1.0
	movsd	.LF2(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	# float: 2.0
	movsd	.LF1(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	jmp	.for0
.forNext0:
	movq	-24(%rbp), %xmm0
	addsd	-8(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-8(%rbp), %xmm1
	ja	.forStepNeg0
	ucomisd	-16(%rbp), %xmm0
	jbe	.forCont0
	ret
.forStepNeg0:
	ucomisd	-16(%rbp), %xmm0
	jnb	.forCont0
	ret
.forCont0:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for0:
	# PRINT "FLOAT ",A
	# str: "FLOAT ",
	leaq	-888(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext0
	# FOR A=2.0 TO 0.0 STEP -1.0
	# float: 2.0
	movsd	.LF3(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -56 tooffset -64
	# float: -1.0
	# float: 1.0
	movsd	.LF5(%rip), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -56(%rbp)
	# float: 0.0
	movsd	.LF4(%rip), %xmm0
	movsd	%xmm0, -64(%rbp)
	jmp	.for1
.forNext1:
	movq	-24(%rbp), %xmm0
	addsd	-56(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-56(%rbp), %xmm1
	ja	.forStepNeg1
	ucomisd	-64(%rbp), %xmm0
	jbe	.forCont1
	ret
.forStepNeg1:
	ucomisd	-64(%rbp), %xmm0
	jnb	.forCont1
	ret
.forCont1:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for1:
	# PRINT "FLOAT ",A
	# str: "FLOAT ",
	leaq	-888(%rbp), %rcx
	leaq	-88(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext1
	# FOR A=-2.0 TO 2.0 STEP 1.0
	# float: -2.0
	# float: 2.0
	movsd	.LF6(%rip), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -96 tooffset -104
	# float: 1.0
	movsd	.LF8(%rip), %xmm0
	movsd	%xmm0, -96(%rbp)
	# float: 2.0
	movsd	.LF7(%rip), %xmm0
	movsd	%xmm0, -104(%rbp)
	jmp	.for2
.forNext2:
	movq	-24(%rbp), %xmm0
	addsd	-96(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-96(%rbp), %xmm1
	ja	.forStepNeg2
	ucomisd	-104(%rbp), %xmm0
	jbe	.forCont2
	ret
.forStepNeg2:
	ucomisd	-104(%rbp), %xmm0
	jnb	.forCont2
	ret
.forCont2:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for2:
	# PRINT "FLOAT ",A
	# str: "FLOAT ",
	leaq	-888(%rbp), %rcx
	leaq	-128(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext2
	# FOR A%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for3
.forNext3:
	movq	-136(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont3
	ret
.forCont3:
	movq	%rax, -136(%rbp)
	pop	%rax
.for3:
	# PRINT "INT ",A%
	# str: "INT ",
	leaq	-888(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	assignBString
	# str: A%
	leaq	-864(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext3
	# PRINT " REAL 0 to 2.0"
	# str: " REAL 0 to 2.0"
	movq	-184(%rbp), %rcx
	call	puts
	# FOR A=0 TO 2.0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset undefined tooffset -192
	# float: 2.0
	movsd	.LF9(%rip), %xmm0
	movsd	%xmm0, -192(%rbp)
	jmp	.for4
.forNext4:
	movq	-24(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	-192(%rbp), %xmm0
	jbe	.forCont4
	ret
.forCont4:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for4:
	# PRINT "REAL ",A
	# str: "REAL ",
	leaq	-888(%rbp), %rcx
	leaq	-216(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext4
	# A=0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
	# PRINT " REAL 0 to 2"
	# str: " REAL 0 to 2"
	movq	-240(%rbp), %rcx
	call	puts
	# FOR A=0 TO 2
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for5
.forNext5:
	movq	-24(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	.LF10(%rip), %xmm0
	jbe	.forCont5
	ret
.forCont5:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for5:
	# PRINT "REAL 2 ",A
	# str: "REAL 2 ",
	leaq	-888(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext5
	# PRINT " REAL 0 to 3 STEP 0.5 VARS"
	# str: " REAL 0 to 3 STEP 0.5 VARS"
	movq	-288(%rbp), %rcx
	call	puts
	# S=0.5
	# float: 0.5
	movsd	.LF11(%rip), %xmm0
	movsd	%xmm0, -296(%rbp)
	# T=3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -304(%rbp)
	# FOR A=0 TO T STEP S
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -312 tooffset -320
	# float: S
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -312(%rbp)
	# float: T
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -320(%rbp)
	jmp	.for6
.forNext6:
	movq	-24(%rbp), %xmm0
	addsd	-312(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-312(%rbp), %xmm1
	ja	.forStepNeg6
	ucomisd	-320(%rbp), %xmm0
	jbe	.forCont6
	ret
.forStepNeg6:
	ucomisd	-320(%rbp), %xmm0
	jnb	.forCont6
	ret
.forCont6:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for6:
	# PRINT "REAL 3 ",A
	# str: "REAL 3 ",
	leaq	-888(%rbp), %rcx
	leaq	-344(%rbp), %rdx
	call	assignBString
	# str: A
	leaq	-864(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext6
	# PRINT " STEP 2"
	# str: " STEP 2"
	movq	-368(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 10 STEP 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for7
.forNext7:
	movq	-136(%rbp), %rax
	addq	$2, %rax
	cmpq	$10, %rax
	jle	.forCont7
	ret
.forCont7:
	movq	%rax, -136(%rbp)
	pop	%rax
.for7:
	# PRINT "STEP-2 ",A%
	# str: "STEP-2 ",
	leaq	-888(%rbp), %rcx
	leaq	-392(%rbp), %rdx
	call	assignBString
	# str: A%
	leaq	-864(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext7
	# S%=3
	# int: 3 - %rsi
	movq	$3, %rsi
	movq	%rsi, -400(%rbp)
	# FOR A%=0 TO S%*3 STEP S%
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset -408 tooffset -416
	# int: S% - %rax
	movq	-400(%rbp), %rax
	movq	%rax, -408(%rbp)
	# int: S%*3 - %rax
	# int: S% - %rax
	movq	-400(%rbp), %rax
	# int: 3 - %rsi
	movq	$3, %rsi
	imulq	%rsi, %rax
	movq	%rax, -416(%rbp)
	jmp	.for8
.forNext8:
	movq	-136(%rbp), %rax
	addq	-408(%rbp), %rax
	cmpq	$0, -408(%rbp)
	js	.forStepNeg8
	cmpq	-416(%rbp), %rax
	jle	.forCont8
	ret
.forStepNeg8:
	cmpq	-416(%rbp), %rax
	jge	.forCont8
	ret
.forCont8:
	movq	%rax, -136(%rbp)
	pop	%rax
.for8:
	# PRINT "STEP-b2 ",A%
	# str: "STEP-b2 ",
	leaq	-888(%rbp), %rcx
	leaq	-440(%rbp), %rdx
	call	assignBString
	# str: A%
	leaq	-864(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext8
	# PRINT " NESTED 2 NEXT"
	# str: " NESTED 2 NEXT"
	movq	-464(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for9
.forNext9:
	movq	-136(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont9
	ret
.forCont9:
	movq	%rax, -136(%rbp)
	pop	%rax
.for9:
	# FOR B%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -472(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for10
.forNext10:
	movq	-472(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont10
	ret
.forCont10:
	movq	%rax, -472(%rbp)
	pop	%rax
.for10:
	# PRINT "A=",A%," B=",B%
	# str: "A=",
	leaq	-888(%rbp), %rcx
	leaq	-496(%rbp), %rdx
	call	assignBString
	# str: A%,
	leaq	-864(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	# str: " B=",
	leaq	-888(%rbp), %rcx
	leaq	-520(%rbp), %rdx
	call	appendBString
	# str: B%
	leaq	-864(%rbp), %rcx
	movq	-472(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT B%
	call	.forNext10
	# NEXT A%
	call	.forNext9
	# PRINT " NESTED NEXT WITH 2 VARIABLES"
	# str: " NESTED NEXT WITH 2 VARIABLES"
	movq	-544(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for11
.forNext11:
	movq	-136(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont11
	ret
.forCont11:
	movq	%rax, -136(%rbp)
	pop	%rax
.for11:
	# FOR B%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -472(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for12
.forNext12:
	movq	-472(%rbp), %rax
	addq	$1, %rax
	cmpq	$2, %rax
	jle	.forCont12
	ret
.forCont12:
	movq	%rax, -472(%rbp)
	pop	%rax
.for12:
	# PRINT "A=",A%," B=",B%
	# str: "A=",
	leaq	-888(%rbp), %rcx
	leaq	-568(%rbp), %rdx
	call	assignBString
	# str: A%,
	leaq	-864(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	# str: " B=",
	leaq	-888(%rbp), %rcx
	leaq	-592(%rbp), %rdx
	call	appendBString
	# str: B%
	leaq	-864(%rbp), %rcx
	movq	-472(%rbp), %rdx
	call	assignInt
	leaq	-888(%rbp), %rcx
	leaq	-864(%rbp), %rdx
	call	appendBString
	leaq	-864(%rbp), %rcx
	call	freeBString
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT B%, A%
	call	.forNext12
	call	.forNext11
	# PRINT " REVERSE FLOAT LOOP"
	# str: " REVERSE FLOAT LOOP"
	movq	-616(%rbp), %rcx
	call	puts
	# FOR A=10 TO 0 STEP -1
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -624 tooffset undefined
	# float: -1
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -920(%rbp)
	movsd	-920(%rbp), %xmm0
	movsd	%xmm0, -624(%rbp)
	jmp	.for13
.forNext13:
	movq	-24(%rbp), %xmm0
	addsd	-624(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-624(%rbp), %xmm1
	ja	.forStepNeg13
	ucomisd	.LF12(%rip), %xmm0
	jbe	.forCont13
	ret
.forStepNeg13:
	ucomisd	.LF12(%rip), %xmm0
	jnb	.forCont13
	ret
.forCont13:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for13:
	# PRINT A
	# str: A
	leaq	-888(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A
	call	.forNext13
	# S=-1
	# float: -1
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -920(%rbp)
	movsd	-920(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -296(%rbp)
	# T=0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -304(%rbp)
	# PRINT " REVERSE FLOAT LOOP2"
	# str: " REVERSE FLOAT LOOP2"
	movq	-648(%rbp), %rcx
	call	puts
	# FOR A=10 TO T STEP S
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -928(%rbp)
	movsd	-928(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -656 tooffset -664
	# float: S
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -656(%rbp)
	# float: T
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -664(%rbp)
	jmp	.for14
.forNext14:
	movq	-24(%rbp), %xmm0
	addsd	-656(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-656(%rbp), %xmm1
	ja	.forStepNeg14
	ucomisd	-664(%rbp), %xmm0
	jbe	.forCont14
	ret
.forStepNeg14:
	ucomisd	-664(%rbp), %xmm0
	jnb	.forCont14
	ret
.forCont14:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for14:
	# PRINT A
	# str: A
	leaq	-888(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A
	call	.forNext14
	# PRINT " REVERSE INT LOOP2"
	# str: " REVERSE INT LOOP2"
	movq	-688(%rbp), %rcx
	call	puts
	# FOR A%=10 TO 0 STEP -1
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset -696 tooffset undefined
	# int: -1 - %rax
	# int: 1 - %rax
	movq	$1, %rax
	negq	%rax
	movq	%rax, -696(%rbp)
	jmp	.for15
.forNext15:
	movq	-136(%rbp), %rax
	addq	-696(%rbp), %rax
	cmpq	$0, -696(%rbp)
	js	.forStepNeg15
	cmpq	$0, %rax
	jle	.forCont15
	ret
.forStepNeg15:
	cmpq	$0, %rax
	jge	.forCont15
	ret
.forCont15:
	movq	%rax, -136(%rbp)
	pop	%rax
.for15:
	# PRINT A%
	# str: A%
	leaq	-888(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext15
	# S%=-1
	# int: -1 - %rsi
	# int: 1 - %rsi
	movq	$1, %rsi
	negq	%rsi
	movq	%rsi, -400(%rbp)
	# T%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -704(%rbp)
	# PRINT " REVERSE INT LOOP3"
	# str: " REVERSE INT LOOP3"
	movq	-728(%rbp), %rcx
	call	puts
	# FOR A%=10 TO T% STEP S%
	# int: 10 - %rsi
	movq	$10, %rsi
	movq	%rsi, -136(%rbp)
# stepoffset -736 tooffset -744
	# int: S% - %rax
	movq	-400(%rbp), %rax
	movq	%rax, -736(%rbp)
	# int: T% - %rax
	movq	-704(%rbp), %rax
	movq	%rax, -744(%rbp)
	jmp	.for16
.forNext16:
	movq	-136(%rbp), %rax
	addq	-736(%rbp), %rax
	cmpq	$0, -736(%rbp)
	js	.forStepNeg16
	cmpq	-744(%rbp), %rax
	jle	.forCont16
	ret
.forStepNeg16:
	cmpq	-744(%rbp), %rax
	jge	.forCont16
	ret
.forCont16:
	movq	%rax, -136(%rbp)
	pop	%rax
.for16:
	# PRINT A%
	# str: A%
	leaq	-888(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	movq	-888(%rbp), %rcx
	call	puts
	leaq	-888(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext16
	# PRINT "END"
	# str: "END"
	movq	-768(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    