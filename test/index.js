const test = require('tape')
const {transform} = require('babel-core')
const {readFileSync} = require('fs')
const {resolve} = require('path')

const loadFixture = filename => {
  return readFileSync(
    resolve(__dirname, `./fixture/${filename}`)
  ).toString()
}

let plugin = resolve(__dirname, '../src/index.js')

if (process.env.CI === 'true') {
  plugin = resolve(__dirname, '../build/index.js')
}

test('Transform pug literal', t => {
  t.plan(1)
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
  t.plan(1)
  const complex = loadFixture('complex')
  const res = transform(complex, {
    plugins: [plugin]
  })
  t.is(res.code, `React.createElement(
  "div",
  { className: "complex", data: yoyo },
  React.createElement(Foo, { fuga: this.props.fuga }),
  React.createElement(Bar, { bar: this.props.bar }),
  React.createElement("input", { id: "id", required: "required" }),
  React.createElement("label", { htmlFor: "id" }),
  React.createElement("div", { id: "piyo", style: this.getStyle() })
);`)
})

test('Transform pug literal(indent)', t => {
  t.plan(1)
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

test('Transform pug literal(indent1)', t => {
  t.plan(1)
  const indent1 = loadFixture('indent1')
  const res = transform(indent1, {
    plugins: [plugin]
  })
  t.is(res.code, `React.createElement("div", { className: "foo" });`)
})

test('Transform nested', t => {
  t.plan(1)
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

test('Transform nested', t => {
  t.plan(1)
  const nested = loadFixture('comment')
  const res = transform(nested, {
    plugins: [plugin]
  })
  t.is(
    res.code,
    `{/* comment*/}React.createElement(
  "div",
  { className: "comment" },
  React.createElement("div", { className: "foo" })
);`)
})
