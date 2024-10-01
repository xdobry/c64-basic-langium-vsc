
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
	.align 8
.LONE:
	.double 1.0

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$320, %rsp
	# init variable strtmp0$
	movq	$0, -128(%rbp)
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	# init variable strtmp1$
	movq	$0, -152(%rbp)
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	# init variable strtmp2$
	movq	$0, -176(%rbp)
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	# init variable strtmp3$
	movq	$0, -200(%rbp)
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	# init variable strtmp4$
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
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
	# PRINT "ENTER1"
	# str: "ENTER1"
	movq	-24(%rbp), %rcx
	call	puts
	# A%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -32(%rbp)
	# GOSUB mysub
	call	.mysub
	# PRINT "ENTER2"
	# str: "ENTER2"
	movq	-56(%rbp), %rcx
	call	puts
	# PRINT A%
	# str: A%
	leaq	-128(%rbp), %rcx
	movq	-32(%rbp), %rdx
	call	assignInt
	movq	-128(%rbp), %rcx
	call	puts
	leaq	-128(%rbp), %rcx
	call	freeBString
	# A%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -32(%rbp)
	# GOSUB mysub
	call	.mysub
	# PRINT A%
	# str: A%
	leaq	-128(%rbp), %rcx
	movq	-32(%rbp), %rdx
	call	assignInt
	movq	-128(%rbp), %rcx
	call	puts
	leaq	-128(%rbp), %rcx
	call	freeBString
	# PRINT "END"
	# str: "END"
	movq	-80(%rbp), %rcx
	call	puts
	# END
	jmp	.basicend
	jmp	.jumpover0
.mysub:
	subq	$32, %rsp
.jumpover0:
	# A%=A%+10
	# int: A%+10 - %rsi
	# int: A% - %rsi
	movq	-32(%rbp), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	addq	%rdi, %rsi
	movq	%rsi, -32(%rbp)
	# PRINT "HA"
	# str: "HA"
	movq	-104(%rbp), %rcx
	call	puts
	# RETURN
	addq	$32, %rsp
	ret

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    