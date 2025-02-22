const express = require('express')
const pooControl = require("../control/pooControl")
const sseControl = require('../control/sseControl')
// const ws = require('./webs')

const router = express.Router()


router.put('/update', pooControl.updateSession)

router.get('/all/:userId', pooControl.getAllSessions)

// router.post('/iotrecord', ws.connectUser, pooControl.addElementToSession)

router.post('/iotrecord', pooControl.addElementToSession)

router.get('/events/:userId', sseControl.userConnection)


module.exports = router

