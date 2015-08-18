/**
 * Imports
 */

import element from 'virtual-element'
import matcher from './matcher'

/**
 * Router meta-component
 */

function router (routes) {
  const match = matcher(routes)

  return {
    render (component) {
      const {props} = component
      const {Page, params, rest} = match(props.url)
      return <Page params={params} rest={rest} />
    }
  }
}

/**
 * Exports
 */

export default router