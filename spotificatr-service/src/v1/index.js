const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication')

router.post('/signUp', require('./sign-up'))
router.post('/signIn', require('./sign-in'))
router.post('/connectSpotify', isAuthenticated, require('./connect-spotify'))
router.post('/createNote', isAuthenticated, require('./create-note'))
router.get('/playlists', isAuthenticated, require('./getPlaylists'))

module.exports = router
