const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const {getCollection} = require('./dbConnection')

// name of collection
const collectionName = "pooSessions";

const createPooList = async function (userId) {

  try {
    
    const collection = await getCollection(collectionName)

    // Document to insert
    const newPooSessions = {
      userId:userId,
      allUserSessions:[]

    };

    // Insert the document into the collection
    const result = await collection.insertOne(newPooSessions);
    console.log('list created', result)
  } catch (err) {
    console.error("Error inserting user:", err);
  } 
};

const createSession = async function(userId, day){
  if (!userId || !day) throw new Error('parametrs are missing')

  try {

     const collection = await getCollection(collectionName)
    
    const searchQuery ={
      userId: userId
    }
    // Document to insert
    const newPooSessions = {$push:{"allUserSessions":
        {day: day,
        times:[]}}

    };

    // Insert the document into the collection
    await collection.updateOne(searchQuery, newPooSessions);
    
   } catch (err) {
    console.error("Error inserting user:", err);
    throw new Error('Error with inserting new session')
   
  } 
}

// get session for today
const getSession = async function(userId, day){
  try {

    const collection = await getCollection(collectionName)

    const findQuery = {userId: userId}

    const projectionQuery = {
      allUserSessions: 1
    }

    const userList = await collection.findOne(findQuery, projectionQuery);
    if(userList === null){
      throw new Error('user poo list missing') // create a poo list later
    }
    const session = userList.allUserSessions.find(elem => elem.day === day);

    if (!session) {
        return false // today's session is not found
      }

    return session
  } catch (err) {
    throw ({status: err?.status || 500, message: err?.message || err})
  }
  


}

const updateSession = async function(userInfo){

  try {
    const collection = await getCollection(collectionName)

    const findQuery ={
      "userId": userInfo.userId,
      "allUserSessions": {$elemMatch: {day: userInfo.day}}
    }

    const setQuery = {
       $set: { "allUserSessions.$.times": userInfo.times} //update operation
    }
    // const result = await collection.find(findQuery).toArray();

     const result = await collection.updateOne(findQuery,setQuery);
    if(result.modifiedCount ===0) throw {status: 404, message: 'session not found'}
    }
    
   catch (err) {
    throw err
  }

  }

  const deletePooList = async function(userId){
     try{
          
        const collection = await getCollection(collectionName)
        const deleteQuery= {userId:userId}

        const result = await collection.deleteOne(deleteQuery)

        if(result.deletedCount === 0){
          throw { status: 404, message: `User data isn't found` };
        }

     }catch(err){
      console.error(`Something went wrong trying to delete documents: ${err}\n`);
      throw err
  
     }
  }
 
const deleteSessionElement = async function(){

}


module.exports ={
  createPooList,
  getSession,
  updateSession,
  createSession,
  deletePooList
}

