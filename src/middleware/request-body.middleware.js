export function requestBodyMiddleware(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.json({ status: 200, message: 'OK' })
  }

  const { phone } = req.body

  if (!phone) {
    return res.json({ status: 200, message: 'OK' })
  }

  return next()
}
