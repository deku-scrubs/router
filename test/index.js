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

test('should work', function ({equal, fail, plan}) {
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

/**
 * Helpers
 */

function create (component) {
  renderString(tree(component))
}
