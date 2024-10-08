
	.file	"compile"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
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
	subq	$256, %rsp
	# init variable strtmp0$
	movq	$0, -72(%rbp)
	movq	$0, -64(%rbp)
	movq	$0, -56(%rbp)
	# init variable strtmp1$
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	# init variable strtmp2$
	movq	$0, -120(%rbp)
	movq	$0, -112(%rbp)
	movq	$0, -104(%rbp)
	# init variable strtmp3$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable strtmp4$
	movq	$0, -168(%rbp)
	movq	$0, -160(%rbp)
	movq	$0, -152(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-48(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# PRINT "END"
	# str: "END"
	movq	-48(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    