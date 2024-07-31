# This is Basic Compiler-64 

It reimplement parts of C64 Basic as langium DSL project.
The project contains

* C64 Basic language server
* Visual Studio C64 Basic plugin
* Compiler for C64 that produce mingwn 64-bit assembler

It is fun project. I have made it to learn langium, x84 assembly language and build my first compiler.

# Setup and install

You need node js
Use npm or pnpm

* pnpm install
* pnpm run langium: generate
* pnpm run build

# HOW TO Run

From visual studion code

* rebuild language: pnpm run langium:generate
* pnpm run build
* lunch debugger from visuals studio code. Open c64b file (see examples)

# TODO 

## Gramatik Langium

* DATA O-W,

## Functionality to implement compile

* float zahlen
* string concatination
* BILDSCHIRM SPC, POS, TAB
* IF ... GOTO
* System Variable TI (Time) TIME$
* OPEN, GET#, INPUT#, CLOSE, PRINT#
* Zeilen nummer

## Langium Funktionalität

* Benutzung der Variable for Validierung
* Probleme mit FOR NEXT
* Falsche Benutzung der Variablen (Syntax Error)
* Formatierung
  * Crunch
  * DeCrunch
* Tool Tips
* Basic Original Laden
* Basic Original Speichern

## Valdierung

* Unbenutzte Labels
* Unbenutzte Variablen
* Ein For ohne Next
* GOSUB ohne RETURN
* Unpassende Next
* Falsche Indexe
* Nicht eindeutige Variable Namen

# Compilation to 64 bit GAS

## String Implementierung

* Bei Variable zuweisung muss neues speicher zugewiesen werden
  * Speicher nie freigeben
  * Sonst immer freigeben
  * Besser Referenz Zähler
* Lokalen Buffer für concat benutzen bcc data bloc
* 