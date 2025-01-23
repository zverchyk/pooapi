const express = require('express')
const pooControl = require("../control/pooControl")


const router = express.Router()


router.put('/update', pooControl.updateSession)


module.exports = router

