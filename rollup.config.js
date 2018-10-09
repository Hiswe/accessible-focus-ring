import merge from 'lodash.merge'
import { uglify } from 'rollup-plugin-uglify'

const NAME = `focus-ring`

const baseConfig = {
  input: `src/index.js`,
  output: {
    format: `umd`,
    name: `focusRing`,
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
