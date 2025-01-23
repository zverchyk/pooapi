const poo = require('../database/poo')


const updateSession = async function(userInfo){
    try{
        await poo.updateSession(userInfo)

    }catch(err){
        throw(err)
    }
}


module.exports ={
    updateSession

  }
  