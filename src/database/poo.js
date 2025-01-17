const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const { MongoClient} = require('mongodb');


// link for connection
const uri = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.tcvrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// name of database
const dbName = "DailyPoo-database";

// name of collection
const collectionName = "pooSessions";

// Object that references the connection
const client = new MongoClient(uri);

// actuall connection with account for this api

const createPooList = async function (userId) {

  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
 
    // Document to insert
    const newPooSessions = {
      userId:userId,
      allUserSessions:[]

    };

    // Insert the document into the collection
    const result = await collection.insertOne(newPooSessions);
    console.log("User inserted:", result);
  } catch (err) {
    console.error("Error inserting user:", err);
  } finally {
    
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
};

const getPooList = async function(userId){
  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findQuery = {userId: userId}

    const response = await collection.findOne(findQuery);
    if (response) {
      return response.allUserSessions

    } else {
      throw({status: 404, message: 'No pooList found with the provided email'})
    }

  } catch (err) {
    throw ({status: err?.status || 500, message: err?.message || err})
  }
  
   finally {
    
    if (client.topology && client.topology.isConnected()) {
      await client.close();
      console.log("Connection closed");
    }
  }

}

const updateSession = async function(userInfo){

  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    const updateQuery = {
      $push: {allUserSessions: {
        day: userInfo.day,
        times: userInfo.times
      }}
    }

    const pooSessions = await collection.updateOne({userId: userInfo.userId},updateQuery);
    if (pooSessions) {
      return pooSessions.modifiedCount
    } else {
      throw({status: 404, message: 'no poolist found' })
    }

  } catch (err) {
    throw({status: err?.status || 500, message: err?.message || err })
  }
  
   finally {
      await client.close();
      console.log('connection closed')

    }
  }



module.exports ={
  createPooList,
  getPooList,
  updateSession
}

