import shortHash from 'short-hash'

const hashObj = (obj) => {
  const str = JSON.stringify(obj, Object.keys(obj).sort())

  return shortHash(str)
}

export default {
  obj: hashObj
}
