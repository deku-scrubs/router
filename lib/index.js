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
      const {Page, params, url} = match(props.url)
      return (
        <Page {...props} params={params} url={url} />
      )
    }
  }
}

/**
 * Exports
 */

export default router