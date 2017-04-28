const {render} = require('pug')
const {transform} = require('babel-core')
const transformInlineStyle = require('./inline-style-transformer');

module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression (path, state) {
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
          const _html = transformInlineStyle(html);
          const {ast} = transform(_html, {
            presets: ['react']
          })
          path.replaceWithMultiple(ast.program.body)
        }
      }
    }
  }
}
