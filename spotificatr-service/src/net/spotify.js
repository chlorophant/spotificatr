const rp = require('request-promise')
const moment = require('moment')
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
let buff = new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
const base64EncodedClientSecret = buff.toString('base64')

const getSpotifyAccessTokens = async ({code}) => {
  const result = await rp({
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:8080/landing/connect', // TODO: Change this to enable production deploy
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    }
  })
  const jsonResults = JSON.parse(result)
  return {
    accessToken: jsonResults.access_token,
    refreshToken: jsonResults.refresh_token,
    tokenExpiration: moment().add(jsonResults.expires_in -3, 'seconds').format() // Add a little buffer of time
  }
}

const refreshSpotifyToken = async ({refreshToken}) => {
  const result = await rp({
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Authorization': `Basic ${base64EncodedClientSecret}`
    }
  })
  const jsonResults = JSON.parse(result)
  const { access_token: accessToken, expires_in: expiresIn } = jsonResults
  return {
    accessToken,
    tokenExpiration: moment().add(expiresIn - 3, 'seconds').format() // Add a little buffer of time
  }
}

const getProfile = async ({accessToken}) => {
  const result = await rp({
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const jsonResults = JSON.parse(result)
  const { id: spotifyId, display_name: displayName } = jsonResults
  return { spotifyId, displayName }
}

const getPlaylists = async ({accessToken, offset, limit}) => {
  const result = await rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return JSON.parse(result)
}

const getSinglePlaylist = async ({accessToken, playlistId}) => {
  const result = await rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/playlists/${playlistId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return JSON.parse(result)
}


module.exports = {
  getProfile,
  getPlaylists,
  getSinglePlaylist,
  getSpotifyAccessTokens,
  refreshSpotifyToken
}


