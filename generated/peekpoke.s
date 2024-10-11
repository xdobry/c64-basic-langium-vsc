
	.file	"peekpoke"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "ERROR"
	.byte 0
.LC1:
	.ascii "ERROR2"
	.byte 0
.LC2:
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
	subq	$288, %rsp
	# init variable strtmp0$
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	# init variable strtmp1$
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	# init variable strtmp2$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable strtmp3$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable strtmp4$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init peek/poke 64k memory
	movq	$1, %rcx
	movq	$65536, %rdx
	call	calloc
	movq	%rax, -248(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-240(%rbp)
	andl	$0xFFFF9FFF, -240(%rbp)
	orl	$0x2000, -240(%rbp)
	ldmxcsr	-240(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-48(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-72(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	# POKE 100,10
	# int: 100 - %rsi
	movq	$100, %rsi
	andq	$0xFFFF, %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	movq	-248(%rbp), %rax
	movb	%dil, 0(%rax,%rsi,1)
	# IF PEEK(100)<>10 THEN PRINT "ERROR"
	# int: PEEK(100)<>10 - %rsi
	# int: PEEK(100) - %rsi
	# int: 100 - %rsi
	movq	$100, %rsi
	movq	-248(%rbp), %rax
	movzb	(%rax,%rsi,1), %rsi
	# int: 10 - %rdi
	movq	$10, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# PRINT "ERROR"
	# str: "ERROR"
	movq	-24(%rbp), %rcx
	call	puts
.ifnot0:
	# POKE 101,-2
	# int: 101 - %rsi
	movq	$101, %rsi
	andq	$0xFFFF, %rsi
	# int: -2 - %rdi
	# int: 2 - %rdi
	movq	$2, %rdi
	negq	%rdi
	movq	-248(%rbp), %rax
	movb	%dil, 0(%rax,%rsi,1)
	# IF PEEK(101)<>254 THEN PRINT "ERROR2", PEEK(101)
	# int: PEEK(101)<>254 - %rsi
	# int: PEEK(101) - %rsi
	# int: 101 - %rsi
	movq	$101, %rsi
	movq	-248(%rbp), %rax
	movzb	(%rax,%rsi,1), %rsi
	# int: 254 - %rdi
	movq	$254, %rdi
	cmpq	%rdi, %rsi
	setne	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR2", PEEK(101)
	# str: "ERROR2",
	leaq	-192(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# str: PEEK(101)
	# int: PEEK(101) - %rdx
	# int: 101 - %rdx
	movq	$101, %rdx
	movq	-248(%rbp), %rax
	movzb	(%rax,%rdx,1), %rdx
	leaq	-168(%rbp), %rcx
	call	assignInt
	leaq	-192(%rbp), %rcx
	leaq	-168(%rbp), %rdx
	call	appendBString
	leaq	-168(%rbp), %rcx
	call	freeBString
	movq	-192(%rbp), %rcx
	call	puts
	leaq	-192(%rbp), %rcx
	call	freeBString
.ifnot1:
	# PRINT "END"
	# str: "END"
	movq	-72(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    