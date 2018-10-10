import test from 'ava'

import {
  isString,
  isFunction,
  defaultOptions,
  checkOptions,
} from './check-configuration'

test(`no arguments`, t => {
  t.deepEqual(checkOptions(), defaultOptions, `return default option`)
})

test(`wrong arguments type`, t => {
  // @ts-ignore
  t.deepEqual(checkOptions(false), defaultOptions, `return default option`)
  // @ts-ignore
  t.deepEqual(
    // @ts-ignore
    checkOptions(() => {}),
    defaultOptions,
    `return default option for function`
  )
  t.deepEqual(
    // @ts-ignore
    checkOptions([]),
    defaultOptions,
    `return default option for array`
  )
})

test(`can set class`, t => {
  const config = { class: `clapou` }
  const options = checkOptions(config)
  t.deepEqual(
    checkOptions(options),
    { class: config.class, onTab: defaultOptions.onTab },
    `class is updated`
  )
})

test(`can set callback`, t => {
  const config = { onTab() {} }
  const options = checkOptions(config)
  t.deepEqual(
    checkOptions(options),
    { class: defaultOptions.class, onTab: config.onTab },
    `onTab callback is updated`
  )
})

test(`utils - isString`, t => {
  t.true(isString(`pouic`), `ok on regular string`)
  t.false(isString(``), `false on empty string`)
  t.false(isString(false), `false on empty string`)
})

test(`utils - isFunction`, t => {
  t.true(isFunction(() => {}), `ok on function`)
  t.false(isFunction(false), `false on boolean`)
  t.false(isFunction({}), `false on object`)
  t.false(isFunction([]), `false on array`)
})
