/**
 * Router matcher generator
 */

function matcher (routes) {
  const compiledRoutes = compile(routes)

  return function (url) {
    for (const i in compiledRoutes) {
      const [match, route] = compiledRoutes[i]

      if (match.check(url)) {
        return {
          route,
          ...match.process(url)
        }
      }
    }

    return {}
  }
}

/**
 * Compile our pattern matchers
 */

function compile (routes) {
  return Object
    .keys(routes)
    .map(pattern => [toMatcher(pattern), routes[pattern]])
}

/**
 * Take a pattern string, and turn it into a pair of functions
 * that test to see if a string is a match, and if so process
 * it into a parameter map
 */

function toMatcher (pattern='') {
  const parts = pattern.split('/')
  const reStr = '^' + parts
    .map(componentRegex)
    .join('\/') + '(\/.+)?$'

  const re = new RegExp(reStr)
  const named = parts
    .filter(part => part[0] === ':')
    .map(part => part.slice(1))

  return {
    check: url => re.test(url),
    process: url => {
      const args = re.exec(url).slice(1)
      const rest = args.length > named.length ? args.pop() : ''
      const params = args.reduce((memo, arg, idx) => {
        memo[named[idx]] = arg
        return memo
      }, {})

      return {
        params,
        url: rest
      }
    }
  }
}

/**
 * Translate a pattern component into a regex
 */

function componentRegex (part) {
  if (part[0] === ':')
    return '([^\/]+)'
  if (part === '*')
    return '.*'

  return part
}

/**
 * Exports
 */

export default matcher
