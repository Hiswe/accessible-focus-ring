// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
var passiveSupported = false

/* istanbul ignore next */
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

function accessibleFocusRing(options) {
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing')
      window.removeEventListener(
        `keydown`,
        handleFirstTab,
        passiveSupported ? { passive: true } : false
      )
    }
  }
  window.addEventListener(`keydown`, handleFirstTab)
}
