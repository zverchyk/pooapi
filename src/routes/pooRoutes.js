const express = require('express')
const pooControl = require("../control/pooControl")


const router = express.Router()


router.get('/:userId', pooControl.getSession)

router.post('/newlist/:userId', pooControl.createPooList)

router.put('/:userId', pooControl.updateSession)

router.post('/:userId', pooControl.createSession)


module.exports = router

