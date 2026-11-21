---
title: "Flick"
summary: "A statically typed programming language with a compiler written in Rust, an LLVM backend, and a browser sandbox for running it."
date: 2024-09-21
tags:
  - Rust
  - LLVM
  - Compilers
  - Docker
demoUrl: https://flick-lang.com/?utm_source=max_larsson_portfolio&utm_medium=referral
repoUrl: https://github.com/flick-lang/flick
---

Flick is a programming language that [Thomas Breydo](https://www.thomasbreydo.com/) and I started in April 2022 because we wanted to understand how compilers actually work. Reading about lexers and parsers only gets you so far, so we wrote our own language from scratch: the syntax, the type system, and a compiler in Rust that turns Flick source into a native executable. You can try it in the browser at [flick-lang.com](https://flick-lang.com/?utm_source=max_larsson_portfolio&utm_medium=referral), and the compiler is open source at [github.com/flick-lang/flick](https://github.com/flick-lang/flick).

![The Flick sandbox running a recursive Fibonacci program, with the output 0 1 1 2 3 5 8 13 in the console beside the editor](../../assets/flick.png)

## The language

Flick borrows its look from Rust, with a few choices of our own. Types come before names, statements end at the newline rather than a semicolon, and `ret` returns a value. It is statically typed with type inference, and integers can be any width, so `u8`, `i64`, and `i11` are all valid types. Functions can be called before they are defined, and `extern` declarations let a Flick program call into C, which is how the example below prints characters with `putchar`.

```rust
extern fn putchar(u8 c) u8

fn fib(u64 n) u64 {
    if n == 0 {
        ret 0
    } else if n == 1 {
        ret 1
    }

    ret fib(n-1) + fib(n-2)
}
```

The language is deliberately small. It has functions, variables, integer arithmetic, comparisons, `if`/`else`, and `while` loops. That is enough to be Turing-complete and enough to write real programs like factorial, Fibonacci, and a routine that prints a number digit by digit, while keeping the whole compiler readable.

## The compiler

The lexer walks the source text and produces tokens. A hand-written recursive-descent parser turns those tokens into an abstract syntax tree. The typer then walks the tree with a scope manager that tracks which names are visible where, checks every expression, rejects mismatched types and undefined identifiers, and produces a second, fully typed tree. It registers every function signature before it looks at any function body, which is what allows calls to functions defined later in the file.

The last stage walks the typed tree and emits LLVM IR. LLVM handles optimization and code generation for the target machine and writes an object file, and the compiler finishes by invoking a linker to produce an executable. Passing `--emit-ir` prints the generated IR, which was the single most useful debugging tool we had.

Splitting typing from code generation was the best structural decision in the project. Early versions tried to check types while emitting IR, and every new feature made that code harder to reason about. Once the typer produced its own tree, the code generator could assume its input was correct and became much simpler.

## The sandbox

A language nobody can run is hard to show to anyone, so we built [flick-lang.com](https://flick-lang.com/?utm_source=max_larsson_portfolio&utm_medium=referral).

Running a stranger's code on your own server is the interesting part. The frontend is a Next.js app that opens a WebSocket to a FastAPI backend on AWS EC2. The backend hands the source to a Docker container, which compiles it with the real Flick compiler and runs the resulting binary. The container has no network access and no access to the disk, each run is killed after five seconds, and the program is deleted afterwards. Output streams back over the WebSocket as the program runs.

## What I took from it

Flick is where I first had to think about a program as a series of representations rather than a single piece of logic. It also changed how I read compiler errors: having written the code that produces them, I now have a much better idea of what the compiler knew at the point where it gave up.
