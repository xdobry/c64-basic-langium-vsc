
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "start"
	.byte 0
.LC1:
	.ascii "line"
	.byte 0
.LC2:
	.ascii "10"
	.byte 0
.LC3:
	.ascii " is great"
	.byte 0
.LC4:
	.ascii "Zahl"
	.byte 0
.LC5:
	.ascii "ist gleich"
	.byte 0
.LC6:
	.ascii "#"
	.byte 0
.LC7:
	.ascii "END"
	.byte 0
	.align 8
.LONE:
	.double 1.0
.LF0:
	.double 10

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$416, %rsp
	# init variable strtmp0$
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	movq	$0, -216(%rbp)
	# init variable strtmp1$
	movq	$0, -256(%rbp)
	movq	$0, -248(%rbp)
	movq	$0, -240(%rbp)
	# init variable strtmp2$
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	movq	$0, -264(%rbp)
	# init variable strtmp3$
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	# init variable strtmp4$
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	movq	$0, -312(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-376(%rbp)
	andl	$0xFFFF9FFF, -376(%rbp)
	orl	$0x2000, -376(%rbp)
	ldmxcsr	-376(%rbp)
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
	leaq	-96(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-128(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-152(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-184(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-208(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	# print "start"
	# str: "start"
	leaq	-24(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# print
	movq	$10, %rcx
	call	putchar
	# print
	movq	$10, %rcx
	call	putchar
	# print "line"
	# str: "line"
	leaq	-48(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# print "10";
	# str: "10";
	leaq	-72(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# print " is great"
	# str: " is great"
	leaq	-96(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# a=10
	# float: 10
	# int: 10 - %rsi
	movq	$10, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	movsd	%xmm0, -104(%rbp)
	# print "Zahl";a;"ist gleich"
	# str: "Zahl";
	leaq	-128(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# str: a;
	leaq	-328(%rbp), %rcx
	movsd	-104(%rbp), %xmm1
	call	assignDouble
	leaq	-328(%rbp), %rcx
	movq	$4, %rdx
	call	printBString
	leaq	-328(%rbp), %rcx
	call	freeBString
	# str: "ist gleich"
	leaq	-152(%rbp), %rcx
	movq	$8, %rdx
	call	printBString
	# for i=0to10
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -368(%rbp)
	movsd	-368(%rbp), %xmm0
	movsd	%xmm0, -160(%rbp)
# stepoffset undefined tooffset undefined
	jmp	.for0
.forNext0:
	movq	-160(%rbp), %xmm0
	addsd	.LONE(%rip), %xmm0
	ucomisd	.LF0(%rip), %xmm0
	jbe	.forCont0
	ret
.forCont0:
	movq	%xmm0, -160(%rbp)
	pop	%rax
.for0:
	# print "#";
	# str: "#";
	leaq	-184(%rbp), %rcx
	movq	$0, %rdx
	call	printBString
	# next
	call	.forNext0
	# print
	movq	$10, %rcx
	call	putchar
	# print "END"
	# str: "END"
	leaq	-208(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    