const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const bcrypt =require('bcrypt')

const { v4: uuid, v4 } = require("uuid");

const {  ObjectId } = require('mongodb');
const { model } = require('mongoose');

const {getCollection} = require('./dbConnection')
// name of collection
const collectionName = "users";


// actuall connection with account for this api

const createUser = async function (userInfo) {

  try {

    const collection = await getCollection(collectionName)
 
    // Document to insert
    const newUser = {
      password: await bcrypt.hash(userInfo.password, 10),
      email: userInfo.email,
      icon:'none'
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newUser);
    return result.insertedId.toHexString()

  } catch (err) {
    console.error("Error inserting user:", err);
    throw {status: 500, message: 'Database error with inserting user'}
 
  } 
};

const loginUser = async function(userInfo){
 
  try {

    const collection = await getCollection(collectionName)

    const findQuery = {email: userInfo.email}

    const user = await collection.findOne(findQuery);

    console.log(user)
    // checks if user exist 
    if (user === null){

      throw {status: 404, message: `User doesn't exist`}
    }

    const passwordsMatched = await bcrypt.compare(userInfo.password, user.password)

    if (!passwordsMatched) {
      throw {status: 404, message: `Username or password is incorrect`}
    }
    return [user._id.toHexString(), user.icon]



  } catch (err) {
    // Log detailed error and rethrow if needed
    throw err
  }
  


}

const isUserExist = async function(userName){
 
  try {
    const collection = await getCollection(collectionName)

    const findQuery = {email: userName}

    const user = await collection.findOne(findQuery);

    if(user !== null){
      throw {status: 404, message: 'User already exist'}}
            
    
   
  } catch (err) {
    console.error("Error inserting user:", err);
    throw err
  }
  


}

const deleteUser = async function(userId){
   try{

    const collection = await getCollection(collectionName)

        const deleteQuery= {_id:new ObjectId(userId)}

        const result = await collection.deleteOne(deleteQuery)

        if(result.deletedCount === 0){
          throw { status: 404, message: `User isn't found` };
        }

   }catch(err){
    throw(err)
   
   }
}

const updateUser = async function(newUserInfo){
  
    try {
      const collection = await getCollection(collectionName)
  
      const findQuery ={
        "_id": new ObjectId(newUserInfo.userId),
      }
      let updateObject ={}
  // ✅ Add only if the key exists
      if (newUserInfo?.newEmail) updateObject["email"] = newUserInfo.newEmail;
      if (newUserInfo?.newPassword) updateObject["password"] = await bcrypt.hash(newUserInfo.newPassword, 10);
      if (newUserInfo?.newIcon) updateObject["icon"] = newUserInfo.newIcon;

      if (Object.keys(updateObject).length === 0) throw {status: 404, message: "❌ No fields to update!"}
          
      
      const setQuery = { $set: updateObject}
      // const result = await collection.find(findQuery).toArray();
  
       const result = await collection.updateOne(findQuery,setQuery);
       console.log(result)
      if(result.modifiedCount ===0 && result.matchedCount === 1) throw {status: 404, message: 'user is up to date'}
      
      if (result.matchedCount === 0) throw {status: 404, message: 'user is not fond'}
    }
     catch (err) {
      throw err
    }
}





module.exports ={
  deleteUser,
  loginUser,
  createUser,
  isUserExist,
  updateUser
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
