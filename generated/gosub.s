
	.file	"gosub"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "ENTER1"
	.byte 0
.LC1:
	.ascii "ENTER2"
	.byte 0
.LC2:
	.ascii "END"
	.byte 0
.LC3:
	.ascii "HA"
	.byte 0
.LC4:
	.ascii "ERROR"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 1

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$336, %rsp
	# init variable strtmp0$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp1$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp2$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# init variable strtmp3$
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	# init variable strtmp4$
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-296(%rbp)
	andl	$0xFFFF9FFF, -296(%rbp)
	orl	$0x2000, -296(%rbp)
	ldmxcsr	-296(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-56(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-80(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-104(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	# PRINT "ENTER1"
	# str: "ENTER1"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# A%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	# GOSUB mysub
	leaq	.gosubCont0(%rip), %rcx
	call	pushEntry
	jmp	.mysub
.gosubCont0:
	# PRINT "ENTER2"
	# str: "ENTER2"
	leaq	-56(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# PRINT A%
	# str: A%
	leaq	-248(%rbp), %rcx
	movq	-32(%rbp), %rdx
	call	assignInt
	leaq	-248(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-248(%rbp), %rcx
	call	freeBString
	# A%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -32(%rbp)
	# GOSUB mysub
	leaq	.gosubCont1(%rip), %rcx
	call	pushEntry
	jmp	.mysub
.gosubCont1:
	# PRINT A%
	# str: A%
	leaq	-248(%rbp), %rcx
	movq	-32(%rbp), %rdx
	call	assignInt
	leaq	-248(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-248(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	leaq	-80(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# END
	jmp	.basicend
.mysub:
	# A%=A%+10
	# int: A%+10 - %rsi
	# int: A% - %rsi
	movq	-32(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	addq	%rdi, %rsi
	movq	%rsi, -32(%rbp)
	# PRINT SIN(1.0)
	# str: SIN(1.0)
	# float: SIN(1.0)
	# float: 1.0
	movsd	.LF0(%rip), %xmm0
	call	sin
	movsd	%xmm0, -288(%rbp)
	movsd	-288(%rbp), %xmm1
	leaq	-248(%rbp), %rcx
	call	assignDouble
	leaq	-248(%rbp), %rcx
	movq	$12, %rdx
	call	printBString
	leaq	-248(%rbp), %rcx
	call	freeBString
	# PRINT "HA"
	# str: "HA"
	leaq	-104(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# RETURN
	call	popEntry
	jmp	*%rax
	# PRINT "ERROR"
	# str: "ERROR"
	leaq	-128(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    