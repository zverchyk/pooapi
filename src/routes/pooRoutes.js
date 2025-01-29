const express = require('express')
const pooControl = require("../control/pooControl")


const router = express.Router()


router.put('/update', pooControl.updateSession)

router.get('/all/:userId', pooControl.getAllSessions)


module.exports = router

