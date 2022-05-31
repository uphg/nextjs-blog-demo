import qs from 'query-string'

function getQuery(url) {
  const index = url.indexOf('?')
  const search = url.substring(index + 1)
  return qs.parse(search)
}

export default getQuery