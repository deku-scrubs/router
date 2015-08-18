/**
 * Imports
 */

import test from 'tape-catch'
import {tree, renderString} from 'deku'
import element from 'virtual-element'
import router from '..'

/**
 * Tests
 */

test('should work', ({equal, fail, plan}) => {
  const App = router({
    '/user/:user': {
      render ({props}) { equal(props.params.user, 'test') }
    },
    '/otherThing': {
      render () { fail() }
    }
  })

  plan(1)
  create(<App url='/user/test' />)
})

test('should pass the rest of the url to a wildcard route', ({equal, plan}) => {
  const App = router({
    '/user/:user/*': {
      render({props}) {
        equal(props.params.user, 'test')
        equal(props.rest, '/subroute/subroute2')
      }
    }
  })

  plan(2)
  create(<App url='/user/test/subroute/subroute2' />)
})

/**
 * Helpers
 */

function create (component) {
  renderString(tree(component))
}
