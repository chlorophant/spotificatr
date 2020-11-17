import * as rp from 'request-promise'
import { getHost } from '../util/detectEnvironment'
const host = getHost()

const login = ({email, password}) => {
  const options = {
    uri: `${host}/v1/signIn`,
    body: {
      email,
      password
    },
    json: true
  }
  return rp.post(options)
}

export {
  login
}
