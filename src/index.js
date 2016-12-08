const {render} = require('pug')
const {transform} = require('babel-core')

module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression (path, state) {
        if (path.node.tag.name === 'pug') {
          const {raw} = path.node.quasi.quasis[0].value
          const splitedRaw = raw.trimRight().split('\n').filter((str) => {return str !== ''})
          const rootIndent = /^\s*/.exec(splitedRaw[0])[0]
          const fixedRaw = splitedRaw.map((raw) => {
            const spaceRegExp = new RegExp(`^${rootIndent}`)
            return raw.replace(spaceRegExp, '')
          }).join('\n')
          const html =
            render(fixedRaw)
              .replace(/"\{/g, '{').replace(/\}"/g, '}')
              .replace(/class="/g, 'className="').replace(/for="/g, 'htmlFor="')
              .replace(/\\\`/g, '`')
          const {ast} = transform(html, {
            presets: ['react']
          })
          path.replaceWithMultiple(ast.program.body)
        }
      }
    }
  }
}
