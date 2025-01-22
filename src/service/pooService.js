const poo = require('../database/poo')

const createPooList = async function(userId){
    try{
        const response = await poo.createPooList(userId)
        return response
    }catch(err){
        throw(err)
    }
} 

const getSession = async function(userInfo){
    try{
        const response = await poo.getSession(userInfo)
        return response
    }catch(err){
        throw(err)
    }
}

const updateSession = async function(userInfo){
    try{
        const response =await poo.updateSession(userInfo)
        return response

    }catch(err){
        throw(err)
    }
}

const createSession = async function(userInfo){
    try{    
        const response = await poo.createSession(userInfo)
        return response
    }catch(err){
        throw(err)
    
}
}



module.exports ={
    createPooList,
    getSession,
    updateSession,
    createSession
  }
  