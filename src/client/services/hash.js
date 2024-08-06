import shortHash from 'short-hash'

const hashObj = (obj, salt = '') => {
  const target = {
    ...obj, __SALT: salt
  }

  const str = JSON.stringify(target, Object.keys(target).sort())

  return shortHash(str)
}

export default {
  obj: hashObj
}
