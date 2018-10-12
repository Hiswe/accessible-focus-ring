# accessible-focus-ring

[![npm version](https://badge.fury.io/js/%40hiswe%2Ffocus-ring.svg)](https://badge.fury.io/js/%40hiswe%2Ffocus-ring)

remove the focus-ring while staying accessible
for `1.5kb` (`0.65 kB` gzipped), including JS & CSS

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [the problem](#the-problem)
- [use](#use)
  - [as a global variable](#as-a-global-variable)
  - [as a NPM module](#as-a-npm-module)
  - [styling files](#styling-files)
- [configuration](#configuration)
  - [class](#class)
  - [onTab](#ontab)
- [demo](#demo)
  - [github pages](#github-pages)
  - [local](#local)
- [other stuff](#other-stuff)
  - [run the tests](#run-the-tests)
  - [thanks](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## the problem

Focus rings on elements are mostly not wanted on mobile.
But they are good for accessibility!

So we remove it until someone use the `tab` key.

See this [hackernoon article](https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2) by [David Gilbertson](https://hackernoon.com/@david.gilbertson) for more details.

## use

### as a global variable

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@hiswe/focus-ring/dist/focus-ring.min.css">
  <script src="https://unpkg.com/@hiswe/focus-ring/dist/focus-ring.min.js"></script>
</head>
<body>
  <script>
    (function () {
      focusRing()
    }());
  </script>
</body>
```

### as a NPM module

```sh
npm install @hiswe/focus-ring
```

**commonJS**

```js
const focusRing = require('@hiswe/focus-ring')
focusRing()
```

**ES module**

```js
import focusRing from '@hiswe/focus-ring'
focusRing()
```

### styling files

this package provides 2 styling files:

```
@hiswe/focus-ring/dist/focus-ring.min.css
@hiswe/focus-ring/dist/focus-ring.scss
```

if you're using the SCSS files you can override the class used by setting:

```scss
$focus-ring-selector: '.my-custom-selector';
```

## configuration

`focus-ring` allows you to have more control by passing a configuration object:

```js
focusRing({
  class: 'user-not-tabbing',
  onTab: function noop() {},
})
```

#### class

**type:** `string`  
**default:** `'user-not-tabbing'`

Change the CSS class name.

⚠️ **Changing the class won't update the CSS file.**

You will have to:

- provide your own
- or use & configure the `scss` file

#### onTab

**type:** `function`  
**default:** `function noop(){}`

you can specify a callback which will be called after the first user tab

## demo

### github pages

https://hiswe.github.io/accessible-focus-ring/

### local

you'll need [node](https://nodejs.org/en/)

- clone the project
- `npm install`
- `npm start`
- go to: http://localhost:8080

## other stuff

### run the tests

- clone the project
- `npm install`
- `npm test`

### thanks

- [David Gilbertson](https://hackernoon.com/@david.gilbertson) for the snippet
