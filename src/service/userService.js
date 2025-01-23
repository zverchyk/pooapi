const user = require('../database/users')
const poo = require('../database/poo')
const {closeDbConnection} = require('../database/dbConnection')


// creates user, poolist and today's session
const createUserAndPoolist = async function(body){
    try{
        // check for availability for username
        await user.isUserExist(body.email)
        // create user
        const userId = await user.createUser(body)
        // create poolist
        await poo.createPooList(userId)
        // create todays sesssion
        await poo.createSession(userId, body.day)
        
        return userId
    }catch(err){
        throw err
    }
}

// login user and gets today's session
const loginUser = async function(userInfo){
    let session
    try{
        // login user 
        const userId = await user.loginUser(userInfo)
        
        // get session
        session = await poo.getSession(userId, userInfo.day)

        if (!session) {
            // create session
            session = await poo.createSession(userId, userInfo.day)
        }

        return [session, userId]

    }catch(err){
        throw err
    }
}

const deleteUserAndPooList = async function(userId){
    try{
        // delete user
        await user.deleteUser(userId)
        // delete poo data
        await poo.deletePooList(userId)
    
    }catch(err){
        throw err
    }
}


const logoutUser = async function(){
    try{
        await closeDbConnection()
    }catch(err){
        throw err
    }
}



module.exports ={
    createUserAndPoolist,
    deleteUserAndPooList, 
    loginUser,
    logoutUser
}