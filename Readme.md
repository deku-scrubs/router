
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

## Installation

    $ npm install @deku-scrubs/router

