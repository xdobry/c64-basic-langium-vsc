
	.file	"crunch"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "test"
	.byte 0
.LC1:
	.ascii "d"
	.byte 0
.LC2:
	.ascii "pause"
	.byte 0
.LC3:
	.ascii "test"
	.byte 0
.LC4:
	.ascii "END"
	.byte 0
.LC5:
	.ascii "true"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 20
# jump tables for goto and gosub
.jt0:
	.quad .line15
	.quad .line16
.jt1:
	.quad .line15
	.quad .line16

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$384, %rsp
	# init variable strtmp0$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init variable strtmp1$
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	# init variable strtmp2$
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	# init variable strtmp3$
	movq	$0, -264(%rbp)
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	# init variable strtmp4$
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-336(%rbp)
	andl	$0xFFFF9FFF, -336(%rbp)
	orl	$0x2000, -336(%rbp)
	ldmxcsr	-336(%rbp)
	 # init bstring constants
	leaq	-40(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-168(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	# c=3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
	# a=3
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# printa,"test"
	# str: a,
	leaq	-288(%rbp), %rcx
	movsd	-16(%rbp), %xmm1
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: "test"
	leaq	-40(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# a=4
	# float: 4
	# int: 4 - %rsi
	movq	$4, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
	# inputa
	xor	%rcx, %rcx
	leaq	.LC1(%rip), %rdx
	leaq	-16(%rbp), %r8
	call	inputData
	# printa+2
	# str: a+2
	# float: a+2
	# float: a
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-16(%rbp), %xmm0
	movsd	-328(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm1
	leaq	-288(%rbp), %rcx
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# goto15
	jmp	.line15
	# b=a
	# float: a
	movsd	-16(%rbp), %xmm0
	movsd	%xmm0, -48(%rbp)
	# goto15
	jmp	.line15
	# deffnf(x)=x+1
	leaq	.defn_exprf_0(%rip), %rax
	movq	%rax, -56(%rbp)
	jmp	.defn_endf_0
.defn_exprf_0:
	subq	$40, %rsp
	# float: x+1
	# float: x
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-64(%rbp), %xmm0
	movsd	-328(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endf_0:
	# print"pause"
	# str: "pause"
	leaq	-96(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# deffnf(x)=x+2
	leaq	.defn_exprf_1(%rip), %rax
	movq	%rax, -56(%rbp)
	jmp	.defn_endf_1
.defn_exprf_1:
	subq	$40, %rsp
	# float: x+2
	# float: x
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-64(%rbp), %xmm0
	movsd	-328(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	addq	$40, %rsp
	ret
.defn_endf_1:
	# printfnf(3)
	# str: fnf(3)
	# float: fnf(3)
	# float: 3
	# int: 3 - %rsi
	movq	$3, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
	movq	-56(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm1
	leaq	-288(%rbp), %rcx
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# c=fnf(2)
	# float: fnf(2)
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -64(%rbp)
	movq	-56(%rbp), %rax
	call	*%rax
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
.line15:
	# print"test"
	# str: "test"
	leaq	-120(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.line16:
	# printc,b+1,1+2+3
	# str: c,
	leaq	-288(%rbp), %rcx
	movsd	-8(%rbp), %xmm1
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: b+1,
	# float: b+1,
	# float: b
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-48(%rbp), %xmm0
	movsd	-328(%rbp), %xmm1
	addsd	%xmm1, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm1
	leaq	-288(%rbp), %rcx
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$5, %rdx
	call	printBString
	# str: 1+2+3
	# int: 1+2+3 - %rdx
	# int: 1+2 - %rdx
	# int: 1 - %rdx
	movq	$1, %rdx
	# int: 2 - %rsi
	movq	$2, %rsi
	addq	%rsi, %rdx
	# int: 3 - %rsi
	movq	$3, %rsi
	addq	%rsi, %rdx
	leaq	-288(%rbp), %rcx
	call	assignInt
	leaq	-288(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# print"END"
	# str: "END"
	leaq	-144(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# end
	jmp	.basicend
	# gosub15
	leaq	.gosubCont0(%rip), %rcx
	call	pushEntry
	jmp	.line15
.gosubCont0:
	# ifa>0thengoto15
	# int: a>0 - %rsi
	# float: a
	# float: 0
	# int: 0 - %rdi
	movq	$0, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-16(%rbp), %xmm0
	movsd	-328(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# goto15
	jmp	.line15
.ifnot0:
	# onagoto 15,16
	# int: a - %rsi
	# float: a
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd1
	cmpq	$2, %rsi
	ja	.gotoEnd1
	decq	%rsi
	jmp	*.jt0(,%rsi,8)
.gotoEnd1:
	# onagosub 15,16
	leaq	.gotoEnd2(%rip), %rcx
	call	pushEntry
	# int: a - %rsi
	# float: a
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	jle	.gotoEnd2
	cmpq	$2, %rsi
	ja	.gotoEnd2
	decq	%rsi
	jmp	*.jt1(,%rsi,8)
.gotoEnd2:
	# fora=2to20
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -328(%rbp)
	movsd	-328(%rbp), %xmm0
	movsd	%xmm0, -16(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-16(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	movq	%xmm0, -16(%rbp)
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	pop	%rax
.for0:
	# printa
	# str: a
	leaq	-288(%rbp), %rcx
	movsd	-16(%rbp), %xmm1
	call	assignDouble
	leaq	-288(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	# next
	call	.forNext0
	# ifathenprint"true"
	# int: a - %rsi
	# float: a
	movsd	-16(%rbp), %xmm0
	cvtsd2siq	%xmm0, %rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# print"true"
	# str: "true"
	leaq	-168(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
.ifnot1:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    