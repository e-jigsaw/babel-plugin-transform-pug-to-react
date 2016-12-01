import test from 'ava'
import {transform} from 'babel-core'
import {readFileSync} from 'fs'
import {resolve} from 'path'

const loadFixture = filename => {
  return readFileSync(
    resolve(__dirname, `./fixture/${filename}`)
  ).toString()
}

let plugin = '../src/index'

if (process.env.CI === 'true') {
  plugin = '../build/index'
}

test('Transform pug literal', t => {
  const simple = loadFixture('simple')
  const res = transform(simple, {
    plugins: [plugin]
  })
  t.is(
    res.code,
    `React.createElement("div", { className: "simple", data: yoyo });`
  )
})

test('Transform pug literal(complex)', t => {
  const complex = loadFixture('complex')
  const res = transform(complex, {
    plugins: [plugin]
  })
  t.is(res.code, `React.createElement(
  "div",
  { className: "complex", data: yoyo },
  React.createElement(Foo, { fuga: this.props.fuga }),
  React.createElement(Bar, { bar: this.props.bar }),
  React.createElement("input", { id: "id", required: "required"
  }),
  React.createElement("label", { htmlFor: "id" })
);`)
})

test('Transform pug literal(indent)', t => {
  const indent = loadFixture('indent')
  const res = transform(indent, {
    plugins: [plugin]
  })
  t.is(res.code, `React.createElement(
  "div",
  { className: "indent", data: yoyo },
  React.createElement(Foo, { fuga: this.props.fuga }),
  React.createElement(
    Bar,
    { bar: this.props.bar },
    React.createElement("input", { id: "id", required: "required" }),
    React.createElement("label", { htmlFor: "id" })
  )
);`)
})

test('Transform nested', t => {
  const nested = loadFixture('nested')
  const res = transform(nested, {
    plugins: [plugin]
  })
  t.is(
    res.code,
    `React.createElement(
  "div",
  { className: "nested" },
  foo.map(bar => React.createElement(
    "span",
    null,
    bar
  ))
);`)
})
