const User = require('../database/users')



const getUser = async function(userInfo){
    try{
        const user = await User.getUser(userInfo)
        return  user
    }catch(err){
        throw err
    }
}

const deleteUser = function(userId){
    try{
        User.deleteUser(userId)
    }catch(err){
        throw err
    }
}

const createUser = async function(body){
    try{
        const userid = await User.createUser(body)
        return userid
    }catch(err){
        throw err
    }
}

const findUser = async function(userName) {
    try{
        const isExist = await User.findUser(userName)
        return isExist 
    }catch(err){
        throw err
    }
}





module.exports ={
    createUser,
    deleteUser, 
    getUser,
    findUser
}