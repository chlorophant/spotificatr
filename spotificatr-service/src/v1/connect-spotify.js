const logger = require('../lib/logger')
const { User } = require('../../models')
const { getProfile, getSpotifyAccessTokens } = require('../net/spotify')

const routeHandler = async (req, res) => {
  try {
    const invalidFieldsMessages = scanFields(req)
    if (invalidFieldsMessages.length) return res.status(400).send({error: true, message: invalidFieldsMessages})
    const { code } = req.body
    const { subject: email } = req.decodedToken
    const { accessToken, refreshToken, tokenExpiration } = await getSpotifyAccessTokens({code})
    const { displayName, spotifyId } = await getProfile({accessToken})
    console.log('displayName:', displayName)
    console.log('spotifyId:', spotifyId)
    await User.update({accessToken, refreshToken, tokenExpiration, displayName, spotifyId}, { where: { email } })
    return res.status(201).send({error: false, message: 'Successfully connected spotify account'})
  } catch (error) {
    logger.error(`Error creating user ${error}`)
    return res.status(500).send({error: true, message: error.message})
  }
}

const scanFields = (request) => {
  const invalidFieldsMessages = []
  const { body = {} } = request
  const { code } = body
  if (!code) invalidFieldsMessages.push('request.body requires a code from spotify')
  return invalidFieldsMessages.join(', ')
}

module.exports = routeHandler