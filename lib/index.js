/**
 * Imports
 */

import matcher from './matcher'

/**
 * Router
 */

function router (routes) {
  const match = matcher(routes)

  return function (prevUrl, prevParams={}, ...args) {
    const {route, params={}, url=''} = match(prevUrl)
    const context = {url, params: {...prevParams, ...params}}

    return route(context, ...args)
  }
}

/**
 * Exports
 */

export default router