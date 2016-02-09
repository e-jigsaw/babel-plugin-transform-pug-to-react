const {render} = require('jade')
const {transform} = require('babel-core')

module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression (path, state) {
        if (path.node.tag.name === 'jade') {
          const {raw} = path.node.quasi.quasis[0].value
          const splitedRaw = raw.split('\n').filter((str) => {return str !== ''})
          const rootIndent = /^\s*/.exec(splitedRaw[0])[0]
          const fixedRaw = splitedRaw.map((raw) => {
            const spaceRegExp = new RegExp(`^${rootIndent}`)
            return raw.replace(spaceRegExp, '')
          }).join('\n')
          const html =
            render(fixedRaw)
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
