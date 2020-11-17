const logger = require('./lib/logger')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { SERVICE_PORT, SSL_CERT, SSL_KEY } = process.env

const createInstance = () => {
  const app = express()
  const server = require('https').createServer({ cert: SSL_CERT, key: SSL_KEY }, app)
  app.use((req, res, next) => {
    const { method, url, headers } = req
    logger.info({ method, url, headers }) // Log all request details
    next()
  })
  app.use(bodyParser.json({ limit: '200kb' }))
  app.use(cors())
  app.use('/v1', require('./v1'))
  app.get('/health', async (req, res) => {
    res.status(200).send({status: 'UP'})
  })
  server.listen(SERVICE_PORT, () => {
    logger.info(`Started express server on port ${SERVICE_PORT} with process id ${process.pid}`)
  })
  app.on('error', (error, context) => {
    logger.error('application error: ', error.stack)
    logger.error('on url', context.req.url)
    logger.error('with headers', context.req.headers)
  })
}

module.exports = {
  createInstance
}
