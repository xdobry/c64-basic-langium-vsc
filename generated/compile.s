
	.file	"compile"
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
	.double -1
.LF6:
	.double -2
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
	.double -1
.LF13:
	.double 0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$960, %rsp
	# init variable strtmp0$
	movq	$0, -776(%rbp)
	movq	$0, -768(%rbp)
	movq	$0, -760(%rbp)
	# init variable strtmp1$
	movq	$0, -800(%rbp)
	movq	$0, -792(%rbp)
	movq	$0, -784(%rbp)
	# init variable strtmp2$
	movq	$0, -824(%rbp)
	movq	$0, -816(%rbp)
	movq	$0, -808(%rbp)
	# init variable strtmp3$
	movq	$0, -848(%rbp)
	movq	$0, -840(%rbp)
	movq	$0, -832(%rbp)
	# init variable strtmp4$
	movq	$0, -872(%rbp)
	movq	$0, -864(%rbp)
	movq	$0, -856(%rbp)
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
	leaq	-640(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-680(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-712(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-752(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	# FOR A=0.0 TO 2.0 STEP 1.0
	movsd	.LF0(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -8 tooffset -16
	movsd	.LF2(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext0
	# FOR A=2.0 TO 0.0 STEP -1.0
	movsd	.LF3(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -56 tooffset -64
	movsd	.LF5(%rip), %xmm0
	movsd	%xmm0, -56(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-88(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext1
	# FOR A=-2.0 TO 2.0 STEP 1.0
	movsd	.LF6(%rip), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -96 tooffset -104
	movsd	.LF8(%rip), %xmm0
	movsd	%xmm0, -96(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-128(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext2
	# FOR A%=0 TO 2
	movq	$0, %rbx
	movq	%rbx, -136(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-160(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext3
	# PRINT " REAL 0 to 2.0"
	movq	-184(%rbp), %rcx
	call	puts
	# FOR A=0 TO 2.0
	movq	$0, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset undefined tooffset -192
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
	leaq	-776(%rbp), %rcx
	leaq	-216(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext4
	# A=0
	movq	$0, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
	# PRINT " REAL 0 to 2"
	movq	-240(%rbp), %rcx
	call	puts
	# FOR A=0 TO 2
	movq	$0, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
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
	leaq	-776(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext5
	# PRINT " REAL 0 to 3 STEP 0.5 VARS"
	movq	-288(%rbp), %rcx
	call	puts
	# S=0.5
	movsd	.LF11(%rip), %xmm0
	movsd	%xmm0, -296(%rbp)
	# T=3
	movq	$3, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -304(%rbp)
	# FOR A=0 TO T STEP S
	movq	$0, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -312 tooffset -320
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -312(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-344(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT
	call	.forNext6
	# PRINT " STEP 2"
	movq	-368(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 10 STEP 2
	movq	$0, %rbx
	movq	%rbx, -136(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-392(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext7
	# S%=3
	movq	$3, %rax
	movq	%rax, -400(%rbp)
	# FOR A%=0 TO S%*3 STEP S%
	movq	$0, %rbx
	movq	%rbx, -136(%rbp)
# stepoffset -408 tooffset -416
	movq	-400(%rbp), %rax
	movq	%rax, -408(%rbp)
	movq	-400(%rbp), %rax
	movq	$3, %rbx
	imulq	%rbx, %rax
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
	leaq	-776(%rbp), %rcx
	leaq	-440(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext8
	# PRINT " NESTED 2 NEXT"
	movq	-464(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 2
	movq	$0, %rbx
	movq	%rbx, -136(%rbp)
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
	movq	$0, %rbx
	movq	%rbx, -472(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-496(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	leaq	-776(%rbp), %rcx
	leaq	-520(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	movq	-472(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT B%
	call	.forNext10
	# NEXT A%
	call	.forNext9
	# PRINT " NESTED NEXT WITH 2 VARIABLES"
	movq	-544(%rbp), %rcx
	call	puts
	# FOR A%=0 TO 2
	movq	$0, %rbx
	movq	%rbx, -136(%rbp)
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
	movq	$0, %rbx
	movq	%rbx, -472(%rbp)
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
	leaq	-776(%rbp), %rcx
	leaq	-568(%rbp), %rdx
	call	assignBString
	leaq	-800(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	leaq	-776(%rbp), %rcx
	leaq	-592(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	movq	-472(%rbp), %rdx
	call	assignInt
	leaq	-776(%rbp), %rcx
	leaq	-800(%rbp), %rdx
	call	appendBString
	leaq	-800(%rbp), %rcx
	call	freeBString
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT B%, A%
	call	.forNext12
	call	.forNext11
	# PRINT " REVERSE FLOAT LOOP"
	movq	-616(%rbp), %rcx
	call	puts
	# FOR A=10 TO 0 STEP -1
	movq	$10, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for13
.forNext13:
	movq	-24(%rbp), %xmm0
	addsd	.LF12(%rip), %xmm0
	ucomisd	.LF13(%rip), %xmm0
	jnb	.forCont13
	ret
.forCont13:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for13:
	# PRINT A
	leaq	-776(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A
	call	.forNext13
	# S=-1
	movq	$-1, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -296(%rbp)
	# T=0
	movq	$0, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -304(%rbp)
	# PRINT " REVERSE FLOAT LOOP2"
	movq	-640(%rbp), %rcx
	call	puts
	# FOR A=10 TO T STEP S
	movq	$10, %rbx
	cvtsi2sdq	%rbx, %xmm0
	movsd	%xmm0, -880(%rbp)
	movsd	-880(%rbp), %xmm0
	movsd	%xmm0, -24(%rbp)
# stepoffset -648 tooffset -656
	movsd	-296(%rbp), %xmm0
	movsd	%xmm0, -648(%rbp)
	movsd	-304(%rbp), %xmm0
	movsd	%xmm0, -656(%rbp)
	jmp	.for14
.forNext14:
	movq	-24(%rbp), %xmm0
	addsd	-648(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	comisd	-648(%rbp), %xmm1
	ja	.forStepNeg14
	ucomisd	-656(%rbp), %xmm0
	jbe	.forCont14
	ret
.forStepNeg14:
	ucomisd	-656(%rbp), %xmm0
	jnb	.forCont14
	ret
.forCont14:
	movq	%xmm0, -24(%rbp)
	pop	%rax
.for14:
	# PRINT A
	leaq	-776(%rbp), %rcx
	movsd	-24(%rbp), %xmm1
	call	assignDouble
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A
	call	.forNext14
	# PRINT " REVERSE INT LOOP2"
	movq	-680(%rbp), %rcx
	call	puts
	# FOR A%=10 TO 0 STEP -1
	movq	$10, %rbx
	movq	%rbx, -136(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for15
.forNext15:
	movq	-136(%rbp), %rax
	addq	$-1, %rax
	cmpq	$0, %rax
	jge	.forCont15
	ret
.forCont15:
	movq	%rax, -136(%rbp)
	pop	%rax
.for15:
	# PRINT A%
	leaq	-776(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext15
	# S%=-1
	movq	$-1, %rax
	movq	%rax, -400(%rbp)
	# T%=0
	movq	$0, %rax
	movq	%rax, -688(%rbp)
	# PRINT " REVERSE INT LOOP3"
	movq	-712(%rbp), %rcx
	call	puts
	# FOR A%=10 TO T% STEP S%
	movq	$10, %rbx
	movq	%rbx, -136(%rbp)
# stepoffset -720 tooffset -728
	movq	-400(%rbp), %rax
	movq	%rax, -720(%rbp)
	movq	-688(%rbp), %rax
	movq	%rax, -728(%rbp)
	jmp	.for16
.forNext16:
	movq	-136(%rbp), %rax
	addq	-720(%rbp), %rax
	cmpq	$0, -720(%rbp)
	js	.forStepNeg16
	cmpq	-728(%rbp), %rax
	jle	.forCont16
	ret
.forStepNeg16:
	cmpq	-728(%rbp), %rax
	jge	.forCont16
	ret
.forCont16:
	movq	%rax, -136(%rbp)
	pop	%rax
.for16:
	# PRINT A%
	leaq	-776(%rbp), %rcx
	movq	-136(%rbp), %rdx
	call	assignInt
	movq	-776(%rbp), %rcx
	call	puts
	leaq	-776(%rbp), %rcx
	call	freeBString
	# NEXT A%
	call	.forNext16
	# PRINT "END"
	movq	-752(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    