import * as rp from 'request-promise'
import { getHost } from '../util/detectEnvironment'
const host = getHost()

const connectSpotify = ({code, sessionToken}) => {
  const options = {
    uri: `${host}/v1/connectSpotify`,
    headers: {
      'Authorization': sessionToken
    },
    body: {
      code
    },
    json: true
  }
  return rp.post(options)
}

export {
  connectSpotify
}
