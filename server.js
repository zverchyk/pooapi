require('dotenv').config()
const cors = require('cors');

const express = require('express')
const app = express()

const userRouter = require('./src/routes/userRoutes')
const pooRouter = require('./src/routes/pooRoutes')
// for schema creation

// Allow requests from your frontend
app.use(cors({}));
app.options('*', cors());


app.use(express.json());

app.use('/users', userRouter)
app.use('/poo', pooRouter)



app.listen(3000, ()=>console.log('server started'))