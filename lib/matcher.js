/**
 * Router matcher generator
 */

function matcher (routes) {
  const compiledRoutes = compile(routes)

  return function (url) {
    console.log('asdfasdf', url)

    for (const i in compiledRoutes) {
      const [match, Page] = compiledRoutes[i]

      console.log('check', url, match.check(url))
      if (match.check(url)) {
        return {
          Page,
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
    .join('\/') + '$'

  const re = new RegExp(reStr)
  const named = parts
    .filter(part => part[0] === ':')
    .map(part => part.slice(1))

  return {
    check: url => re.test(url),
    process: url => {
      const args = re.exec(url).slice(1)
      const params = args.reduce((memo, arg, idx) => {
        memo[named[idx]] = arg
        return memo
      }, {})

      return {
        params,
        rest: interpolatePath(parts, params)
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
 * Interpolate a parameterized url from its components
 * and its actualized parameters
 */

function interpolatePath (parts, params) {
  return parts.reduce((memo, part) => {
    if (part[0] === ':')
      memo += params[part.slice(1)]
    if (part !== '*')
      memo += part
    return memo
  }, '')
}

/**
 * Exports
 */

export default matcher
