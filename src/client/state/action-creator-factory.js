export default (type) => {
  const actionCreate = (payload) => ({
    type,
    payload
  })

  actionCreate.type = type

  return actionCreate
}
