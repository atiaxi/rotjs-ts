# rotjs-ts

This repo is a port of the [RotJS tutorial on RogueBasin](http://www.roguebasin.com/index.php?title=Rot.js_tutorial) to Typescript.
Additionally, it demonstrates how to use webpack on the result for easy packaging.

## Differences from the tutorial

* This codebase is as of the end of the tutorial series, meaning that if you're following along, you're likely to see items
  that have changed later.

* Rather than use the arrow keys, I explicitly use the numeric keypad keys.  Additionally, I use the `VK_` constants
  instead of the magic numbers that the tutorial includes.

* To demonstrate that webpack is doing its job, I put `Player` and `Game` in separate files.  Accordingly, the currently
  running `Game` is not global, and is instead passed as an argument to the `Player` class.

* Many javascript-specific idioms were changed to match Typescript, e.g. I don't use the leading underscore to indicate
  "private" accessibility, but instead use the `private` keyword (or, in some places, `protected`).

## A word on the typings

The `rot.d.ts` file included in `src/types` is based on [this repository](https://github.com/willardf/rot.d.ts/blob/master/rot.d.ts)
with portions of [this repository](https://github.com/d3is/rot.js-TS/blob/master/rot.d.ts), and a number of additions by myself.
It is still incomplete, however.  I will (hopefully) expand it over time.
