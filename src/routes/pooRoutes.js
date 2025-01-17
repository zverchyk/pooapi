const express = require('express')
const pooControl = require("../control/pooControl")


const router = express.Router()


router.get('/:userid', pooControl.getPooList)

router.post('/:userid', pooControl.createPooList)

router.put('/:userid', pooControl.updateSession)


module.exports = router