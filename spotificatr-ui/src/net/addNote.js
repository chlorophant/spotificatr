import * as rp from 'request-promise'

const addNote = async ({sessionToken, noteName, noteContent, playlistId}) => {
  const options = {
    uri: `https://localhost:8443/v1/createNote`,
    headers: {
      'Authorization': sessionToken
    },
    body: {
      noteContent,
      playlistId
    },
    json: true
  }
  return rp.post(options)
}

module.exports = {
  addNote
}
