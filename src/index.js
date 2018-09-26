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

var defaultOptions = {
  class: 'user-is-tabbing',
}

function isString(text) {
  return typeof options === 'string' && options.length
}

function checkOptions(options) {
  if (typeof isString(options)) {
    return Object.assign({}, defaultOptions, { class: options })
  }
  if (!typeof options === 'object') return Object.assign({}, defaultOptions)
  return {
    class: isString(options.class) ? options.class : defaultOptions.class,
  }
}

export default function accessibleFocusRing(options) {
  options = checkOptions(options)

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key
      document.body.classList.add(options.class)
      window.removeEventListener('keydown', handleFirstTab)
    }
  }
  window.addEventListener(
    'keydown',
    handleFirstTab,
    passiveSupported ? { passive: true } : false
  )
}
