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
})

function isString(text) {
  return typeof text === 'string' && text.length
}

// class can't be overridden due to no way of specifying a CSS variable as a selector
function checkOptions(options) {
  if (typeof isString(options)) return { class: defaultOptions.class }
  if (!typeof options === 'object') return defaultOptions
  return {
    class: defaultOptions.class,
  }
}

export default function accessibleFocusRing(options) {
  options = checkOptions(options)

  document.body.classList.add(options.class)

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key
      document.body.classList.remove(options.class)
      window.removeEventListener('keydown', handleFirstTab)
    }
  }
  window.addEventListener(
    'keydown',
    handleFirstTab,
    passiveSupported ? { passive: true } : false
  )
}
