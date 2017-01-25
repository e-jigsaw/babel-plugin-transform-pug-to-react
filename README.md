babel-plugin-transform-pug-to-react
====================================

[![Greenkeeper badge](https://badges.greenkeeper.io/e-jigsaw/babel-plugin-transform-pug-to-react.svg)](https://greenkeeper.io/)

Babel plugin for pug to react

[![npm version](https://badge.fury.io/js/babel-plugin-transform-pug-to-react.svg)](http://badge.fury.io/js/babel-plugin-transform-pug-to-react) [![wercker status](https://app.wercker.com/status/339b819cccde17da5bd11b4968df2df2/s/master "wercker status")](https://app.wercker.com/project/byKey/339b819cccde17da5bd11b4968df2df2)
[![dependency Status](https://david-dm.org/e-jigsaw/babel-plugin-transform-pug-to-react/status.svg)](https://david-dm.org/e-jigsaw/babel-plugin-transform-pug-to-react) [![devDependency Status](https://david-dm.org/e-jigsaw/babel-plugin-transform-pug-to-react/dev-status.svg)](https://david-dm.org/e-jigsaw/babel-plugin-transform-pug-to-react#info=devDependencies)

# Usage

```js
pug`.simple(data='{yoyo}')`

// compiles to

React.createElement("div", {
  data: yoyo,
  className: "simple"
});
```

## Difference from pug

http://jade-lang.com/reference

### Attributes

`some='{this.props.some}'`

### Case

```js
switch (this.props.some) {
  case 'a': {
    return pug`p hoge`
  }
  case 'b': {
    return pug`p fuga`
  }
}
```

### Code

```js
this.props.xs.map((x) => {
  return pug`p(x='{x}')`
})
```

### Comments

If you want.

### Conditionals

```js
if (this.props.some) {
  return pug`p xxx`
} else {
  return pug`p yyy`
}
```

### Doctype

If you want.

### Extends

?

### Filters

?

### Includes

?

### Template inheritance

?

### Interpolation

Do not use

### Iteration

```js
this.props.xs.map((x) => {
  return pug`p(x='{x}')`
})
```

### Mixins

?

### Plain Text

:+1:

### Tags

?

### Nested

Use with backslash

```js
pug`
  div {xs.map(x => pug\`span {x}\`)}
`
```

## With Browserify

```sh
$ browserify -t [ babelify --plugins [ transform-pug-to-react ] ] file
```

with ES2015

Example:

```js
import React from 'react'
import Foo from './foo.js'

export default class App extends React.Component {
  constructor () {
    super()
  }

  render () {
    return pug`
      .awesome#app
        Foo
    `
  }
}
```

```sh
$ browserify -t [ babelify --plugins [ transform-pug-to-react ] --presets [ es2015 ] ] file
```

# Installation

```sh
% npm install babel-plugin-transform-pug-to-react
```

# Requirements

* Node.js

# Build

```sh
% npm run build
```

# Test

```sh
% npm test
```

# Author

* jigsaw (http://jgs.me, [@e-jigsaw](http://github.com/e-jigsaw))

# License

MIT

The MIT License (MIT)

Copyright (c) 2016 Takaya Kobayashi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
