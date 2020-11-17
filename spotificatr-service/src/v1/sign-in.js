const bcrypt = require('bcryptjs')
const logger = require('../lib/logger')
const token = require('../lib/token')
const { User } = require('../../models')
const { emailRegex, passwordRegex } = require('../lib/regex')
const routeHandler = async (req, res) => {
  try {
    const invalidFieldsMessages = scanFields(req)
    if (invalidFieldsMessages.length) return res.status(400).send({error: true, message: invalidFieldsMessages})
    const { body = {} } = req
    const { email, password } = body
    const existingUser = await User.findOne({
      where: { email }
    })
    if (!existingUser) return res.status(404).send({error: true, message: 'User not found'})
    const passwordIsValid = bcrypt.compareSync(password, existingUser.hashedPassword)
    if (!passwordIsValid) return res.status(401).send({error: true, message: 'Invalid password'})
    const newToken = token.sign(existingUser.email)
    return res.status(201).send({
      error: false,
      message: 'Successfully signed in',
      details: {
        token: newToken,
        connected: !!existingUser.accessToken
      }
    })
  } catch (error) {
    logger.error(`Error creating user ${error}`)
    return res.status(500).send({error: true, message: error.message})
  }
}

const scanFields = (request) => {
  const invalidFieldsMessages = []
  const { body = {} } = request
  const { email, password } = body
  if (!email) invalidFieldsMessages.push('request.body requires a email')
  if (email && !emailRegex.test(email)) invalidFieldsMessages.push('request.body.email must be a valid format')
  if (!password) invalidFieldsMessages.push('request.body requires a password')
  if (password && !passwordRegex.test(password)) invalidFieldsMessages.push('request.body.password must be a valid format')
  return invalidFieldsMessages.join(', ')
}

module.exports = routeHandler