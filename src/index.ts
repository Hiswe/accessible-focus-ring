import { FunctionDeclaration } from 'babel-types'

// passive event support
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
let passiveSupported: boolean = false

try {
  const options = Object.defineProperty({}, `passive`, {
    get(): void {
      passiveSupported = true
    },
  })

  window.addEventListener(`test`, options, options)
  window.removeEventListener(`test`, options, options)
} catch (err) {
  passiveSupported = false
}

function isString(text: any): boolean {
  return typeof text === `string` && text.length > 0
}

function isFunction(f: any): boolean {
  return typeof f === `function`
}

type Callback = () => any

interface Configuration {
  class?: string
  onTab?: Callback
}

const defaultOptions: Configuration = Object.freeze({
  class: 'user-not-tabbing',
  onTab: function noop() {},
})

function checkOptions(options: Configuration): Configuration {
  const safeOptions: Configuration = { ...defaultOptions }
  if (isString(options.class)) safeOptions.class = options.class
  if (isFunction(options.onTab)) safeOptions.onTab = options.onTab
  return safeOptions
}

export default function focusRing(options?: Configuration): void {
  options = checkOptions(options)
  document.body.classList.add(options.class)
  function handleFirstTab(e: any): void {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key
      document.body.classList.remove(options.class)
      options.onTab()
      window.removeEventListener(`keydown`, handleFirstTab)
    }
  }
  window.addEventListener(
    `keydown`,
    handleFirstTab,
    passiveSupported ? { passive: true } : false
  )
}
