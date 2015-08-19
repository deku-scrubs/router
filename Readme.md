
# router

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Simple, functionally pure deku router component

## Usage

`router` accepts a mapping of express-style route patterns to components, and returns a component that accepts a single `url` prop.  Based on its url prop, it renders the appropriate components, passing the parameters parsed out of the url in the `params` prop to the component.

```javascript
import router from '@deku-scrubs/router'
import User from 'pages/user'
import Home from 'pages/home'

const App = router({
  '/user/:user': User,
  '/': Home
})

export default App
```


```javascript
import App from './app'

const propTypes = {
  url: {
    source: 'url'
  }
}

function render ({props}) {
  return (
    <App url={props.url} />
  )
}
```

## Nesting

You may also nest router components.  In addition to `params`, your page components will receive a `url` prop, which contains the remaining portion of the url.

```javascript
const App = router({
  '/user/:user': router({
    '/profile': Profile,
    '/feed': Feed
  })
})
```

Though you don't have to nest them immediately next to each other in the tree like this.  They can be arbitrarily separated - you just need to propagate down the remaining url portion.

## Installation

    $ npm install @deku-scrubs/router

