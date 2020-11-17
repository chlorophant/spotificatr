const moment = require('moment')
const logger = require('../lib/logger')
const { User } = require('../../models')
const { getPlaylists, refreshSpotifyToken } = require('../net/spotify')

const routeHandler = async (req, res) => {
  try {
    const invalidFieldsMessages = scanFields(req)
    if (invalidFieldsMessages.length) return res.status(400).send({error: true, message: invalidFieldsMessages})
    const { offset, limit } = req.query
    const { subject: email } = req.decodedToken
    let existingUser = await User.findOne({
      where: { email }, include: ['notes']
    })
    if (!existingUser) return res.status(404).send({error: true, message: 'User not found'})
    let { accessToken, refreshToken, tokenExpiration, notes } = existingUser
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
    const response = await getPlaylists({accessToken, offset, limit})
    // Attach notes to the applicable playlists before returning to the user
    const noteMap = new Map()
    existingUser.notes.forEach(note => {
      noteMap.set(note.playlistId, note)
    })
    response.items.forEach(playlist => {
      const associatedNote = noteMap.get(playlist.id)
      if (associatedNote) {
       playlist.note = associatedNote
      }
    })
    return res.status(201).send({
      error: false,
      message: 'Successfully listed playlists',
      details: {
        totalRecords: response.total,
        playLists: response.items
      }
    })
  } catch (error) {
    logger.error(`Error listing playlists ${error}`)
    return res.status(500).send({error: true, message: error.message})
  }
}

const scanFields = (request) => {
  const invalidFieldsMessages = []
  const { query = {} } = request
  const { offset, limit } = query
  if (!offset) invalidFieldsMessages.push('request.query requires a offset number')
  if (Number(offset) < 0) invalidFieldsMessages.push('request.query.offset must be a non-negative number')
  if (!limit) invalidFieldsMessages.push('request.query requires a limit number')
  if (Number(limit) < 0) invalidFieldsMessages.push('request.query.limit must be a non-negative number')
  return invalidFieldsMessages.join(', ')
}

module.exports = routeHandler