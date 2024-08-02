
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

    .section .bss
.buffer:
    .zero 2048
    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$80, %rsp
	# PRINT "ENTER1"
	leaq	.LC0(%rip), %rcx
	call	puts
	# A%=0
	movq	$0, %rax
	movq	%rax, -8(%rbp)
	# GOSUB mysub
	call	.mysub
	# PRINT "ENTER2"
	leaq	.LC1(%rip), %rcx
	call	puts
	# PRINT A%
	movq	-8(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-48(%rbp), %rcx
	call	puts
	# A%=1
	movq	$1, %rax
	movq	%rax, -8(%rbp)
	# GOSUB mysub
	call	.mysub
	# PRINT A%
	movq	-8(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movl	$10, %r8d
	call	itoa
	leaq	-48(%rbp), %rcx
	call	puts
	# PRINT "END"
	leaq	.LC2(%rip), %rcx
	call	puts
	# END
	jmp	.basicend
	jmp	.jumpover0
.mysub:
	subq	$32, %rsp
.jumpover0:
	# A%=A%+10
	movq	-8(%rbp), %rax
	movq	$10, %rbx
	addq	%rbx, %rax
	movq	%rax, -8(%rbp)
	# PRINT "HA"
	leaq	.LC3(%rip), %rcx
	call	puts
	# RETURN
	addq	$32, %rsp
	ret

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    