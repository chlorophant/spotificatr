const token = require('../lib/token')

const isAuthenticated = (req, res, next) => {
  const { headers } = req
  const { authorization } = headers
  if (!authorization) res.status(401).send({error: true, message: 'unauthorized'})
  try {
    const result = token.verify(authorization)
    req.decodedToken = token.verify(authorization)
    next()
  } catch (error) {
    res.status(401).send({error: true, message: 'unauthorized'})
  }
}

module.exports = isAuthenticated