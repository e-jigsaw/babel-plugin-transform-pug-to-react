const {render} = require('jade')
const {transform} = require('babel-core')

module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression (path, state) {
        if (path.node.tag.name === 'jade') {
          const {raw} = path.node.quasi.quasis[0].value
          const html =
            render(raw)
              .replace(/"\{/g, '{').replace(/\}"/g, '}')
              .replace(/class="/g, 'className="').replace(/for="/g, 'htmlFor="')
          const {code} = transform(html, {
            presets: ['react']
          })
          path.replaceWithSourceString(code.replace(/;/g, ''))
        }
      }
    }
  }
}
