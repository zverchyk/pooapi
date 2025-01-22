require('dotenv').config()
const cors = require('cors');
const {closeDbConnection} = require('./src/database/dbConnection')

const express = require('express')
const app = express()

const userRouter = require('./src/routes/userRoutes')
const pooRouter = require('./src/routes/pooRoutes')
// for schema creation

// Allow only the frontend's domain
const corsOptions = {
    origin: 'https://my-frontend.com', // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you're using cookies or sessions
};

// Apply CORS middleware
app.use(cors(corsOptions));


app.use(express.json());

app.use('/users', userRouter)
app.use('/poo', pooRouter)



app.listen(3000, ()=>console.log('server started'))

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await closeDbConnection(); // Close MongoDB connection
    process.exit(0); // Exit the application
});