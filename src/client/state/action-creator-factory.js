export default (name) => (type) => {
  const actionType = `${name}/${type}`

  const actionCreate = (payload) => ({
    type: actionType,
    payload
  })

  actionCreate.type = actionType

  return actionCreate
}
