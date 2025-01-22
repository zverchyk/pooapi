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
    await collection.insertOne(newPooSessions);
    return "Poo list inserted:"
  } catch (err) {
    console.error("Error inserting user:", err);
  } 
};

const createSession = async function(userInfo){
  try {
    
    const collection = await getCollection(collectionName)
    
    const searchQuery ={
      userId: userInfo.userId
    }
    // Document to insert
    const newPooSessions = {$push:{"allUserSessions":
        {day: userInfo.day,
        times:[]}}

    };

    // Insert the document into the collection
    await collection.updateOne(searchQuery, newPooSessions);
    return "Session inserted"
  } catch (err) {
    console.error("Error inserting user:", err);
  } 
}

// get poo list for today
const getSession = async function(userInfo){
  try {

    const collection = await getCollection(collectionName)

    const findQuery = {userId: userInfo.userId}

    const projectionQuery = {
      allUserSessions: 1
    }

    const response = await collection.findOne(findQuery, projectionQuery);
    
      
    if (response) {
      const filteredSession = response.allUserSessions.find(elem => elem.day === userInfo.day);
   
      if (!filteredSession) {
        throw {status: 404, message: 'no session found for this day'}
      }
      
      return filteredSession.times
    } else {
      throw { status: 404, message: "No session found for the specified userId and day" }
    }

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
    const matchingDocuments = await collection.find(findQuery).toArray();

     const result = await collection.updateOne(findQuery,setQuery);
         // Check if the document was updated
    if (result.matchedCount === 0) {
      throw { status: 404, message: "No session found for the specified userId and day" };
    }
    if (result.modifiedCount === 0) {
      throw { status: 304, message: "No changes made to the session" };
    }
    
    return `Today's session updated`
    

  } catch (err) {
    throw({status: err?.status || 500, message: err?.message || err })
  }

  }

  const deletePooList = async function(userId){
     try{
          
        const collection = await getCollection(collectionName)
        const deleteQuery= {userId:userId}

        const deleteResult = await collection.deleteOne(deleteQuery)
        return deleteResult.deletedCount

     }catch(err){
      console.error(`Something went wrong trying to delete documents: ${err}\n`);
  
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

