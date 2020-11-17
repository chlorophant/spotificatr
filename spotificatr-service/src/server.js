const cluster = require('cluster')
const os = require('os')
const { createInstance } = require('./worker')

const initializeCluster = () => {
  const numCores = os.cpus().length
  if (cluster.isMaster) {
    console.log(`Master process setting up ${numCores} express workers`)
    for (let i = 0; i < numCores; i++) {
      cluster.fork()
    }
  } else {
    createInstance()
  }
}

initializeCluster()
