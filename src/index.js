const {render} = require('pug')
const {transform, traverse} = require('babel-core')

const TaggedTemplateExpression = (path, state={}) => {
  if (path.node.tag.name === 'pug') {
    const {raw} = path.node.quasi.quasis[0].value
    const splitedRaw = raw.split('\n').filter(str =>
      str !== '' && str.match(/^\s*$/g) === null
    )
    const rootIndent = /^\s*/.exec(splitedRaw[0])[0]
    const fixedRaw = splitedRaw.map(raw => {
      const spaceRegExp = new RegExp(`^${rootIndent}`)
      return raw.replace(spaceRegExp, '')
    }).join('\n')
    const html =
      render(fixedRaw, state.opts)
        .replace(/"\{/g, '{').replace(/\}"/g, '}').replace(/\};"/g, '}')
        .replace(/class="/g, 'className="').replace(/for="/g, 'htmlFor="')
        .replace(/\\\`/g, '`')
        .replace(/<!--/g, '{/*')
        .replace(/-->/g, '*/}')
    const {ast} = transform(html, {
      presets: ['react']
    })
    if(ast.tokens.some(({value}) => value === 'pug'))
      traverse(ast, {TaggedTemplateExpression})
    path.replaceWithMultiple(ast.program.body)
  }
}

module.exports = function () {
  return {visitor: {TaggedTemplateExpression}}
}
