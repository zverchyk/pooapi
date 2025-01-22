const userControl = require('../control/userControl')
const express = require('express')


const router = express.Router()


// getting existing user
router.get('/', userControl.getUser)

// creating new user
router.post('/new', userControl.createUser)

// delete user 
router.delete('/:userId', userControl.deleteUser)

// find existing user
router.get('/exist/', userControl.findUser)




module.exports = router