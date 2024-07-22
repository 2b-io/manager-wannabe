export default (handler) => (req, res, next) => {
  if (!req.user) {
    return handler(req, res, next)
  }

  next()
}
