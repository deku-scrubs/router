/**
 * Imports
 */

import test from 'tape-catch'
import router from '..'

/**
 * Tests
 */

test('should work', ({equal, fail, plan}) => {
  const App = router({
    '/user/:user': (url, params) => equal(params.user, 'test'),
    '/otherThing': () => fail
  })

  plan(1)
  App('/user/test')
})

test('should pass the rest of the url to a subroute', ({equal, plan}) => {
  const App = router({
    '/user/:user': (url, params) => {
      equal(params.user, 'test')
      equal(url, '/subroute/subroute2')
    }
  })

  plan(2)
  App('/user/test/subroute/subroute2')
})

test('should nest routes', ({pass, fail, plan}) => {
  const App = router({
    '/user/:user': router({
      '/profile': () => pass(),
      '/feed': () => fail()
    })
  })

  plan(1)
  App('/user/test/profile')
})