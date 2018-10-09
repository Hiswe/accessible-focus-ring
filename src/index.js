// passive event support
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
var passiveSupported = false

try {
  var options = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true
    },
  })

  window.addEventListener('test', options, options)
  window.removeEventListener('test', options, options)
} catch (err) {
  passiveSupported = false
}

var defaultOptions = Object.freeze({
  class: 'user-not-tabbing',
  onTab: noop,
})

function noop() {}

function isString(text) {
  return typeof text === 'string' && text.length
}

function checkOptions(options) {
  if (!typeof options === 'object') return defaultOptions
  return {
    class: isString(options.class) ? options.class : defaultOptions.class,
    onTab:
      typeof options.onTab === 'function'
        ? options.onTab
        : defaultOptions.onTab,
  }
}

export default function accessibleFocusRing(options) {
  options = checkOptions(options)
  document.body.classList.add(options.class)

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key
      document.body.classList.remove(options.class)
      options.onTab()
      window.removeEventListener('keydown', handleFirstTab)
    }
  }
  window.addEventListener(
    'keydown',
    handleFirstTab,
    passiveSupported ? { passive: true } : false
  )
}
