const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env
const audience = 'https://spotificatr.app'
const issuer = 'Spotificatr'

const decode = (token) => {
  return jwt.decode(token, { complete: true })
}

const sign = (email) => {
  return jwt.sign({
    issuer,
    subject: email,
    audience,
    expiresIn: '1d',
  }, JWT_PRIVATE_KEY, {algorithm: 'RS256'})
}

const verify = (token) => {
  return jwt.verify(token, JWT_PUBLIC_KEY, {
    iss: issuer,
    aud: audience,
    algorithms: ['RS256']
  })
}

module.exports = {
  decode,
  sign,
  verify
}
