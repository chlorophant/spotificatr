// const bcrypt = require('bcryptjs')
const logger = require('../lib/logger')
// const token = require('../lib/token')
const moment = require('moment')
const { User, PlaylistNotes } = require('../../models')

const { getSinglePlaylist } = require('../net/spotify')

const routeHandler = async (req, res) => {
  try {
    const invalidFieldsMessages = scanFields(req)
    if (invalidFieldsMessages.length) return res.status(400).send({error: true, message: invalidFieldsMessages})
    const { noteContent, playlistId } = req.body
    const { subject: email } = req.decodedToken
    let existingUser = await User.findOne({
      where: { email }, include: ['notes']
    })
    if (!existingUser) return res.status(404).send({error: true, message: 'User not found'})
    let { accessToken, refreshToken, tokenExpiration } = existingUser
    // Check if token is expired - isBefore defaults to now
    // If so, refresh the spotify token and save to db
    if (moment(tokenExpiration).isBefore()) {
      logger.info(`Refreshing expired spotify access token for user: ${email}`)
      const refreshResponse = await refreshSpotifyToken({refreshToken})
      await User.update({
        accessToken: refreshResponse.accessToken,
        tokenExpiration: refreshResponse.tokenExpiration
      }, { where: { email } })
      existingUser = await User.findOne({
        where: { email }, include: ['notes']
      })
      accessToken = existingUser.accessToken
    }
    const playlistResponse = await getSinglePlaylist({accessToken, playlistId}) // Ensures user has access to the given playlist
    await PlaylistNotes.destroy({where: {playlistId: playlistResponse.id}}) // Delete old notes, only 1 note allowed per playlist
    await PlaylistNotes.create({
      text: noteContent,
      playlistId: playlistResponse.id,
      userId: existingUser.userId
    })
    res.status(201).send({error: false, message: `Successfully created note for playlist ${playlistId}`})
  } catch (error) {
    logger.error(`Error creating note ${error}`)
    return res.status(500).send({error: true, message: error.message})
  }
}

const scanFields = (request) => {
  const invalidFieldsMessages = []
  const { body = {} } = request
  const { playlistId } = body
  if (!playlistId) invalidFieldsMessages.push('request.body requires a playlistId')
  return invalidFieldsMessages.join(', ')
}

module.exports = routeHandler