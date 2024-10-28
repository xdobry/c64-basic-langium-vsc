
	.file	"arrays"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "ERROR UNINITIALIZED VALUE NOT 0.0"
	.byte 0
.LC2:
	.ascii " X="
	.byte 0
.LC3:
	.ascii " Y="
	.byte 0
.LC4:
	.ascii " = "
	.byte 0
.LC5:
	.ascii " X="
	.byte 0
.LC6:
	.ascii " Y="
	.byte 0
.LC7:
	.ascii " = "
	.byte 0
.LC8:
	.ascii "ERROR VALUE"
	.byte 0
.LC9:
	.ascii "INT ARRAY"
	.byte 0
.LC10:
	.ascii " X="
	.byte 0
.LC11:
	.ascii " Y="
	.byte 0
.LC12:
	.ascii " = "
	.byte 0
.LC13:
	.ascii " X="
	.byte 0
.LC14:
	.ascii " Y="
	.byte 0
.LC15:
	.ascii " = "
	.byte 0
.LC16:
	.ascii "ERROR INT VALUE"
	.byte 0
.LC17:
	.ascii "STRING ARRAY"
	.byte 0
.LC18:
	.ascii "VAL"
	.byte 0
.LC19:
	.ascii " X="
	.byte 0
.LC20:
	.ascii " = "
	.byte 0
.LC21:
	.ascii "READ STR ARRAY"
	.byte 0
.LC22:
	.ascii "X="
	.byte 0
.LC23:
	.ascii " "
	.byte 0
.LC24:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 5
.LF1:
	.double 0
.LF2:
	.double 2
.LF3:
	.double 4

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$1072, %rsp
	# init variable E$
	movq	$0, -688(%rbp)
	movq	$0, -680(%rbp)
	movq	$0, -672(%rbp)
	# init variable strtmp0$
	movq	$0, -880(%rbp)
	movq	$0, -872(%rbp)
	movq	$0, -864(%rbp)
	# init variable strtmp1$
	movq	$0, -904(%rbp)
	movq	$0, -896(%rbp)
	movq	$0, -888(%rbp)
	# init variable strtmp2$
	movq	$0, -928(%rbp)
	movq	$0, -920(%rbp)
	movq	$0, -912(%rbp)
	# init variable strtmp3$
	movq	$0, -952(%rbp)
	movq	$0, -944(%rbp)
	movq	$0, -936(%rbp)
	# init variable strtmp4$
	movq	$0, -976(%rbp)
	movq	$0, -968(%rbp)
	movq	$0, -960(%rbp)
	# init array A[] 2
	lea	-72(%rbp), %rcx
	movq	$2, %rdx
	call	c64_init_array
	# init array T[] 2
	lea	-152(%rbp), %rcx
	movq	$2, %rdx
	call	c64_init_array
	# init array T%[] 2
	lea	-432(%rbp), %rcx
	movq	$2, %rdx
	call	c64_init_array
	# init array S$[] 1
	lea	-664(%rbp), %rcx
	movq	$1, %rdx
	call	c64_init_array
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-1024(%rbp)
	andl	$0xFFFF9FFF, -1024(%rbp)
	orl	$0x2000, -1024(%rbp)
	ldmxcsr	-1024(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-288(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-312(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-336(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-360(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-384(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-464(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-488(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-512(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-536(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-560(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-584(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-608(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-632(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-712(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-736(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-760(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-784(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-808(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-832(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	leaq	-856(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A(5,0)=5.0
	# float: 5.0
	# int: 5 - %rsi
	movq	$5, %rsi
	movq	%rsi, -40(%rbp)
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	lea	-72(%rbp), %rcx
	call	c64_get_item_ptr
	movq	.LF0(%rip), %rbx
	movq	%rbx, (%rax)
	# B=A(5,0)
	# float: A(5,0)
	# int: 5 - %rsi
	movq	$5, %rsi
	movq	%rsi, -40(%rbp)
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	lea	-72(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -1016(%rbp)
	movsd	-1016(%rbp), %xmm0
	movsd	%xmm0, -80(%rbp)
	# PRINT B
	# str: B
	leaq	-976(%rbp), %rcx
	movsd	-80(%rbp), %xmm1
	call	assignDouble
	leaq	-976(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# IF A(0,0)<>0.0 THEN PRINT "ERROR UNINITIALIZED VALUE NOT 0.0"
	# int: A(0,0)<>0.0 - %rsi
	# float: A(0,0)
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, -40(%rbp)
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	%rdi, -32(%rbp)
	lea	-72(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -1016(%rbp)
	# float: 0.0
	movsd	-1016(%rbp), %xmm0
	movsd	.LF1(%rip), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR UNINITIALIZED VALUE NOT 0.0"
	# str: "ERROR UNINITIALIZED VALUE NOT 0.0"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot0:
	# DIM T(2,4)
	cmpq	$0, -152(%rbp)
	je	.dim_ok0
	movq	$5, %rcx
	call	c64_error
.dim_ok0:
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -136(%rbp)
	# int: 4 - %rsi
	movq	$4, %rsi
	movq	%rsi, -128(%rbp)
	# FOR X=0 TO 2
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1016(%rbp)
	movsd	-1016(%rbp), %xmm0
	movsd	%xmm0, -160(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-160(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -160(%rbp)
	ucomisd	.LF2(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	pop	%rax
.for0:
	# FOR Y=0 TO 4
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1016(%rbp)
	movsd	-1016(%rbp), %xmm0
	movsd	%xmm0, -168(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for1
.forNext1:
	movq	-168(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -168(%rbp)
	ucomisd	.LF3(%rip), %xmm0
	jbe	.forCont1
	ret
.forCont1:
	pop	%rax
.for1:
	# V = X*10+Y
	# float: X*10+Y
	# float: X*10
	# float: X
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1016(%rbp)
	movsd	-160(%rbp), %xmm1
	movsd	-1016(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -1016(%rbp)
	# float: Y
	movsd	-1016(%rbp), %xmm1
	movsd	-168(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1016(%rbp)
	movsd	-1016(%rbp), %xmm0
	movsd	%xmm0, -176(%rbp)
	# PRINT " X=",X," Y=",Y," = ",V
	# str: " X=",
	leaq	-200(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X,
	leaq	-976(%rbp), %rcx
	movsd	-160(%rbp), %xmm1
	call	assignDouble
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " Y=",
	leaq	-224(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: Y,
	leaq	-976(%rbp), %rcx
	movsd	-168(%rbp), %xmm1
	call	assignDouble
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " = ",
	leaq	-248(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: V
	leaq	-976(%rbp), %rcx
	movsd	-176(%rbp), %xmm1
	call	assignDouble
	leaq	-976(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# T(X,Y) = V
	# float: V
	# int: X - %rsi
	# float: X
	movsd	-160(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -120(%rbp)
	# int: Y - %rsi
	# float: Y
	movsd	-168(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	movq	%rsi, -112(%rbp)
	lea	-152(%rbp), %rcx
	call	c64_get_item_ptr
	movq	-176(%rbp), %rbx
	movq	%rbx, (%rax)
	# NEXT Y,X
	call	.forNext1
	call	.forNext0
	# FOR X%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for2
.forNext2:
	movq	-256(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -256(%rbp)
	cmpq	$2, %rax
	jle	.forCont2
	ret
.forCont2:
	pop	%rax
.for2:
	# FOR Y%=0 TO 4
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -264(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for3
.forNext3:
	movq	-264(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -264(%rbp)
	cmpq	$4, %rax
	jle	.forCont3
	ret
.forCont3:
	pop	%rax
.for3:
	# V = X%*10+Y%
	# float: X%*10+Y%
	# float: X%*10
	# float: X%
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1016(%rbp)
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1008(%rbp)
	movsd	-1016(%rbp), %xmm1
	movsd	-1008(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -1008(%rbp)
	# float: Y%
	# int: Y% - %rsi
	movq	-264(%rbp), %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1016(%rbp)
	movsd	-1008(%rbp), %xmm1
	movsd	-1016(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1016(%rbp)
	movsd	-1016(%rbp), %xmm0
	movsd	%xmm0, -176(%rbp)
	# PRINT " X=",X%," Y=",Y%," = ",T(X%,Y%)
	# str: " X=",
	leaq	-288(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X%,
	leaq	-976(%rbp), %rcx
	movq	-256(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " Y=",
	leaq	-312(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: Y%,
	leaq	-976(%rbp), %rcx
	movq	-264(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " = ",
	leaq	-336(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: T(X%,Y%)
	# float: T(X%,Y%)
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	movq	%rsi, -120(%rbp)
	# int: Y% - %rsi
	movq	-264(%rbp), %rsi
	movq	%rsi, -112(%rbp)
	lea	-152(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -1016(%rbp)
	movsd	-1016(%rbp), %xmm1
	leaq	-976(%rbp), %rcx
	call	assignDouble
	leaq	-976(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# IF V<>T(X%,Y%) THEN PRINT "ERROR VALUE"
	# int: V<>T(X%,Y%) - %rsi
	# float: V
	# float: T(X%,Y%)
	# int: X% - %rdi
	movq	-256(%rbp), %rdi
	movq	%rdi, -120(%rbp)
	# int: Y% - %rdi
	movq	-264(%rbp), %rdi
	movq	%rdi, -112(%rbp)
	lea	-152(%rbp), %rcx
	call	c64_get_item
	movq	%rax, -1016(%rbp)
	movsd	-176(%rbp), %xmm0
	movsd	-1016(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR VALUE"
	# str: "ERROR VALUE"
	leaq	-360(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:
	# NEXT Y%,X%
	call	.forNext3
	call	.forNext2
	# PRINT "INT ARRAY"
	# str: "INT ARRAY"
	leaq	-384(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DIM T%(2,4)
	cmpq	$0, -432(%rbp)
	je	.dim_ok1
	movq	$5, %rcx
	call	c64_error
.dim_ok1:
	# int: 2 - %rsi
	movq	$2, %rsi
	movq	%rsi, -416(%rbp)
	# int: 4 - %rsi
	movq	$4, %rsi
	movq	%rsi, -408(%rbp)
	# FOR X%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for4
.forNext4:
	movq	-256(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -256(%rbp)
	cmpq	$2, %rax
	jle	.forCont4
	ret
.forCont4:
	pop	%rax
.for4:
	# FOR Y%=0 TO 4
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -264(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for5
.forNext5:
	movq	-264(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -264(%rbp)
	cmpq	$4, %rax
	jle	.forCont5
	ret
.forCont5:
	pop	%rax
.for5:
	# V% = X%*10+Y%
	# int: X%*10+Y% - %rsi
	# int: X%*10 - %rsi
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	imulq	%rdi, %rsi
	# int: Y% - %rdi
	movq	-264(%rbp), %rdi
	addq	%rdi, %rsi
	movq	%rsi, -440(%rbp)
	# PRINT " X=",X%," Y=",Y%," = ",V%
	# str: " X=",
	leaq	-464(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X%,
	leaq	-976(%rbp), %rcx
	movq	-256(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " Y=",
	leaq	-488(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: Y%,
	leaq	-976(%rbp), %rcx
	movq	-264(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " = ",
	leaq	-512(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: V%
	leaq	-976(%rbp), %rcx
	movq	-440(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# T%(X%,Y%) = V%
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	movq	%rsi, -400(%rbp)
	# int: Y% - %rsi
	movq	-264(%rbp), %rsi
	movq	%rsi, -392(%rbp)
	lea	-432(%rbp), %rcx
	call	c64_get_item_ptr
	movq	%rax, %rsi
	# int: V% - %rdi
	movq	-440(%rbp), %rdi
	movq	%rdi, (%rsi)
	# NEXT Y%,X%
	call	.forNext5
	call	.forNext4
	# FOR X%=0 TO 2
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for6
.forNext6:
	movq	-256(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -256(%rbp)
	cmpq	$2, %rax
	jle	.forCont6
	ret
.forCont6:
	pop	%rax
.for6:
	# FOR Y%=0 TO 4
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -264(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for7
.forNext7:
	movq	-264(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -264(%rbp)
	cmpq	$4, %rax
	jle	.forCont7
	ret
.forCont7:
	pop	%rax
.for7:
	# V% = X%*10+Y%
	# int: X%*10+Y% - %rsi
	# int: X%*10 - %rsi
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	imulq	%rdi, %rsi
	# int: Y% - %rdi
	movq	-264(%rbp), %rdi
	addq	%rdi, %rsi
	movq	%rsi, -440(%rbp)
	# PRINT " X=",X%," Y=",Y%," = ",V%
	# str: " X=",
	leaq	-536(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X%,
	leaq	-976(%rbp), %rcx
	movq	-256(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " Y=",
	leaq	-560(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: Y%,
	leaq	-976(%rbp), %rcx
	movq	-264(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " = ",
	leaq	-584(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: V%
	leaq	-976(%rbp), %rcx
	movq	-440(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# IF V%<>T%(X%,Y%) THEN PRINT "ERROR INT VALUE"
	# int: V%<>T%(X%,Y%) - %rsi
	# int: V% - %rsi
	movq	-440(%rbp), %rsi
	# int: T%(X%,Y%) - %rdi
	# int: X% - %r12
	movq	-256(%rbp), %r12
	movq	%r12, -400(%rbp)
	# int: Y% - %r12
	movq	-264(%rbp), %r12
	movq	%r12, -392(%rbp)
	lea	-432(%rbp), %rcx
	call	c64_get_item
	movq	%rax, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR INT VALUE"
	# str: "ERROR INT VALUE"
	leaq	-608(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot2:
	# NEXT Y%,X%
	call	.forNext7
	call	.forNext6
	# PRINT "STRING ARRAY"
	# str: "STRING ARRAY"
	leaq	-632(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# DIM S$(15)
	cmpq	$0, -664(%rbp)
	je	.dim_ok2
	movq	$5, %rcx
	call	c64_error
.dim_ok2:
	# int: 15 - %rsi
	movq	$15, %rsi
	movq	%rsi, -648(%rbp)
	# FOR X%=0 TO 15
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for8
.forNext8:
	movq	-256(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -256(%rbp)
	cmpq	$15, %rax
	jle	.forCont8
	ret
.forCont8:
	pop	%rax
.for8:
	# E$="VAL"+CHR$(65+X%)
	# str: "VAL"+CHR$(65+X%)
	# str: "VAL"
	leaq	-976(%rbp), %rcx
	leaq	-712(%rbp), %rdx
	call	assignBString
	# str: CHR$(65+X%)
	# int: 65+X% - %rdx
	# int: 65 - %rdx
	movq	$65, %rdx
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	addq	%rsi, %rdx
	leaq	-952(%rbp), %rcx
	call	assignChar
	leaq	-976(%rbp), %rcx
	leaq	-952(%rbp), %rdx
	call	appendBString
	leaq	-688(%rbp), %rcx
	leaq	-976(%rbp), %rdx
	call	assignBString
	# PRINT " X=",X%," = ",E$
	# str: " X=",
	leaq	-736(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X%,
	leaq	-976(%rbp), %rcx
	movq	-256(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " = ",
	leaq	-760(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: E$
	leaq	-688(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# S$(X%)=E$
	# str: E$
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	movq	%rsi, -640(%rbp)
	lea	-664(%rbp), %rcx
	call	c64_get_str_item_ptr
	movq	%rax, %rcx
	leaq	-688(%rbp), %rdx
	call	assignBString
	# NEXT X%
	call	.forNext8
	# PRINT "READ STR ARRAY"
	# str: "READ STR ARRAY"
	leaq	-784(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# FOR X%=0 TO 15
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -256(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for9
.forNext9:
	movq	-256(%rbp), %rax
	addq	$1, %rax
	movq	%rax, -256(%rbp)
	cmpq	$15, %rax
	jle	.forCont9
	ret
.forCont9:
	pop	%rax
.for9:
	# PRINT "X=",X%," ",S$(X%)
	# str: "X=",
	leaq	-808(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: X%,
	leaq	-976(%rbp), %rcx
	movq	-256(%rbp), %rdx
	call	assignInt
	leaq	-976(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: " ",
	leaq	-832(%rbp), %rcx
	movq	$1, %rdx
	call	printBString
	# str: S$(X%)
	# int: X% - %rsi
	movq	-256(%rbp), %rsi
	movq	%rsi, -640(%rbp)
	lea	-664(%rbp), %rcx
	call	c64_get_str_item_ptr
	leaq	-976(%rbp), %rcx
	movq	%rax, %rdx
	call	assignBStringAsConst
	leaq	-976(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# NEXT X%
	call	.forNext9
	# PRINT "END"
	# str: "END"
	leaq	-856(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    