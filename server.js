const cors = require('cors');
const {closeDbConnection} = require('./src/database/dbConnection')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express')
const app = express()

const userRouter = require('./src/routes/userRoutes')
const pooRouter = require('./src/routes/pooRoutes')
// for schema creation

// const corsOptions = {
//     origin: process.env.FRONT_END_DOMAIN, // Replace with your frontend's domain
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true, // If you're using cookies or sessions
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

app.use(cors)

app.use(express.json());

app.use('/users', userRouter)
app.use('/poo', pooRouter)



app.listen(3000)

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await closeDbConnection(); // Close MongoDB connection
    process.exit(0); // Exit the application
});