
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "testero"
	.byte 0
.LC1:
	.ascii "proertt"
	.byte 0
.LC2:
	.ascii "tetttt"
	.byte 0
.LC3:
	.ascii "vpwrert"
	.byte 0
.LC4:
	.ascii " "
	.byte 0
.LC5:
	.ascii ", "
	.byte 0
	.align 8
.LONE:
	.double 1.0

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$528, %rsp
	# init variable f$
	movq	$0, -24(%rbp)
	movq	$0, -16(%rbp)
	movq	$0, -8(%rbp)
	# init variable m$
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	movq	$0, -56(%rbp)
	# init variable l$
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	# init variable b$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	# init variable n$
	movq	$0, -216(%rbp)
	movq	$0, -208(%rbp)
	movq	$0, -200(%rbp)
	# init variable strtmp0$
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	movq	$0, -272(%rbp)
	# init variable strtmp1$
	movq	$0, -312(%rbp)
	movq	$0, -304(%rbp)
	movq	$0, -296(%rbp)
	# init variable strtmp2$
	movq	$0, -336(%rbp)
	movq	$0, -328(%rbp)
	movq	$0, -320(%rbp)
	# init variable strtmp3$
	movq	$0, -360(%rbp)
	movq	$0, -352(%rbp)
	movq	$0, -344(%rbp)
	# init variable strtmp4$
	movq	$0, -384(%rbp)
	movq	$0, -376(%rbp)
	movq	$0, -368(%rbp)
	# init variable strtmp5$
	movq	$0, -408(%rbp)
	movq	$0, -400(%rbp)
	movq	$0, -392(%rbp)
	# init variable strtmp6$
	movq	$0, -432(%rbp)
	movq	$0, -424(%rbp)
	movq	$0, -416(%rbp)
	# set rounding mode to floor to be compatible with c64 rounding
	stmxcsr	-480(%rbp)
	andl	$0xFFFF9FFF, -480(%rbp)
	orl	$0x2000, -480(%rbp)
	ldmxcsr	-480(%rbp)
	 # init bstring constants
	leaq	-48(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-96(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-144(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-192(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-240(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-264(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	# f$="testero"
	# str: "testero"
	leaq	-24(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	call	assignBString
	# m$="proertt"
	# str: "proertt"
	leaq	-72(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	call	assignBString
	# l$="tetttt"
	# str: "tetttt"
	leaq	-120(%rbp), %rcx
	leaq	-144(%rbp), %rdx
	call	assignBString
	# b$="vpwrert"
	# str: "vpwrert"
	leaq	-168(%rbp), %rcx
	leaq	-192(%rbp), %rdx
	call	assignBString
	# n$=left$(f$,3)+left$(l$,2)+" "+left$(m$,2)+left$(b$,3)+", "
	# str: left$(f$,3)+left$(l$,2)+" "+left$(m$,2)+left$(b$,3)+", "
	# str: left$(f$,3)+left$(l$,2)+" "+left$(m$,2)+left$(b$,3)
	# str: left$(f$,3)+left$(l$,2)+" "+left$(m$,2)
	# str: left$(f$,3)+left$(l$,2)+" "
	# str: left$(f$,3)+left$(l$,2)
	# str: left$(f$,3)
	# str: f$
	# int: 3 - %r8
	movq	$3, %r8
	leaq	-312(%rbp), %rcx
	leaq	-24(%rbp), %rdx
	call	bstrLeft
	leaq	-336(%rbp), %rcx
	leaq	-312(%rbp), %rdx
	call	assignBString
	leaq	-312(%rbp), %rcx
	call	freeBString
	# str: left$(l$,2)
	# str: l$
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-312(%rbp), %rcx
	leaq	-120(%rbp), %rdx
	call	bstrLeft
	leaq	-336(%rbp), %rcx
	leaq	-312(%rbp), %rdx
	call	appendBString
	leaq	-312(%rbp), %rcx
	call	freeBString
	leaq	-360(%rbp), %rcx
	leaq	-336(%rbp), %rdx
	call	assignBString
	leaq	-336(%rbp), %rcx
	call	freeBString
	# str: " "
	leaq	-360(%rbp), %rcx
	leaq	-240(%rbp), %rdx
	call	appendBString
	leaq	-384(%rbp), %rcx
	leaq	-360(%rbp), %rdx
	call	assignBString
	leaq	-360(%rbp), %rcx
	call	freeBString
	# str: left$(m$,2)
	# str: m$
	# int: 2 - %r8
	movq	$2, %r8
	leaq	-360(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	bstrLeft
	leaq	-384(%rbp), %rcx
	leaq	-360(%rbp), %rdx
	call	appendBString
	leaq	-360(%rbp), %rcx
	call	freeBString
	leaq	-408(%rbp), %rcx
	leaq	-384(%rbp), %rdx
	call	assignBString
	leaq	-384(%rbp), %rcx
	call	freeBString
	# str: left$(b$,3)
	# str: b$
	# int: 3 - %r8
	movq	$3, %r8
	leaq	-384(%rbp), %rcx
	leaq	-168(%rbp), %rdx
	call	bstrLeft
	leaq	-408(%rbp), %rcx
	leaq	-384(%rbp), %rdx
	call	appendBString
	leaq	-384(%rbp), %rcx
	call	freeBString
	leaq	-432(%rbp), %rcx
	leaq	-408(%rbp), %rdx
	call	assignBString
	leaq	-408(%rbp), %rcx
	call	freeBString
	# str: ", "
	leaq	-432(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	call	appendBString
	leaq	-216(%rbp), %rcx
	leaq	-432(%rbp), %rdx
	call	assignBString
	leaq	-432(%rbp), %rcx
	call	freeBString
	# print n$
	# str: n$
	leaq	-216(%rbp), %rcx
	movq	$8, %rdx
	call	printBString

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    