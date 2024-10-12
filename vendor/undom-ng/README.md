# undom-ng

[![NPM](https://img.shields.io/npm/v/undom-ng.svg?style=flat)](https://www.npmjs.org/package/undom-ng)

### **The Next Gen minimally viable DOM Document implementation**

**NOTE** THIS IS A FORK OF UNDOM WITH SOME HUGE CHANGES THAT MIGHT NOT FIT THE GOAL OF THE [ORIGINAL PROJECT](https://github.com/developit/undom).

> A bare-bones HTML DOM in a box. If you want the DOM but not a parser, this might be for you.
>
> Works in Node and browsers, plugin ready!

---


## Project Goals

Undom aims to find a sweet spot between size/performance and utility. The goal is to provide the simplest possible implementation of a DOM Document, such that libraries relying on the DOM can run in places where there isn't one available.

The intent to keep things as simple as possible means undom lacks some DOM features like HTML parsing & serialization, Web Components, etc. These features can be added through additional libraries.


---


## Installation

Via npm:

`npm install undom-ng`


---

## Derivatives

[DOMiNATIVE](https://github.com/SudoMaker/DOMiNATIVE) Generic DOM implementation for [NativeScript](https://nativescript.org/)


---


## Usage

```js
import { createEnvironment, HTMLNS } from 'undom-ng'

const { createDocument } = createEnvironment()

const document = createDocument(HTMLNS, 'html')

const foo = document.createElementNS(HTMLNS, 'foo')
foo.appendChild(document.createTextNode('Hello, World!'))
document.body.appendChild(foo);
```

---


## Serialize to HTML

```js
import { serialize } from 'undom-ng'

console.log(serialize(element))
```
