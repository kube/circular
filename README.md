# Circular

## Install

```sh
npm install --save @kube/circular
```


## Introduction

Circular is a TypeScript library that permits creation of circular objects in an easy way.

It allows creation of graphs in a fully declarative way, with correct typings out-of-the-box.

## Usage

```ts
import Circular from '@kube/circular'

const selfishGuy = Circular(self => ({
  name: 'Picsou',
  bestFriend: self
}))
```

This will return you an object.

**N.B.** For now Circular *mutates* the input object, and simply replaces the `self` placeholder by a reference to the input object itself.

## Why



## Type-Inference

Circular infers the correct TypeScript type.

For example, if you define an object like this:

```ts
const john = Circular(john => ({
  name: 'John',
  bestFriend: {
    name: 'Bob',
    bestFriend: john
  }
}))
```

The output type will be equivalent to:

```ts
type Result = {
  name: string,
  bestFriend: {
    name: string,
    bestFriend: Result
  }
}
```

You can also use a type assertion library (like [Typebolt](https://github.com/kube/typebolt)) to verify this:

```ts
import { Assert, IsExactType } from 'tybebolt'

Assert<IsExactType<typeof john, Result>>()
Assert<IsExactType<typeof john, typeof john.bestFriend.bestFriend>>()
```

## Caveats