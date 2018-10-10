import Callback from './Callback'

export function isString(text: any): boolean {
  return typeof text === `string` && text.length > 0
}

export function isFunction(f: any): boolean {
  return typeof f === `function`
}

export interface Configuration {
  class?: string
  onTab?: Callback
}

export const defaultOptions: Configuration = Object.freeze({
  class: `user-not-tabbing`,
  onTab: function noop() {},
})

export function checkOptions(options?: Configuration): Configuration {
  const safeOptions: Configuration = { ...defaultOptions }
  if (typeof options !== `object`) return safeOptions
  if (isString(options.class)) safeOptions.class = options.class
  if (isFunction(options.onTab)) safeOptions.onTab = options.onTab
  return safeOptions
}
