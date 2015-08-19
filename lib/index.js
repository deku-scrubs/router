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
    render ({props}) {
      const {route, params, url} = match(props.url)
      const Page = route(props.meta, params)

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