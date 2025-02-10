const poo = require('../database/poo')


const updateSession = async function(userInfo){
    try{
        await poo.updateSession(userInfo)
    }catch(err){
        throw(err)
    }
}

const getAllSessions = async function(userId){
    try{
        const sessions = await poo.getAllSessions(userId)
        return sessions
    }catch(err){
        throw(err)
    }
}

// ioT device

const addElementToSession = async function(userInfo) {
    try{
     await poo.addElementToSession(userInfo)
        
    }catch(err){
        throw(err)
    }
    }

module.exports ={
    addElementToSession, //ioT device
    updateSession,
    getAllSessions

  }
  