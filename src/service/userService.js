const User = require('../database/users')
const poo = require('../database/poo')



const getUser = async function(userInfo){
    try{
        const user = await User.getUser(userInfo)
        return  user
    }catch(err){
        throw err
    }
}

const deleteUser = async function(userId){
    try{
        const responseUser = await User.deleteUser(userId)
        const responsePoo =await poo.deletePooList(userId)

        if(responseUser!== 0 && responsePoo !==0){
            return 'deletion succesful'
        }else{
            throw ({message:'deletion was unsuccesful'})
        }
       
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