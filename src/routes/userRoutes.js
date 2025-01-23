const userControl = require('../control/userControl')
const express = require('express')


const router = express.Router()

// creating new user
router.post('/new', userControl.createUser)


// getting existing user
router.get('/', userControl.loginUser)

// delete user 
router.delete('/:userId', userControl.deleteUser)

// find existing user
router.get('/logout', userControl.logoutUser)




module.exports = router