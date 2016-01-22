import {render} from 'jade'
import {transform} from 'babel-core'

export default function ({types: t}) {
  return {
    visitor: {
      TemplateLiteral (path, state) {
        if (path.parent.tag !== undefined) {
          if (path.parent.tag.name === 'jade') {
            const {raw} = path.node.quasis[0].value
            const html =
              render(raw)
                .replace(/"\{/g, '{').replace(/\}"/g, '}')
                .replace(/class="/g, 'className="').replace(/for="/, 'htmlFor="')
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
