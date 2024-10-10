
	.file	"1001"
	.text
	.def	__main;	.scl	2;	.type	32;	.endef
	.section .rdata,"dr"
.LC0:
	.ascii "“"
	.byte 0
.LC1:
	.ascii "THIS GAME IS CALLED '1001'."
	.byte 0
.LC2:
	.ascii "THE OBJECT IS TO GET TO 1001 AS FAST AS"
	.byte 0
.LC3:
	.ascii "POSSIBLE."
	.byte 0
.LC4:
	.ascii "TWO DICE WILL BE THROWN. CONSULT THE"
	.byte 0
.LC5:
	.ascii "FOLLOWING CHART:"
	.byte 0
.LC6:
	.ascii "                1 = +"
	.byte 0
.LC7:
	.ascii "                2 = -"
	.byte 0
.LC8:
	.ascii "                3 = *"
	.byte 0
.LC9:
	.ascii "                4 = /"
	.byte 0
.LC10:
	.ascii "                5 = *"
	.byte 0
.LC11:
	.ascii "                6 = +"
	.byte 0
.LC12:
	.ascii "ONE DIE WILL BE USED TO DETERMINE THE"
	.byte 0
.LC13:
	.ascii "NUMBER ENTRY, THE OTHER WILL BE USED TO"
	.byte 0
.LC14:
	.ascii "DETERMINE OPERATION ENTRY."
	.byte 0
.LC15:
	.ascii "FOR EXAMPLE, IF THE ROLL IS 3 AND 5,"
	.byte 0
.LC16:
	.ascii "YOU COULD ENTER 3 AS THE NUMBER AND"
	.byte 0
.LC17:
	.ascii "ENTER * AS THE FUNCTION."
	.byte 0
.LC18:
	.ascii "                              HIT A KEY"
	.byte 0
.LC19:
	.ascii ""
	.byte 0
.LC20:
	.ascii "“"
	.byte 0
.LC21:
	.ascii "OR, YOU COULD ENTER 5 AS THE NUMBER AND"
	.byte 0
.LC22:
	.ascii "ENTER * AS THE FUNCTION. YOU HAVE TO"
	.byte 0
.LC23:
	.ascii "GET EXACTLY TO 1001 IN THE FEWEST"
	.byte 0
.LC24:
	.ascii "NUMBER OF TURNS. EACH ROLL OF THE DICE"
	.byte 0
.LC25:
	.ascii "MEANS YOU ENTER ONE NUMBER AND ONE"
	.byte 0
.LC26:
	.ascii "OPERATION."
	.byte 0
.LC27:
	.ascii "HINT: IF THE DICE ALLOW IT, BUILD UP"
	.byte 0
.LC28:
	.ascii "SLOWLY SO YOU WILL HAVE SOME CHOICE IN"
	.byte 0
.LC29:
	.ascii "LATER ROLLS. TAKE YOUR TIME IN DECIDING"
	.byte 0
.LC30:
	.ascii "WHICH NUMBER WILL BE PLAYED AND WHICH"
	.byte 0
.LC31:
	.ascii "NUMBER WILL DETERMINE THE FUNCTION. TRY"
	.byte 0
.LC32:
	.ascii "TO PLAN FOR THE BEST CHANCES FOR THE"
	.byte 0
.LC33:
	.ascii "NEXT ROLL. IF YOU GET /, IT CAN SERVE"
	.byte 0
.LC34:
	.ascii "YOUR ADVANTAGE AS IT WILL GET YOU TO A"
	.byte 0
.LC35:
	.ascii "NUMBER FROM WHICH YOU WILL EASILY"
	.byte 0
.LC36:
	.ascii "ACHIEVE 1001."
	.byte 0
.LC37:
	.ascii "                              HIT A KEY"
	.byte 0
.LC38:
	.ascii ""
	.byte 0
.LC39:
	.ascii "+-*/*+"
	.byte 0
.LC40:
	.ascii "“"
	.byte 0
.LC41:
	.ascii "YOUR TOTAL IS"
	.byte 0
.LC42:
	.ascii "AFTER"
	.byte 0
.LC43:
	.ascii "TURNS."
	.byte 0
.LC44:
	.ascii "YOUR DICE FELL"
	.byte 0
.LC45:
	.ascii "AND"
	.byte 0
.LC46:
	.ascii "OPERATIONS: 1=+ 2=- 3=* 4=/ 5=* 6=+"
	.byte 0
.LC47:
	.ascii "WHICH DICE FOR THE OPERATION (1/2)"
	.byte 0
.LC48:
	.ascii "d"
	.byte 0
.LC49:
	.ascii "1 OR 2 PLEASE."
	.byte 0
.LC50:
	.ascii "OK, "
	.byte 0
.LC51:
	.ascii "EQUALS"
	.byte 0
.LC52:
	.ascii "+"
	.byte 0
.LC53:
	.ascii "-"
	.byte 0
.LC54:
	.ascii "*"
	.byte 0
.LC55:
	.ascii "/"
	.byte 0
.LC56:
	.ascii "THAT'S THE END OF THE TURN."
	.byte 0
.LC57:
	.ascii "HIT A KEY FOR YOUR NEXT TURN."
	.byte 0
.LC58:
	.ascii ""
	.byte 0
.LC59:
	.ascii "***************************************"
	.byte 0
.LC60:
	.ascii "WELL DONE! YOU MADE IT TO 1001!!!!!!!!!!!"
	.byte 0
.LC61:
	.ascii "***************************************"
	.byte 0
.LC62:
	.ascii "IT TOOK YOU"
	.byte 0
.LC63:
	.ascii "TURNS TO DO IT."
	.byte 0
.LC64:
	.ascii "WOULD YOU LIKE TO PLAY AGAIN (Y/N)"
	.byte 0
.LC65:
	.ascii "s"
	.byte 0
.LC66:
	.ascii "Y"
	.byte 0
.LC67:
	.ascii "N"
	.byte 0
.LC68:
	.ascii "(Y) OR (N) PLEASE."
	.byte 0
.LC69:
	.ascii "Y"
	.byte 0
	.align 8
.LONE:
	.double 1.0

    .text
	.globl	main
main:
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$1984, %rsp
	# init variable I$
	movq	$0, -488(%rbp)
	movq	$0, -480(%rbp)
	movq	$0, -472(%rbp)
	# init variable D$
	movq	$0, -992(%rbp)
	movq	$0, -984(%rbp)
	movq	$0, -976(%rbp)
	# init variable O$
	movq	$0, -1304(%rbp)
	movq	$0, -1296(%rbp)
	movq	$0, -1288(%rbp)
	# init variable strtmp0$
	movq	$0, -1784(%rbp)
	movq	$0, -1776(%rbp)
	movq	$0, -1768(%rbp)
	# init variable strtmp1$
	movq	$0, -1808(%rbp)
	movq	$0, -1800(%rbp)
	movq	$0, -1792(%rbp)
	# init variable strtmp2$
	movq	$0, -1832(%rbp)
	movq	$0, -1824(%rbp)
	movq	$0, -1816(%rbp)
	# init variable strtmp3$
	movq	$0, -1856(%rbp)
	movq	$0, -1848(%rbp)
	movq	$0, -1840(%rbp)
	# init variable strtmp4$
	movq	$0, -1880(%rbp)
	movq	$0, -1872(%rbp)
	movq	$0, -1864(%rbp)
	# init peek/poke 64k memory
	movq	$1, %rcx
	movq	$65536, %rdx
	call	calloc
	movq	%rax, -1936(%rbp)
	 # init bstring constants
	leaq	-32(%rbp), %rcx
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
	leaq	-152(%rbp), %rcx
	leaq	.LC5(%rip), %rdx
	call	assignFromConst
	leaq	-176(%rbp), %rcx
	leaq	.LC6(%rip), %rdx
	call	assignFromConst
	leaq	-200(%rbp), %rcx
	leaq	.LC7(%rip), %rdx
	call	assignFromConst
	leaq	-224(%rbp), %rcx
	leaq	.LC8(%rip), %rdx
	call	assignFromConst
	leaq	-248(%rbp), %rcx
	leaq	.LC9(%rip), %rdx
	call	assignFromConst
	leaq	-272(%rbp), %rcx
	leaq	.LC10(%rip), %rdx
	call	assignFromConst
	leaq	-296(%rbp), %rcx
	leaq	.LC11(%rip), %rdx
	call	assignFromConst
	leaq	-320(%rbp), %rcx
	leaq	.LC12(%rip), %rdx
	call	assignFromConst
	leaq	-344(%rbp), %rcx
	leaq	.LC13(%rip), %rdx
	call	assignFromConst
	leaq	-368(%rbp), %rcx
	leaq	.LC14(%rip), %rdx
	call	assignFromConst
	leaq	-392(%rbp), %rcx
	leaq	.LC15(%rip), %rdx
	call	assignFromConst
	leaq	-416(%rbp), %rcx
	leaq	.LC16(%rip), %rdx
	call	assignFromConst
	leaq	-440(%rbp), %rcx
	leaq	.LC17(%rip), %rdx
	call	assignFromConst
	leaq	-464(%rbp), %rcx
	leaq	.LC18(%rip), %rdx
	call	assignFromConst
	leaq	-512(%rbp), %rcx
	leaq	.LC19(%rip), %rdx
	call	assignFromConst
	leaq	-536(%rbp), %rcx
	leaq	.LC20(%rip), %rdx
	call	assignFromConst
	leaq	-560(%rbp), %rcx
	leaq	.LC21(%rip), %rdx
	call	assignFromConst
	leaq	-584(%rbp), %rcx
	leaq	.LC22(%rip), %rdx
	call	assignFromConst
	leaq	-608(%rbp), %rcx
	leaq	.LC23(%rip), %rdx
	call	assignFromConst
	leaq	-632(%rbp), %rcx
	leaq	.LC24(%rip), %rdx
	call	assignFromConst
	leaq	-656(%rbp), %rcx
	leaq	.LC25(%rip), %rdx
	call	assignFromConst
	leaq	-680(%rbp), %rcx
	leaq	.LC26(%rip), %rdx
	call	assignFromConst
	leaq	-704(%rbp), %rcx
	leaq	.LC27(%rip), %rdx
	call	assignFromConst
	leaq	-728(%rbp), %rcx
	leaq	.LC28(%rip), %rdx
	call	assignFromConst
	leaq	-752(%rbp), %rcx
	leaq	.LC29(%rip), %rdx
	call	assignFromConst
	leaq	-776(%rbp), %rcx
	leaq	.LC30(%rip), %rdx
	call	assignFromConst
	leaq	-800(%rbp), %rcx
	leaq	.LC31(%rip), %rdx
	call	assignFromConst
	leaq	-824(%rbp), %rcx
	leaq	.LC32(%rip), %rdx
	call	assignFromConst
	leaq	-848(%rbp), %rcx
	leaq	.LC33(%rip), %rdx
	call	assignFromConst
	leaq	-872(%rbp), %rcx
	leaq	.LC34(%rip), %rdx
	call	assignFromConst
	leaq	-896(%rbp), %rcx
	leaq	.LC35(%rip), %rdx
	call	assignFromConst
	leaq	-920(%rbp), %rcx
	leaq	.LC36(%rip), %rdx
	call	assignFromConst
	leaq	-944(%rbp), %rcx
	leaq	.LC37(%rip), %rdx
	call	assignFromConst
	leaq	-968(%rbp), %rcx
	leaq	.LC38(%rip), %rdx
	call	assignFromConst
	leaq	-1016(%rbp), %rcx
	leaq	.LC39(%rip), %rdx
	call	assignFromConst
	leaq	-1056(%rbp), %rcx
	leaq	.LC40(%rip), %rdx
	call	assignFromConst
	leaq	-1080(%rbp), %rcx
	leaq	.LC41(%rip), %rdx
	call	assignFromConst
	leaq	-1104(%rbp), %rcx
	leaq	.LC42(%rip), %rdx
	call	assignFromConst
	leaq	-1128(%rbp), %rcx
	leaq	.LC43(%rip), %rdx
	call	assignFromConst
	leaq	-1168(%rbp), %rcx
	leaq	.LC44(%rip), %rdx
	call	assignFromConst
	leaq	-1192(%rbp), %rcx
	leaq	.LC45(%rip), %rdx
	call	assignFromConst
	leaq	-1216(%rbp), %rcx
	leaq	.LC46(%rip), %rdx
	call	assignFromConst
	leaq	-1240(%rbp), %rcx
	leaq	.LC47(%rip), %rdx
	call	assignFromConst
	leaq	-1272(%rbp), %rcx
	leaq	.LC49(%rip), %rdx
	call	assignFromConst
	leaq	-1328(%rbp), %rcx
	leaq	.LC50(%rip), %rdx
	call	assignFromConst
	leaq	-1352(%rbp), %rcx
	leaq	.LC51(%rip), %rdx
	call	assignFromConst
	leaq	-1376(%rbp), %rcx
	leaq	.LC52(%rip), %rdx
	call	assignFromConst
	leaq	-1400(%rbp), %rcx
	leaq	.LC53(%rip), %rdx
	call	assignFromConst
	leaq	-1424(%rbp), %rcx
	leaq	.LC54(%rip), %rdx
	call	assignFromConst
	leaq	-1448(%rbp), %rcx
	leaq	.LC55(%rip), %rdx
	call	assignFromConst
	leaq	-1472(%rbp), %rcx
	leaq	.LC56(%rip), %rdx
	call	assignFromConst
	leaq	-1496(%rbp), %rcx
	leaq	.LC57(%rip), %rdx
	call	assignFromConst
	leaq	-1520(%rbp), %rcx
	leaq	.LC58(%rip), %rdx
	call	assignFromConst
	leaq	-1544(%rbp), %rcx
	leaq	.LC59(%rip), %rdx
	call	assignFromConst
	leaq	-1568(%rbp), %rcx
	leaq	.LC60(%rip), %rdx
	call	assignFromConst
	leaq	-1592(%rbp), %rcx
	leaq	.LC61(%rip), %rdx
	call	assignFromConst
	leaq	-1616(%rbp), %rcx
	leaq	.LC62(%rip), %rdx
	call	assignFromConst
	leaq	-1640(%rbp), %rcx
	leaq	.LC63(%rip), %rdx
	call	assignFromConst
	leaq	-1664(%rbp), %rcx
	leaq	.LC64(%rip), %rdx
	call	assignFromConst
	leaq	-1688(%rbp), %rcx
	leaq	.LC66(%rip), %rdx
	call	assignFromConst
	leaq	-1712(%rbp), %rcx
	leaq	.LC67(%rip), %rdx
	call	assignFromConst
	leaq	-1736(%rbp), %rcx
	leaq	.LC68(%rip), %rdx
	call	assignFromConst
	leaq	-1760(%rbp), %rcx
	leaq	.LC69(%rip), %rdx
	call	assignFromConst
	# POKE 53280,5
	# int: 53280 - %rsi
	movq	$53280, %rsi
	andq	$0xFFFF, %rsi
	# int: 5 - %rdi
	movq	$5, %rdi
	movq	-1936(%rbp), %rax
	movb	%dil, 0(%rax,%rsi,1)
	# POKE 53281,0
	# int: 53281 - %rsi
	movq	$53281, %rsi
	andq	$0xFFFF, %rsi
	# int: 0 - %rdi
	movq	$0, %rdi
	movq	-1936(%rbp), %rax
	movb	%dil, 0(%rax,%rsi,1)
	# POKE 646,1
	# int: 646 - %rsi
	movq	$646, %rsi
	andq	$0xFFFF, %rsi
	# int: 1 - %rdi
	movq	$1, %rdi
	movq	-1936(%rbp), %rax
	movb	%dil, 0(%rax,%rsi,1)
	# Z=RND(-2)
	# float: RND(-2)
	# float: -2
	# float: 2
	# int: 2 - %rsi
	movq	$2, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	xorpd	%xmm1, %xmm1
	subsd	%xmm0, %xmm1
	movsd	%xmm1, -1912(%rbp)
	movsd	-1912(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -8(%rbp)
	# PRINT"“"
	# str: "“"
	movq	-32(%rbp), %rcx
	call	puts
	# PRINT"THIS GAME IS CALLED '1001'."
	# str: "THIS GAME IS CALLED '1001'."
	movq	-56(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"THE OBJECT IS TO GET TO 1001 AS FAST AS"
	# str: "THE OBJECT IS TO GET TO 1001 AS FAST AS"
	movq	-80(%rbp), %rcx
	call	puts
	# PRINT"POSSIBLE."
	# str: "POSSIBLE."
	movq	-104(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"TWO DICE WILL BE THROWN. CONSULT THE"
	# str: "TWO DICE WILL BE THROWN. CONSULT THE"
	movq	-128(%rbp), %rcx
	call	puts
	# PRINT"FOLLOWING CHART:"
	# str: "FOLLOWING CHART:"
	movq	-152(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"                1 = +"
	# str: "                1 = +"
	movq	-176(%rbp), %rcx
	call	puts
	# PRINT"                2 = -"
	# str: "                2 = -"
	movq	-200(%rbp), %rcx
	call	puts
	# PRINT"                3 = *"
	# str: "                3 = *"
	movq	-224(%rbp), %rcx
	call	puts
	# PRINT"                4 = /"
	# str: "                4 = /"
	movq	-248(%rbp), %rcx
	call	puts
	# PRINT"                5 = *"
	# str: "                5 = *"
	movq	-272(%rbp), %rcx
	call	puts
	# PRINT"                6 = +"
	# str: "                6 = +"
	movq	-296(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"ONE DIE WILL BE USED TO DETERMINE THE"
	# str: "ONE DIE WILL BE USED TO DETERMINE THE"
	movq	-320(%rbp), %rcx
	call	puts
	# PRINT"NUMBER ENTRY, THE OTHER WILL BE USED TO"
	# str: "NUMBER ENTRY, THE OTHER WILL BE USED TO"
	movq	-344(%rbp), %rcx
	call	puts
	# PRINT"DETERMINE OPERATION ENTRY."
	# str: "DETERMINE OPERATION ENTRY."
	movq	-368(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"FOR EXAMPLE, IF THE ROLL IS 3 AND 5,"
	# str: "FOR EXAMPLE, IF THE ROLL IS 3 AND 5,"
	movq	-392(%rbp), %rcx
	call	puts
	# PRINT"YOU COULD ENTER 3 AS THE NUMBER AND"
	# str: "YOU COULD ENTER 3 AS THE NUMBER AND"
	movq	-416(%rbp), %rcx
	call	puts
	# PRINT"ENTER * AS THE FUNCTION."
	# str: "ENTER * AS THE FUNCTION."
	movq	-440(%rbp), %rcx
	call	puts
	# PRINT"                              HIT A KEY"
	# str: "                              HIT A KEY"
	movq	-464(%rbp), %rcx
	call	puts
.line210:
	# GET I$
	leaq	-488(%rbp), %rcx
	call	readChar
	# IF I$="" THEN 210
	# int: I$="" - %rsi
	# str: I$
	# str: ""
	leaq	-488(%rbp), %rcx
	leaq	-512(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot0
	jmp	.line210
.ifnot0:
	# PRINT"“"
	# str: "“"
	movq	-536(%rbp), %rcx
	call	puts
	# PRINT"OR, YOU COULD ENTER 5 AS THE NUMBER AND"
	# str: "OR, YOU COULD ENTER 5 AS THE NUMBER AND"
	movq	-560(%rbp), %rcx
	call	puts
	# PRINT"ENTER * AS THE FUNCTION. YOU HAVE TO"
	# str: "ENTER * AS THE FUNCTION. YOU HAVE TO"
	movq	-584(%rbp), %rcx
	call	puts
	# PRINT"GET EXACTLY TO 1001 IN THE FEWEST"
	# str: "GET EXACTLY TO 1001 IN THE FEWEST"
	movq	-608(%rbp), %rcx
	call	puts
	# PRINT"NUMBER OF TURNS. EACH ROLL OF THE DICE"
	# str: "NUMBER OF TURNS. EACH ROLL OF THE DICE"
	movq	-632(%rbp), %rcx
	call	puts
	# PRINT"MEANS YOU ENTER ONE NUMBER AND ONE"
	# str: "MEANS YOU ENTER ONE NUMBER AND ONE"
	movq	-656(%rbp), %rcx
	call	puts
	# PRINT"OPERATION."
	# str: "OPERATION."
	movq	-680(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"HINT: IF THE DICE ALLOW IT, BUILD UP"
	# str: "HINT: IF THE DICE ALLOW IT, BUILD UP"
	movq	-704(%rbp), %rcx
	call	puts
	# PRINT"SLOWLY SO YOU WILL HAVE SOME CHOICE IN"
	# str: "SLOWLY SO YOU WILL HAVE SOME CHOICE IN"
	movq	-728(%rbp), %rcx
	call	puts
	# PRINT"LATER ROLLS. TAKE YOUR TIME IN DECIDING"
	# str: "LATER ROLLS. TAKE YOUR TIME IN DECIDING"
	movq	-752(%rbp), %rcx
	call	puts
	# PRINT"WHICH NUMBER WILL BE PLAYED AND WHICH"
	# str: "WHICH NUMBER WILL BE PLAYED AND WHICH"
	movq	-776(%rbp), %rcx
	call	puts
	# PRINT"NUMBER WILL DETERMINE THE FUNCTION. TRY"
	# str: "NUMBER WILL DETERMINE THE FUNCTION. TRY"
	movq	-800(%rbp), %rcx
	call	puts
	# PRINT"TO PLAN FOR THE BEST CHANCES FOR THE"
	# str: "TO PLAN FOR THE BEST CHANCES FOR THE"
	movq	-824(%rbp), %rcx
	call	puts
	# PRINT"NEXT ROLL. IF YOU GET /, IT CAN SERVE"
	# str: "NEXT ROLL. IF YOU GET /, IT CAN SERVE"
	movq	-848(%rbp), %rcx
	call	puts
	# PRINT"YOUR ADVANTAGE AS IT WILL GET YOU TO A"
	# str: "YOUR ADVANTAGE AS IT WILL GET YOU TO A"
	movq	-872(%rbp), %rcx
	call	puts
	# PRINT"NUMBER FROM WHICH YOU WILL EASILY"
	# str: "NUMBER FROM WHICH YOU WILL EASILY"
	movq	-896(%rbp), %rcx
	call	puts
	# PRINT"ACHIEVE 1001."
	# str: "ACHIEVE 1001."
	movq	-920(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"                              HIT A KEY"
	# str: "                              HIT A KEY"
	movq	-944(%rbp), %rcx
	call	puts
.line390:
	# GET I$
	leaq	-488(%rbp), %rcx
	call	readChar
	# IF I$="" THEN 390
	# int: I$="" - %rsi
	# str: I$
	# str: ""
	leaq	-488(%rbp), %rcx
	leaq	-968(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot1
	jmp	.line390
.ifnot1:
.line400:
	# D$="+-*/*+"
	# str: "+-*/*+"
	leaq	-992(%rbp), %rcx
	leaq	-1016(%rbp), %rdx
	call	assignBString
	# G=0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1024(%rbp)
	# T=0
	# float: 0
	# int: 0 - %rsi
	movq	$0, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1032(%rbp)
.line410:
	# PRINT"“"
	# str: "“"
	movq	-1056(%rbp), %rcx
	call	puts
	# PRINT"YOUR TOTAL IS";T;"AFTER";G;"TURNS."
	# str: "YOUR TOTAL IS";
	leaq	-1880(%rbp), %rcx
	leaq	-1080(%rbp), %rdx
	call	assignBString
	# str: T;
	leaq	-1856(%rbp), %rcx
	movsd	-1032(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: "AFTER";
	leaq	-1880(%rbp), %rcx
	leaq	-1104(%rbp), %rdx
	call	appendBString
	# str: G;
	leaq	-1856(%rbp), %rcx
	movsd	-1024(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: "TURNS."
	leaq	-1880(%rbp), %rcx
	leaq	-1128(%rbp), %rdx
	call	appendBString
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# D1=INT(RND(1)*6+1)
	# float: INT(RND(1)*6+1)
	# float: RND(1)*6+1
	# float: RND(1)*6
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -1912(%rbp)
	# float: 6
	# int: 6 - %rsi
	movq	$6, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1912(%rbp), %xmm1
	movsd	-1920(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1912(%rbp)
	movsd	-1920(%rbp), %xmm1
	movsd	-1912(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1912(%rbp)
	movsd	-1912(%rbp), %xmm0
	call	trunc
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1136(%rbp)
	# D2=INT(RND(1)*6+1)
	# float: INT(RND(1)*6+1)
	# float: RND(1)*6+1
	# float: RND(1)*6
	# float: RND(1)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	call	c64rnd
	movsd	%xmm0, -1912(%rbp)
	# float: 6
	# int: 6 - %rsi
	movq	$6, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1912(%rbp), %xmm1
	movsd	-1920(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1912(%rbp)
	movsd	-1920(%rbp), %xmm1
	movsd	-1912(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1912(%rbp)
	movsd	-1912(%rbp), %xmm0
	call	trunc
	movsd	%xmm0, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1144(%rbp)
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"YOUR DICE FELL";D1;"AND";D2
	# str: "YOUR DICE FELL";
	leaq	-1880(%rbp), %rcx
	leaq	-1168(%rbp), %rdx
	call	assignBString
	# str: D1;
	leaq	-1856(%rbp), %rcx
	movsd	-1136(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: "AND";
	leaq	-1880(%rbp), %rcx
	leaq	-1192(%rbp), %rdx
	call	appendBString
	# str: D2
	leaq	-1856(%rbp), %rcx
	movsd	-1144(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"OPERATIONS: 1=+ 2=- 3=* 4=/ 5=* 6=+"
	# str: "OPERATIONS: 1=+ 2=- 3=* 4=/ 5=* 6=+"
	movq	-1216(%rbp), %rcx
	call	puts
	# PRINT"WHICH DICE FOR THE OPERATION (1/2)";
	# str: "WHICH DICE FOR THE OPERATION (1/2)";
	movq	-1240(%rbp), %rcx
	call	puts
.line460:
	# INPUT I
	xor	%rcx, %rcx
	leaq	.LC48(%rip), %rdx
	leaq	-1248(%rbp), %r8
	call	inputData
	# IF I<1 OR I>2 THEN PRINT"1 OR 2 PLEASE.":GOTO 460
	# int: I<1 OR I>2 - %rsi
	# int: I<1 - %rsi
	# float: I
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1248(%rbp), %xmm0
	movsd	-1920(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	setb	%al
	movzbq	%al, %rsi
	negq	%rsi
	# int: I>2 - %rdi
	# float: I
	# float: 2
	# int: 2 - %r8
	movq	$2, %r8
	cvtsi2sdq	%r8, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1248(%rbp), %xmm0
	movsd	-1920(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	seta	%al
	movzbq	%al, %rdi
	negq	%rdi
	orq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot2
	# PRINT"1 OR 2 PLEASE."
	# str: "1 OR 2 PLEASE."
	movq	-1272(%rbp), %rcx
	call	puts
	# GOTO 460
	jmp	.line460
.ifnot2:
	# IF I=1 THEN N=D2 : O$=MID$(D$,D1,1) : GOTO 490
	# int: I=1 - %rsi
	# float: I
	# float: 1
	# int: 1 - %rdi
	movq	$1, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1248(%rbp), %xmm0
	movsd	-1920(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot3
	# N=D2
	# float: D2
	movsd	-1144(%rbp), %xmm0
	movsd	%xmm0, -1280(%rbp)
	# O$=MID$(D$,D1,1)
	# str: MID$(D$,D1,1)
	# str: D$
	# int: D1 - %r8
	# float: D1
	movsd	-1136(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1880(%rbp), %rcx
	leaq	-992(%rbp), %rdx
	call	bstrMid
	leaq	-1304(%rbp), %rcx
	leaq	-1880(%rbp), %rdx
	call	assignBString
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# GOTO 490
	jmp	.line490
.ifnot3:
	# N=D1
	# float: D1
	movsd	-1136(%rbp), %xmm0
	movsd	%xmm0, -1280(%rbp)
	# O$=MID$(D$,D2,1)
	# str: MID$(D$,D2,1)
	# str: D$
	# int: D2 - %r8
	# float: D2
	movsd	-1144(%rbp), %xmm0
	cvtsd2siq	%xmm0, %r8
	# int: 1 - %r9
	movq	$1, %r9
	leaq	-1880(%rbp), %rcx
	leaq	-992(%rbp), %rdx
	call	bstrMid
	leaq	-1304(%rbp), %rcx
	leaq	-1880(%rbp), %rdx
	call	assignBString
	leaq	-1880(%rbp), %rcx
	call	freeBString
.line490:
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"OK, ";T;O$;N;"EQUALS";
	# str: "OK, ";
	leaq	-1880(%rbp), %rcx
	leaq	-1328(%rbp), %rdx
	call	assignBString
	# str: T;
	leaq	-1856(%rbp), %rcx
	movsd	-1032(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: O$;
	leaq	-1880(%rbp), %rcx
	leaq	-1304(%rbp), %rdx
	call	appendBString
	# str: N;
	leaq	-1856(%rbp), %rcx
	movsd	-1280(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: "EQUALS";
	leaq	-1880(%rbp), %rcx
	leaq	-1352(%rbp), %rdx
	call	appendBString
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# IF O$="+" THEN T=T+N
	# int: O$="+" - %rsi
	# str: O$
	# str: "+"
	leaq	-1304(%rbp), %rcx
	leaq	-1376(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot4
	# T=T+N
	# float: T+N
	# float: T
	# float: N
	movsd	-1032(%rbp), %xmm1
	movsd	-1280(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1032(%rbp)
.ifnot4:
	# IF O$="-" THEN T=T-N
	# int: O$="-" - %rsi
	# str: O$
	# str: "-"
	leaq	-1304(%rbp), %rcx
	leaq	-1400(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot5
	# T=T-N
	# float: T-N
	# float: T
	# float: N
	movsd	-1032(%rbp), %xmm1
	movsd	-1280(%rbp), %xmm2
	subsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1032(%rbp)
.ifnot5:
	# IF O$="*" THEN T=T*N
	# int: O$="*" - %rsi
	# str: O$
	# str: "*"
	leaq	-1304(%rbp), %rcx
	leaq	-1424(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot6
	# T=T*N
	# float: T*N
	# float: T
	# float: N
	movsd	-1032(%rbp), %xmm1
	movsd	-1280(%rbp), %xmm2
	mulsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1032(%rbp)
.ifnot6:
	# IF O$="/" THEN T=T/N
	# int: O$="/" - %rsi
	# str: O$
	# str: "/"
	leaq	-1304(%rbp), %rcx
	leaq	-1448(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot7
	# T=T/N
	# float: T/N
	# float: T
	# float: N
	movsd	-1032(%rbp), %xmm1
	movsd	-1280(%rbp), %xmm2
	divsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1032(%rbp)
.ifnot7:
	# PRINT T
	# str: T
	leaq	-1880(%rbp), %rcx
	movsd	-1032(%rbp), %xmm1
	call	assignDouble
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# G=G+1
	# float: G+1
	# float: G
	# float: 1
	# int: 1 - %rsi
	movq	$1, %rsi
	cvtsi2sdq	%rsi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1024(%rbp), %xmm1
	movsd	-1920(%rbp), %xmm2
	addsd	%xmm2, %xmm1
	movsd	%xmm1, -1920(%rbp)
	movsd	-1920(%rbp), %xmm0
	movsd	%xmm0, -1024(%rbp)
	# IF T=1001 THEN 590
	# int: T=1001 - %rsi
	# float: T
	# float: 1001
	# int: 1001 - %rdi
	movq	$1001, %rdi
	cvtsi2sdq	%rdi, %xmm0
	movsd	%xmm0, -1920(%rbp)
	movsd	-1032(%rbp), %xmm0
	movsd	-1920(%rbp), %xmm1
	comisd	%xmm1, %xmm0
	sete	%al
	movzbq	%al, %rsi
	negq	%rsi
	cmpq	$0, %rsi
	je	.ifnot8
	jmp	.line590
.ifnot8:
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"THAT'S THE END OF THE TURN."
	# str: "THAT'S THE END OF THE TURN."
	movq	-1472(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"HIT A KEY FOR YOUR NEXT TURN."
	# str: "HIT A KEY FOR YOUR NEXT TURN."
	movq	-1496(%rbp), %rcx
	call	puts
.line570:
	# GET I$
	leaq	-488(%rbp), %rcx
	call	readChar
	# IF I$="" THEN 570
	# int: I$="" - %rsi
	# str: I$
	# str: ""
	leaq	-488(%rbp), %rcx
	leaq	-1520(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot9
	jmp	.line570
.ifnot9:
	# GOTO 410
	jmp	.line410
.line590:
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"***************************************"
	# str: "***************************************"
	movq	-1544(%rbp), %rcx
	call	puts
	# PRINT"WELL DONE! YOU MADE IT TO 1001!!!!!!!!!!!"
	# str: "WELL DONE! YOU MADE IT TO 1001!!!!!!!!!!!"
	movq	-1568(%rbp), %rcx
	call	puts
	# PRINT"***************************************"
	# str: "***************************************"
	movq	-1592(%rbp), %rcx
	call	puts
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"IT TOOK YOU";G;"TURNS TO DO IT."
	# str: "IT TOOK YOU";
	leaq	-1880(%rbp), %rcx
	leaq	-1616(%rbp), %rdx
	call	assignBString
	# str: G;
	leaq	-1856(%rbp), %rcx
	movsd	-1024(%rbp), %xmm1
	call	assignDouble
	leaq	-1880(%rbp), %rcx
	leaq	-1856(%rbp), %rdx
	call	appendBString
	leaq	-1856(%rbp), %rcx
	call	freeBString
	# str: "TURNS TO DO IT."
	leaq	-1880(%rbp), %rcx
	leaq	-1640(%rbp), %rdx
	call	appendBString
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"WOULD YOU LIKE TO PLAY AGAIN (Y/N)";
	# str: "WOULD YOU LIKE TO PLAY AGAIN (Y/N)";
	movq	-1664(%rbp), %rcx
	call	puts
.line640:
	# INPUT I$
	xor	%rcx, %rcx
	leaq	.LC65(%rip), %rdx
	leaq	-488(%rbp), %r8
	call	inputData
	# IF I$<>"Y" AND I$<>"N" THEN PRINT:PRINT"(Y) OR (N) PLEASE.":GOTO 640
	# int: I$<>"Y" AND I$<>"N" - %rsi
	# int: I$<>"Y" - %rsi
	# str: I$
	# str: "Y"
	leaq	-488(%rbp), %rcx
	leaq	-1688(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rsi
	# int: I$<>"N" - %rdi
	# str: I$
	# str: "N"
	leaq	-488(%rbp), %rcx
	leaq	-1712(%rbp), %rdx
	movq	$1, %r8
	call	bstrCmp
	movq	%rax, %rdi
	andq	%rdi, %rsi
	cmpq	$0, %rsi
	je	.ifnot10
	# PRINT
	movq	-1880(%rbp), %rcx
	call	puts
	leaq	-1880(%rbp), %rcx
	call	freeBString
	# PRINT"(Y) OR (N) PLEASE."
	# str: "(Y) OR (N) PLEASE."
	movq	-1736(%rbp), %rcx
	call	puts
	# GOTO 640
	jmp	.line640
.ifnot10:
	# IF I$="Y" THEN 400
	# int: I$="Y" - %rsi
	# str: I$
	# str: "Y"
	leaq	-488(%rbp), %rcx
	leaq	-1760(%rbp), %rdx
	movq	$0, %r8
	call	bstrCmp
	movq	%rax, %rsi
	cmpq	$0, %rsi
	je	.ifnot11
	jmp	.line400
.ifnot11:

.basicend:
    movl	$0, %eax
	movq	%rbp, %rsp
	popq	%rbp
	ret
    