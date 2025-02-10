const express = require('express')
const app = express()

const cors = require('cors');
const {closeDbConnection} = require('./src/database/dbConnection')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })



app.use(express.json({ limit: '10mb' })); // Allow large image uploads

const userRouter = require('./src/routes/userRoutes')
const pooRouter = require('./src/routes/pooRoutes')
const emailRouter = require('./src/routes/emailRoutes')


if(process.env.FRONT_END_DOMAIN==='https://localhost:1234'){
    app.use(cors())
}else{
    const corsOptions = {
    origin: process.env.FRONT_END_DOMAIN, // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you're using cookies or sessions
};

// Apply CORS middleware
app.use(cors(corsOptions));
}


app.use('/users', userRouter)
app.use('/poo', pooRouter)
app.use('/email', emailRouter)



app.listen(3000)

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await closeDbConnection(); // Close MongoDB connection
    process.exit(0); // Exit the application
});