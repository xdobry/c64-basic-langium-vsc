
	.file	"strcmp"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "START"
	.byte 0
.LC1:
	.ascii "TESTA"
	.byte 0
.LC2:
	.ascii "TESTB"
	.byte 0
.LC3:
	.ascii "TESTA1"
	.byte 0
.LC4:
	.ascii ""
	.byte 0
.LC5:
	.ascii "TESTB"
	.byte 0
.LC6:
	.ascii "TESTA"
	.byte 0
.LC7:
	.ascii "COMPARE"
	.byte 0
.LC8:
	.ascii "ERROR EQ"
	.byte 0
.LC9:
	.ascii "ERROR EMPTY CMP"
	.byte 0
.LC10:
	.ascii "OK1"
	.byte 0
.LC11:
	.ascii ""
	.byte 0
.LC12:
	.ascii "ERROR EQ"
	.byte 0
.LC13:
	.ascii "OK2"
	.byte 0
.LC14:
	.ascii "ERROR >"
	.byte 0
.LC15:
	.ascii "OK3"
	.byte 0
.LC16:
	.ascii "ERROR >="
	.byte 0
.LC17:
	.ascii "OK4"
	.byte 0
.LC18:
	.ascii "ERROR >"
	.byte 0
.LC19:
	.ascii "ERROR <="
	.byte 0
.LC20:
	.ascii "ERROR > EMPTY"
	.byte 0
.LC21:
	.ascii "ERROR < EMPTY"
	.byte 0
.LC22:
	.ascii "ERROR > LEN"
	.byte 0
.LC23:
	.ascii "ERROR < LEN"
	.byte 0
.LC24:
	.ascii "ERROR = LEN"
	.byte 0
.LC25:
	.ascii "ERROR >= LEN"
	.byte 0
.LC26:
	.ascii "ERROR <= LEN"
	.byte 0
.LC27:
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
	subq	$1056, %rsp
	# init variable A$
	movq	$0, -48(%rbp)
	movq	$0, -40(%rbp)
	movq	$0, -32(%rbp)
	# init variable B$
	movq	$0, -96(%rbp)
	movq	$0, -88(%rbp)
	movq	$0, -80(%rbp)
	# init variable A1$
	movq	$0, -144(%rbp)
	movq	$0, -136(%rbp)
	movq	$0, -128(%rbp)
	# init variable C$
	movq	$0, -192(%rbp)
	movq	$0, -184(%rbp)
	movq	$0, -176(%rbp)
	# init variable D$
	movq	$0, -240(%rbp)
	movq	$0, -232(%rbp)
	movq	$0, -224(%rbp)
	# init variable AA$
	movq	$0, -296(%rbp)
	movq	$0, -288(%rbp)
	movq	$0, -280(%rbp)
	# init variable NSET$
	movq	$0, -440(%rbp)
	movq	$0, -432(%rbp)
	movq	$0, -424(%rbp)
	# init variable strtmp0$
	movq	$0, -872(%rbp)
	movq	$0, -864(%rbp)
	movq	$0, -856(%rbp)
	# init variable strtmp1$
	movq	$0, -896(%rbp)
	movq	$0, -888(%rbp)
	movq	$0, -880(%rbp)
	# init variable strtmp2$
	movq	$0, -920(%rbp)
	movq	$0, -912(%rbp)
	movq	$0, -904(%rbp)
	# init variable strtmp3$
	movq	$0, -944(%rbp)
	movq	$0, -936(%rbp)
	movq	$0, -928(%rbp)
	# init variable strtmp4$
	movq	$0, -968(%rbp)
	movq	$0, -960(%rbp)
	movq	$0, -952(%rbp)
	 # init bstring constants
	leaq	-24(%rbp), %rcx
	leaq	.LC0(%rip), %rdx
	call	assignFromConst
	leaq	-72(%rbp), %rcx
	leaq	.LC1(%rip), %rdx
	call	assignFromConst
	leaq	-120(%rbp), %rcx
	leaq	.LC2(%rip), %rdx
	call	assignFromConst
	leaq	-168(%rbp), %rcx
	leaq	.LC3(%rip), %rdx
	call	assignFromConst
	leaq	-216(%rbp), %rcx
	leaq	.LC4(%rip), %rdx
	call	assignFromConst
	leaq	-264(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-320(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-344(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-368(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-392(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-416(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-464(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-488(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-512(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-536(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-560(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-584(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-608(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-632(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-656(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-680(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-704(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-728(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-752(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	leaq	-776(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	leaq	-800(%rbp), %rcx
	leaq	.LC25(%rip), %rdx
	call	assignFromConst
	leaq	-824(%rbp), %rcx
	leaq	.LC26(%rip), %rdx
	call	assignFromConst
	leaq	-848(%rbp), %rcx
	leaq	.LC27(%rip), %rdx
	call	assignFromConst
	# PRINT "START"
	# str: "START"
	movq	-24(%rbp), %rcx
	call	puts
	# A$="TESTA"
	# str: "TESTA"
	leaq	-48(%rbp), %rcx
	leaq	-72(%rbp), %rdx
	call	assignBString
	# B$="TESTB"
	# str: "TESTB"
	leaq	-96(%rbp), %rcx
	leaq	-120(%rbp), %rdx
	call	assignBString
	# A1$="TESTA1"
	# str: "TESTA1"
	leaq	-144(%rbp), %rcx
	leaq	-168(%rbp), %rdx
	call	assignBString
	# C$=""
	# str: ""
	leaq	-192(%rbp), %rcx
	leaq	-216(%rbp), %rdx
	call	assignBString
	# D$="TESTB"
	# str: "TESTB"
	leaq	-240(%rbp), %rcx
	leaq	-264(%rbp), %rdx
	call	assignBString
	# I%=0
	# int: 0 - %rsi
	movq	$0, %rsi
	movq	%rsi, -272(%rbp)
	# AA$="TESTA"
	# str: "TESTA"
	leaq	-296(%rbp), %rcx
	leaq	-320(%rbp), %rdx
	call	assignBString
	# PRINT "COMPARE"
	# str: "COMPARE"
	movq	-344(%rbp), %rcx
	call	puts
	# IF A$=AA$ THEN LET I%=1
	# int: A$=AA$ - %rsi
	# str: A$
	# str: AA$
	leaq	-48(%rbp), %rcx
	leaq	-296(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot0
	# LET I%=1
	# int: 1 - %rsi
	movq	$1, %rsi
	movq	%rsi, -272(%rbp)
.ifnot0:
	# IF I%=0 THEN PRINT "ERROR EQ"
	# int: I%=0 - %rsi
	# int: I% - %rsi
	movq	-272(%rbp), %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	cmpq	%rdi, %rsi
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot1
	# PRINT "ERROR EQ"
	# str: "ERROR EQ"
	movq	-368(%rbp), %rcx
	call	puts
.ifnot1:
	# IF C$<>NSET$ THEN PRINT "ERROR EMPTY CMP"
	# int: C$<>NSET$ - %rsi
	# str: C$
	# str: NSET$
	leaq	-192(%rbp), %rcx
	leaq	-440(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT "ERROR EMPTY CMP"
	# str: "ERROR EMPTY CMP"
	movq	-392(%rbp), %rcx
	call	puts
.ifnot2:
	# IF C$=NSET$ THEN PRINT "OK1"
	# int: C$=NSET$ - %rsi
	# str: C$
	# str: NSET$
	leaq	-192(%rbp), %rcx
	leaq	-440(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# PRINT "OK1"
	# str: "OK1"
	movq	-416(%rbp), %rcx
	call	puts
.ifnot3:
	# NSET$=""
	# str: ""
	leaq	-440(%rbp), %rcx
	leaq	-464(%rbp), %rdx
	call	assignBString
	# IF A$=B$ THEN PRINT "ERROR EQ"
	# int: A$=B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# PRINT "ERROR EQ"
	# str: "ERROR EQ"
	movq	-488(%rbp), %rcx
	call	puts
.ifnot4:
	# IF A$<>B$ THEN PRINT "OK2"
	# int: A$<>B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# PRINT "OK2"
	# str: "OK2"
	movq	-512(%rbp), %rcx
	call	puts
.ifnot5:
	# IF A$>B$ THEN PRINT "ERROR >"
	# int: A$>B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$3, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# PRINT "ERROR >"
	# str: "ERROR >"
	movq	-536(%rbp), %rcx
	call	puts
.ifnot6:
	# IF A$<B$ THEN PRINT "OK3"
	# int: A$<B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$2, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot7
	# PRINT "OK3"
	# str: "OK3"
	movq	-560(%rbp), %rcx
	call	puts
.ifnot7:
	# IF A$>=B$ THEN PRINT "ERROR >="
	# int: A$>=B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$5, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot8
	# PRINT "ERROR >="
	# str: "ERROR >="
	movq	-584(%rbp), %rcx
	call	puts
.ifnot8:
	# IF A$<=B$ THEN PRINT "OK4"
	# int: A$<=B$ - %rsi
	# str: A$
	# str: B$
	leaq	-48(%rbp), %rcx
	leaq	-96(%rbp), %rdx
	movq	$4, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot9
	# PRINT "OK4"
	# str: "OK4"
	movq	-608(%rbp), %rcx
	call	puts
.ifnot9:
	# IF B$<A$ THEN PRINT "ERROR >"
	# int: B$<A$ - %rsi
	# str: B$
	# str: A$
	leaq	-96(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$2, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot10
	# PRINT "ERROR >"
	# str: "ERROR >"
	movq	-632(%rbp), %rcx
	call	puts
.ifnot10:
	# IF B$<=A$ THEN PRINT "ERROR <="
	# int: B$<=A$ - %rsi
	# str: B$
	# str: A$
	leaq	-96(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$4, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot11
	# PRINT "ERROR <="
	# str: "ERROR <="
	movq	-656(%rbp), %rcx
	call	puts
.ifnot11:
	# IF C$>A$ THEN PRINT "ERROR > EMPTY"
	# int: C$>A$ - %rsi
	# str: C$
	# str: A$
	leaq	-192(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$3, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot12
	# PRINT "ERROR > EMPTY"
	# str: "ERROR > EMPTY"
	movq	-680(%rbp), %rcx
	call	puts
.ifnot12:
	# IF A$<C$ THEN PRINT "ERROR < EMPTY"
	# int: A$<C$ - %rsi
	# str: A$
	# str: C$
	leaq	-48(%rbp), %rcx
	leaq	-192(%rbp), %rdx
	movq	$2, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot13
	# PRINT "ERROR < EMPTY"
	# str: "ERROR < EMPTY"
	movq	-704(%rbp), %rcx
	call	puts
.ifnot13:
	# IF A$>A1$ THEN PRINT "ERROR > LEN"
	# int: A$>A1$ - %rsi
	# str: A$
	# str: A1$
	leaq	-48(%rbp), %rcx
	leaq	-144(%rbp), %rdx
	movq	$3, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot14
	# PRINT "ERROR > LEN"
	# str: "ERROR > LEN"
	movq	-728(%rbp), %rcx
	call	puts
.ifnot14:
	# IF A1$<A$ THEN PRINT "ERROR < LEN"
	# int: A1$<A$ - %rsi
	# str: A1$
	# str: A$
	leaq	-144(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$2, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot15
	# PRINT "ERROR < LEN"
	# str: "ERROR < LEN"
	movq	-752(%rbp), %rcx
	call	puts
.ifnot15:
	# IF A1$=A$ THEN PRINT "ERROR = LEN"
	# int: A1$=A$ - %rsi
	# str: A1$
	# str: A$
	leaq	-144(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot16
	# PRINT "ERROR = LEN"
	# str: "ERROR = LEN"
	movq	-776(%rbp), %rcx
	call	puts
.ifnot16:
	# IF A$>=A1$ THEN PRINT "ERROR >= LEN"
	# int: A$>=A1$ - %rsi
	# str: A$
	# str: A1$
	leaq	-48(%rbp), %rcx
	leaq	-144(%rbp), %rdx
	movq	$5, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot17
	# PRINT "ERROR >= LEN"
	# str: "ERROR >= LEN"
	movq	-800(%rbp), %rcx
	call	puts
.ifnot17:
	# IF A1$<=A$ THEN PRINT "ERROR <= LEN"
	# int: A1$<=A$ - %rsi
	# str: A1$
	# str: A$
	leaq	-144(%rbp), %rcx
	leaq	-48(%rbp), %rdx
	movq	$4, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot18
	# PRINT "ERROR <= LEN"
	# str: "ERROR <= LEN"
	movq	-824(%rbp), %rcx
	call	puts
.ifnot18:
	# PRINT "END"
	# str: "END"
	movq	-848(%rbp), %rcx
	call	puts

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    