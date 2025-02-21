const express = require('express')
const pooControl = require("../control/pooControl")
const ws = require('./webs')

const router = express.Router()


router.put('/update', pooControl.updateSession)

router.get('/all/:userId', pooControl.getAllSessions)

router.post('/iotrecord', ws.connectUser, pooControl.addElementToSession)


module.exports = router

