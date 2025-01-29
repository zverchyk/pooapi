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

module.exports ={
    updateSession,
    getAllSessions

  }
  