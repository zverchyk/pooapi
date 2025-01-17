const userService = require('../service/userService')



const createUser = async (req,res)=>{
        const { body } = req
        if(!body) {
            res
        .status(400)
        .send({data: 
        {
          error: "parametr is missing"
        }
      })
        }
        try{
          const userId =await userService.createUser(body)

          res.send({status: 200, data:{
            userId: userId,
            message: `new user succsesfully created!!`}})
        }catch(err){
          res.status(err?.status ||500).send({error: err?.message || err})
      }


    }

const deleteUser =async function(req, res){
  const {params: userId} =req
  if(!userId) {
    res
.status(400)
.send({data: 
{
  error: "parametr is missing"
}
})
}
    try{
      await userService.deleteUser(userId)
      res.send({status: "OK", message:'user seccesfully deleted'})

    }catch(err){
      res.send({status: err?.status ||500, message: err?.message || err})
    }
  
}

const getUser = async (req,res)=>{
    const {email, password} =req.query
    const body = {email: email, password: password}
    if(!body) {
      res
      .status(400)
      .send({data:  {
          error: "parametr is missing"
        }
      })
      return 
     }
     try{
      const user = await userService.getUser(body)
      if(user) {
        res.send({status: "OK", data: user})
        return 
      }
      if(!user) throw {status: 403, message: 'access denied'}
     }catch(err){
      res
      .status(err?.status || 500)
      .send({error: err?.message || err})
     }


}

const findUser = async(req, res)=>{
  const {username} =req.query
  console.log(username)
  if(!username) {
    res
    .status(400)
    .send({data:  {
        error: "username is missing"
      }
    })
    return 
   }
   try{     
    const isExist = await userService.findUser(username)
    res.send({status: "OK", exist: isExist})

   }catch(err){
      res
      .status(err?.status || 500)
      .send({error: err?.message || err})
     }
}

  


    module.exports ={
      createUser,
      deleteUser, 
      getUser,
      findUser
  }