const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const bcrypt =require('bcrypt')

const { v4: uuid, v4 } = require("uuid");

const { MongoClient, ServerApiVersion, FindCursor } = require('mongodb');
const { model } = require('mongoose');

// link for connection
const uri = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.tcvrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// name of database
const dbName = "DailyPoo-database";

// name of collection
const collectionName = "users";

// Object that references the connection
const client = new MongoClient(uri);

// actuall connection with account for this api

const createUser = async function (userInfo) {


  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
 
    // Document to insert
    const newUser = {
      password: await bcrypt.hash(userInfo.password, 10),
      email: userInfo.email,
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newUser);
    return result.insertedId

  } catch (err) {
    console.error("Error inserting user:", err);
  } finally {
    
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
};

const getUser = async function(userInfo){
  let user = null
  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findQuery = {email: userInfo.email}

    const user = await collection.findOne(findQuery);
    if (user) {
      console.log(`User found: Email: ${user.email}, Password: ${user.password}`);
      if(await bcrypt.compare(userInfo.password, user.password)) {
        return user._id
      } else {
        return false
      }

    } else {
      console.log("No user found with the provided email")
      return false
    }

  } catch (err) {
    console.error("Error inserting user:", err);
  }
  
   finally {
    
    if (client.topology && client.topology.isConnected()) {
      await client.close();
      console.log("Connection closed");
    }
  }

}

const findUser = async function(userName){
  console.log(userName)
  try {
    // Connect to the database as a client
    await client.connect();
    console.log("Connected to MongoDB");

    // References to run operations in the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findQuery = {email: userName}

    const user = await collection.findOne(findQuery);
    if (user) {
      console.log('user is found');
      return true
    } else {
      console.log("No user found")
      return false
    }

  } catch (err) {
    console.error("Error inserting user:", err);
  }
  
  //  finally {
    
  //   if (client.topology && client.topology.isConnected()) {
  //     await client.close();
  //     console.log("Connection closed");
  //   }
  // }

}

const deleteUser = async function(userId){
   try{
        // Connect to the database as a client
        await client.connect();
        console.log("Connected to MongoDB");

        // References to run operations in the database and collection
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const deleteQuery= {_id:userId}

        const deleteResult = await collection.deleteOne(deleteQuery)
        console.dir(deleteResult)
        for (const key in deleteResult){
          console.log(key, deleteResult[key])
        }



   }catch(err){
    console.error(`Something went wrong trying to delete documents: ${err}\n`);

   }finally{
        // Close the connection
        await client.close();
        console.log("Connection closed");
   }
}




module.exports ={
  deleteUser,
  getUser,
  createUser,
  findUser
}








// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

const getDataFromJson = function(){
  const DB = require('./db.json')
const DBlist = Object.entries(DB).map(([key, value]) => ({
    key,
    ...value,
  }));
  return DBlist
}




async function insertManyCollection(){
    try{
        const insertManyResult = await collection.insertMany(DBlist)
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    } catch (err) {
      console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}





async function retriveData(){
    try {
        const cursor = await collection.find(findQuery).sort({ name: 1 });
        await cursor.forEach(recipe => {
          console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
        });
        // add a linebreak
        console.log();
      } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
      }
}

async function run2() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
