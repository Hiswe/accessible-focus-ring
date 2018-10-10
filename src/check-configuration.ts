import Callback from './Callback'

function isString(text: any): boolean {
  return typeof text === `string` && text.length > 0
}

function isFunction(f: any): boolean {
  return typeof f === `function`
}

export interface Configuration {
  class?: string
  onTab?: Callback
}

const defaultOptions: Configuration = Object.freeze({
  class: `user-not-tabbing`,
  onTab: function noop() {},
})

export function checkOptions(options: Configuration): Configuration {
  const safeOptions: Configuration = { ...defaultOptions }
  if (isString(options.class)) safeOptions.class = options.class
  if (isFunction(options.onTab)) safeOptions.onTab = options.onTab
  return safeOptions
}
