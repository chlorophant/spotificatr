
export const getEnvironment = () => {
  const host = window.location.host
  if (host.includes('localhost')) return 'local'
  if (!host.includes('localhost')) return 'prd'
}

export const getHost = () => {
  const env = getEnvironment()
  switch (env) {
    case 'local':
      return 'https://localhost:8443'
    case 'prd':
      return 'https://spotificatr.app'
    default:
      return 'https://localhost:8443'
  }
}

module.exports = {
  getHost
}