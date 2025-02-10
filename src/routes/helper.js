const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


const authenticateToken =function(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
        console.log(process.env.ACCESS_TOKEN_SECRET)
        console.log(token)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }


module.exports = {
    authenticateToken
}