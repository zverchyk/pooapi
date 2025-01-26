const { MongoClient} = require('mongodb');
const path = require('path');
require('dotenv').config()

// link for connection
const uri = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.tcvrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// name of database
const dbName = "DailyPoo-database";

const client = new MongoClient(uri);


let dbInstance;
const connectToDatabase = async function(){
    if(!dbInstance){
    // Object that references the connection

// Connect to the database as a client
await client.connect();
console.log("Connected to Mongodb");

// References to run operations in the database and collection
dbInstance = client.db(dbName);

    }
return dbInstance

}

const getCollection= async function (collectionName) {
    const db = await connectToDatabase();
    return db.collection(collectionName);
}

const closeDbConnection= async function(){
    try{
        await client.close()
        console.log('connection closed')
        dbInstance = undefined
    }catch(err){
        throw {status: 500, message: 'Error with closing connection'}
    }
   

    
}

module.exports = {
    closeDbConnection,
    connectToDatabase,
    getCollection

}