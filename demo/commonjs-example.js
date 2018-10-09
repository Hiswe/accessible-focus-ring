'use strict'

var focusRing = require('../dist/focus-ring.js')
// Parcel bundler doesn't export like rollup => .default
var onTab = require('./on-tab').default

focusRing({ onTab: onTab })
