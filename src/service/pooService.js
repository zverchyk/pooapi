const poo = require('../database/poo')

const createPooList = async function(userId){
    try{
        const response = await poo.createPooList(userId)
        return response
    }catch(err){
        throw(err)
    }
}

const getPooList = async function(userId){
    try{
        const response = await poo.getPooList(userId)
        return response
    }catch(err){
        throw(err)
    }
}

const updateSession = async function(userId, body){
    try{
        const userInfo = {userId: userId, day: body.day, times: body.times}
        const response =await poo.updateSession(userInfo)
        return response

    }catch(err){
        throw(err)
    }
}

module.exports ={
    createPooList,
    getPooList,
    updateSession
  }
  