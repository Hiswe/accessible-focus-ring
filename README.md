# accessible-focus-ring

remove the focus-ring while staying accessible
for `1.4 kB` gzipped, including JS & CSS

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [the problem](#the-problem)
- [use](#use)
  - [as a global variable](#as-a-global-variable)
  - [as a NPM module](#as-a-npm-module)
- [configuration](#configuration)
  - [class](#class)
  - [onTab](#ontab)
- [other stuff](#other-stuff)
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

You could import the default CSS

then

**commonJS**

```js
var focusRing = require('focus-ring')
focusRing()
```

**ES module**

```js
import focusRing from 'focus-ring'
focusRing()
```

## configuration

`focus-ring` allows you to have more control by passing a configuration object.

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

⚠️ Changing the class won't update the CSS file.  
**You will have to provide your own.**

#### onTab

**type:** `function`  
**default:** `function noop(){}`

you can specify a callback which will be called after the first user tab

## other stuff

### thanks

- [David Gilbertson](https://hackernoon.com/@david.gilbertson) for the snippet
