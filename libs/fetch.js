import fetchFun from 'isomorphic-unfetch'

export default async function fetch (...args) {
  const res = await fetchFun(...args)
  return [res.json(), res.status]
}