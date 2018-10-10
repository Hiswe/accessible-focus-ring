import { Configuration, checkOptions } from './check-configuration'
import * as eventListener from './tab-event-listener'

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
  eventListener.add(handleFirstTab)
}
