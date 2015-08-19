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

test('should pass the rest of the url to a subroute', ({equal, plan}) => {
  const App = router({
    '/user/:user': {
      render({props}) {
        equal(props.params.user, 'test')
        equal(props.url, '/subroute/subroute2')
      }
    }
  })

  plan(2)
  create(<App url='/user/test/subroute/subroute2' />)
})

test('should nest routes', ({pass, fail, plan}) => {
  const App = router({
    '/user/:user': router({
      '/profile': {
        render () {
          pass()
        }
      },
      '/feed': {
        render () {
          fail()
        }
      }
    })
  })

  plan(1)
  create(<App url='/user/test/profile' />)
})

/**
 * Helpers
 */

function create (component) {
  renderString(tree(component))
}
