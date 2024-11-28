# C-64 Basic VSC Plugin and Windows 64bit Compiler

It reimplement [C64 Basic V2](https://en.wikipedia.org/wiki/Commodore_BASIC) as [langium](https://langium.org/) DSL project.

The project contains:

* C64 Basic [language server](https://en.wikipedia.org/wiki/Language_Server_Protocol)
* [Visual Studio Code](https://code.visualstudio.com/) C64 Basic plugin
* Code Formater
* Compiler for C64 that produce gcc 64-bit assembler (gas) which can be compiled and linked to executable by using gcc

It is fun project. I have made it to learn langium, x86 assembly language and build my first compiler.

# What is special about langium

C64 Basic was defined as real grammar.
Langium hat good support to make full functional language server for it.
It support validation for keywords, grammar, cross-references und types with immadiatelly display of errors in IDE.

[c64 basic gramar definition](src/language/c-64-basic.langium)

# Setup and install

You need [node.js](https://nodejs.org/)
Change to the project directory and use npm from command prompt

    npm install
    npm run langium:generate
    npm run build

The completa compilation will work only on Windows with mingw 64.
Install [mingw 64](https://www.mingw-w64.org/) first. You probably to setup the system envirorment variable PATH to
have gcc available. You can do it systemwide or directly in console. Here we assume that you have installed mingw in C:\mingw.

CMD

    set PATH=%PATH%;C:\mingw64\bin

Powershell

    $env:PATH += ";C:\mingw64\bin"

Test in gcc is available. Test if you see also the 64 bit version.

    gcc --version
    gcc.exe (x86_64-win32-sjlj-rev0, Built by MinGW-W64 project) 8.1.0
    Copyright (C) 2018 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You can compile your c64 basic programs to windows executable using following command.
You have to be in working directory of the project or pass the location of c64basic (this project) home directory as parameter.


    npm run c64compile your_dir/your_project.bas

If you have the basic program as original prj file. You will need to convert it to the text first using for example [petcat tool](https://www.c64-wiki.de/wiki/Petcat) from VICE.

# Using c64basic standalone

After building the project you can use the tool standalone as command.

    node .\bin\cli.js help

Get all options

    node .\bin\cli.js help compile

Output

    Usage: cli compile [options] <file>

    generates assembler code from c64 basic and compile it to executable using gcc compile

    Arguments:
    file                      source file (possible file extensions: .c64b, .bas)

    Options:
    -d, --destination <dir>   destination directory of generating
    -s, --suppress_compiling  supress compiling assembler code to executable using mingw
    --eager_free_memory       eager free memory for temporary string
    --gcc_path <path>         path to gcc compiler
    --home_path <path>        path to tool home directory (needed for localtion of rtlib.c)
    -h, --help                display help for command

For example you may use it to compile the example basic program

    node .\bin\cli.js compile .\examples_compile\compile.c64b

If the command fails with the message that command "gcc" could not be found. Ensure that gcc is in your PATH
or pass it with --gcc_path options. After it you will find the executable in the same directory as input file

   node .\bin\cli.js compile --gcc_path C:\devsoft\mingw64win\mingw64\bin\gcc.exe .\examples_compile\compile.c64b 
   compile action
   Assembly code generated successfully: examples_compile\compile.s
   C:\devsoft\mingw64win\mingw64\bin\gcc.exe "examples_compile\compile.s" .\ccode\rtlib.c -o "examples_compile\compile.exe"
   run mingw compiler to generate executable

There are also another commands avaiable

 * crunch - prepare the basic program to use on c64. It creates line number. Removes spaces, commands and truncate the variable names.
 * decrunch - convert c64 basic programm to be more readable by adding spaces, removing unnecessera lines and adding empty lines.

# Building and installing the Visual Studio Code c64basic extension

You need to install the [vsce visual studio code extension](https://github.com/microsoft/vscode-vsce) first.

    npm install -g @vscode/vsce

After bilding the system with `npm run build` you can install the c64basic as visual studio plugin.

    npm run langium:generate
    npm run build
    vsce package --baseContentUrl https://github.com/xdobry/c64-basic-langium-vsc/tree/main/

You can install the created vsix file directly in [visual studio code](https://langium.org/docs/learn/minilogo/building_an_extension/#installing)

# Runing vsce extension as extension developer

From visual studion code

* rebuild language: npm run langium:generate
* npm run build
* lunch debugger from visuals studio code. Open c64b file (see examples)

# Alternatives

There is quite a lot alternatives to cross develop C64 Basic on modern platforms.
Please check them first.
This project is in early state.

## Visual Studion c64 basic plugins

* [VS64](https://marketplace.visualstudio.com/items?itemName=rosc.vs64) - The C64 Development Environment (basic, assempler and other).
* [COMMODORE 64 BASIC V2](https://marketplace.visualstudio.com/items?itemName=gverduci.c64basicv2) - This extension helps you to write Commodore 64 basic v2 programs (.prg or .bas extension). It provides you: syntax highlighting, snippets, file icons, a theme, tasks, rulers, commands, different views in the Primary Sidebar, and a simple preview.

## Other C64 Basic IDEs

* [CBM .prg Studio](https://www.ajordison.co.uk/index.html)
* C64_Studio
* [XC-BASIC](https://github.com/neilsf/XC-BASIC) - Basic cross compiler (works on window compiles to c64 assembly)

## Basic compiler and interpreter

* [VintageBasic](http://www.vintage-basic.net/) - interpreter for old basic programs compatible with early microsoft basic which was the reference for c64 basic (cbm basic). includes collection of basic source code from the book "Basic Computer Games" 
  that can be compiled with this compiler without problems.
* [FreeBasic](https://www.freebasic.net/) - free basic compiler for many platforms oriented for QuickBasic
* [cbmbasic](https://github.com/mist64/cbmbasic) - cbmbasic, a portable version of Commodore's version of Microsoft BASIC 6502 as found on the Commodore 64

# Project Structure

The project was setup with [yeoman template](https://langium.org/docs/learn/workflow/scaffold/) as langium project.
You can see following directories:

  * src - type script sources (project setup was done with langium tool)
  * ccode - c-source runtime and test code.
  * examples - examples of c64 basic code that is accepted by the tool.
  * examples_errors - examples of invalid c64 basic code that is recognized by the tool as errornous.
  * examples_compile - c64 basic code examples that can be compiled to 64bit executable
  * generated - GAS assembly code generated by the compiler from examples_compile files (only to folow changes in compiler output)

## Langium functionality

* Go to definition for labels, user functions and variables
* Show symbols
* Folding
* Formating
  * Crunch
  * DeCrunch
* Tool Tips
* convert to and from prg-Files - OPEN

## Validation

The grammar parser makes many static checks out of the box.
So the plugin/compiler can be used for syntax checking basic programs

* all references variables must be written once in code
* all goto and gosub lables and lines must exists
* all used user function must be defined once in code
* all build in function are checked for parameter and types
* only known commands are allowed

Additional checks

* never read variables
* GOSUB without RETURN
* inconsistent variable dimensions - OPEN
* lines and number duplicates, lines ordering

# Compilation to 64 bit GAS

The AST (Abstract Syntax) generated by langium framework is compiled to assebler using typescript
all in one file [Assembler generator from c64 basic](src/cli/generator.ts)

There are also small c-written runtime library for some c64 commands as INPUT or string handling [C-Written runtime](ccode/rtlib.c).
This all is quite minimal so easy to experiment with it.

## String implementation

String as stored as C++String simile structure (pointer *char, lenght and capacity).
The basic string can also store null bytes.
See BString structure in rtlib.c
There are no reference counting.

    A$=B$

This will just reserve new memory and copy the string. The reserved memory is reused if possible.

## Arrays implementation

The arrays memory are allocated lazy (on access). The array structure stores rank and dimensions.
The indexes are checked of boundaries for every access.

## DEF FN implementation

The fn can be redefined.
There are also integer function possible. There must be distinct to float functions.

   DEF FN MINC(X%) = %X+1

## Compile Features to implement

The compiler will break with error if some unsupported keyword is used

* TI$
* OPEN, INPUT#, GET#, PRINT#
* Can not GET to array GET A$(0)

* TODO 
  - set all stack mem to 0 (init)
  - check division by zero
  - own float and str tmp stack for DEF FN (own local ebp pointer needed?)
  - optimize reusing of str memory
  - validation do not allow to use same label and same line number

## Visual Studio Extension TODO

* run compile as task
* run crunch and uncrunch as task
* integrate vice (prg compilation, run)
* rename does not work for labels
* rename does not work for veriables if renaming from definition (let)
* show references does not show label definition


# Optimization

Currently the compiler does not optimize code.
Posible areas

  * reduce expressions with constants
  * recognize variable constants
  * encode numeric constant directly to double if only used in double context SIN(2) or 1.2+2
  * remove unnecessary code (variables that are only set but never read)
  * on assembly level (reduce unnecerry moving register to tmp storage and back to register)

# Extension of C64 Basic

* line number are not necessery
* empty lines are allowed
* line labels can be used (label is name with colong)

    print "hallo"
    label1:
    print "hallo2"
    goto label1

* all unused variables are reported as warnings
* whole variable name is significant not only 2 letters. The variable names may be replaced during cruning if not unique

# Incompatibilities to C64 Basic for Compiling to Exceutable

I tried that the compiler produces code that behavious same as possible as original basic 64 interpereter
without the limitations of c64 basic.

Integer and float variables uses 64-bit numbers.
There are no limitiation on string and array dimension length.
The whole variable name is siginificant (not only 2 characters as in c64 basic).

The mathematical expression are also computed directly on integer numbers if 2 operand are also integer.
For loops can use integer variables. If you want to compile the program to x86 you may use more integer variables.
But this will not run on original c64.

For-Next loop might work differently for special cases.
Following code will work on original c64 basic but will not compile with this compiler

    10 GOTO 50
    20 PRINT I: NEXT I
    30 END
    50 FOR I=0 TO 5
    60 GOTO 20

Some commands are not implementated because they make no sense in compiled language or on windows platform.
* RUN
* LIST
* BREAK
* LOAD
* SYS
* VERIFY
* WAIT
* USR
* FRE
* NEW
* CLR

TI pseudo variable gives unix time and it cannot be set.

# Testing

    npm run test

    .\node_modules\.bin\vitest run --testNamePattern "check-compile-files"

For compilation test you need gcc (64 bit) in your path

    $env:PATH += ";C:\devsoft\mingw64win\mingw64\bin"

# Lesson Learned

As I have started the project I have not expected that it will be so hard to get it right and build
real compatible c64 basic compiler.
The first try were very promesing. I could parse and compile hello world basic program into running executable only in 1 day.
But defining the c64 grammar with langium was not so easy to be compatible with original parser.

## Define C64 basic grammar with langium

It is also more difficult than expected.
The parsing of basic is quite easy to program from scratch but tricky in detail and do not match exectly with lexer, grammar approach of regular well designed language.

There problem was also that the tokenizer needs to support different modes if DATA is parsed.
I have needed to hack langium tokenizer to use modes of [chevrotain](https://chevrotain.io/docs/features/lexer_modes.html) lexer.

## How to create executable from source

My knoweldge about building compiler was quite old and I have unfortunatelly started to code without resarching the current state of the art.
Traditionally the compiler emit assembly code from ast (abstract syntax tree).
So I have started to generate [GAS](https://de.wikipedia.org/wiki/GNU_Assembler) assembly code.
This assembly code can be compiled to executable using mingw tool quite easy.
What I have not know is that x64 code for Windows differes from Linux code. This make it quite hard to get right help how to make it right.
I needed to get to know about stack aligning, shadow space and windows x64 [c-calling convention](https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-170).
Because the programs break a lot I needed to debug at assembly level and learn how to use the debugger.
I have choosen not the easiest tool for it [radare2](https://github.com/radareorg/radare2) (You need 64bit version for debugging).

I have learned a lot about x64 assembly which was my target but it was not the easy way.
At the end the compiler can produce code only for windows x64 bit. And the generator is very platform specific (windows and x64).
The current state of art will be to use some [intermediate represenation](https://en.wikipedia.org/wiki/Intermediate_representation) and reuse existing compiler backend to create platform specific assembly code.
This is done using [llmv](https://llvm.org/) or also (gcc gimple)[https://gcc.gnu.org/onlinedocs/gccint/GIMPLE.html]

At the end the best thing would be just to generate c-code and compile it with gcc or clang to whatever you want.
I whould get the platform independency and optimization for free.
There are planty another options which also could make the things easier: [RPython](https://rpython.readthedocs.io/en/latest/),

The only one good decision was to write runtime code in c. Anyway at the beginning I have not supposed that I need some runtime code anyway because the c64 basic is so easy.

Anyway I have learned much about compiler internals anyway.

## Getting c64 programs to behave the same on windows

This was also the thing that I have expected at the beging but ignored it because it is fun project.
The problem is that very many c64 basic programs are indeed not pure basic programs.
C64 Basic allows to use SYS, PEEK, POKE, WAIT and operate with hardware at very low level.
So the most c64 basic code that you have (for example almost all games) will not run properly after compilation.
This limits the usage of the program a lot.

One could image that write additional compibility layer that maps graphic and memory similar to c64 but at the end
we will have to emulate c64 more and more and the result will be [VICE](https://vice-emu.sourceforge.io/).

So yes. You can make your c64 basic program to real windows executable that will run as fast as possible but only if you use
real basic commands and do not assume c64 hardware.

Anyway there are a lot of teaching and fun c64 basic programs that are indeed not using hardware tricks.
[C64 Example Programs](https://github.com/robfromoz/C64-BASIC)
So you can also have a lot fun with it.


