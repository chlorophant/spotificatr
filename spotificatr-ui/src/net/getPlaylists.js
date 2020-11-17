import * as rp from 'request-promise'

const getPlaylists = async ({sessionToken, offset, limit}) => {
  const options = {
    uri: `https://localhost:8443/v1/playlists?offset=${offset}&limit=${limit}`,
    headers: {
      'Authorization': sessionToken
    },
    json: true
  }
  return rp.get(options)
}

module.exports = {
  getPlaylists
}
