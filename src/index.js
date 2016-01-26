const {render} = require('jade')
const {transform} = require('babel-core')

module.exports = function () {
  return {
    visitor: {
      TemplateLiteral (path, state) {
        if (path.parent.tag !== undefined) {
          if (path.parent.tag.name === 'jade') {
            const {raw} = path.node.quasis[0].value
            const html =
              render(raw)
                .replace(/"\{/g, '{').replace(/\}"/g, '}')
                .replace(/class="/g, 'className="').replace(/for="/g, 'htmlFor="')
            const {code} = transform(html, {
              presets: ['react']
            })
            path.parentPath.replaceWithSourceString(code.replace(/;/g, ''))
          }
        }
      }
    }
  }
}
