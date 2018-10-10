import Callback from './Callback'

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

export function add(handleFirstTab: Callback): void {
  window.addEventListener(
    `keydown`,
    handleFirstTab,
    passiveSupported ? { passive: true } : false
  )
}
