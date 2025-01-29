const express = require('express')
const emailControl = require("../control/emailControl")


const router = express.Router()


router.post('/chart', emailControl.sendMail)



module.exports = router

