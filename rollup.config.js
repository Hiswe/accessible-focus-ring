import merge from 'lodash.merge'
import { uglify } from 'rollup-plugin-uglify'

const NAME = `accessible-focus-ring`

const baseConfig = {
  input: `src/index.js`,
  output: {
    format: `umd`,
    name: `accessibleFocusRing`,
  },
}

const npmConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.js`,
  },
})

const minConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.min.js`,
  },
  plugins: [uglify()],
})

export default [npmConfig, minConfig]
