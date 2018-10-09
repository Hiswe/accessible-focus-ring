import merge from 'lodash.merge'
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'

const NAME = `focus-ring`

const baseConfig = {
  input: `src/index.ts`,
  output: {
    format: `umd`,
    name: `focusRing`,
  },
}

const npmConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.js`,
  },
  plugins: [typescript()],
})

const minConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.min.js`,
  },
  plugins: [typescript(), uglify()],
})

export default [npmConfig, minConfig]
