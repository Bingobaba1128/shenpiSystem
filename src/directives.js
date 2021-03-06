// directives.js
import Vue from 'vue'

Vue.directive('enterNumber2', {
  inserted: function(el) {
    alert('is me')

    el.addEventListener('keypress', function(e) {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (charcode == 46) {
        if (el.value.includes('.')) {
          e.preventDefault()
        }
        return
      } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
})
