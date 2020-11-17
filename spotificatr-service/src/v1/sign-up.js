const bcrypt = require('bcryptjs')
const logger = require('../lib/logger')
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
    if (existingUser) {
      return res.status(409).send({error: true, message: 'User already exists'})
    }
    const hashedPassword = bcrypt.hashSync(password, 8)
    await User.create({ email, hashedPassword })
    return res.status(201).send({error: false, message: 'Successfully signed up'})
  } catch (error) {
    logger.error(`Error creating user ${error}`)
    return res.status(500).send({error: true, message: error.message})
  }
}

const scanFields = (request) => {
  const invalidFieldsMessages = []
  const { body = {} } = request
  const { email, password, validationPassword } = body
  if (!email) invalidFieldsMessages.push('request.body requires a email')
  if (email && !emailRegex.test(email)) invalidFieldsMessages.push('request.body.email must be a valid format')
  if (!password) invalidFieldsMessages.push('request.body requires a password')
  if (password && !passwordRegex.test(password)) invalidFieldsMessages.push('request.body.password must be a valid format')
  if (!validationPassword) invalidFieldsMessages.push('request.body requires a validationPassword')
  if (validationPassword && !passwordRegex.test(validationPassword)) invalidFieldsMessages.push('request.body.validationPassword must be a valid format')
  if (password !== validationPassword) invalidFieldsMessages.push('request.body.validationPassword and request.body.validationPassword must match')
  return invalidFieldsMessages.join(', ')
}

module.exports = routeHandler