import * as rp from 'request-promise'
import { getHost } from '../util/detectEnvironment'
const host = getHost()

const signUp = ({email, password, validationPassword}) => {
  const options = {
    uri: `${host}/v1/signUp`,
    body: {
      email,
      password,
      validationPassword
    },
    json: true
  }
  return rp.post(options)
}

export {
  signUp
}
