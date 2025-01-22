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

    const deleteUser = async function (req, res) {
      const {
          params: { userId },
      } = req;
  
      // Validate userId
      if (!userId) {
          return res.status(400).send({
              data: {
                  error: 'Parameter is missing',
              },
          });
      }
  
      try {
          // Attempt to delete the user
          const response = await userService.deleteUser(userId);
  
          // Send success response
          res.status(200).send({
              status: 'OK',
              message: response,
          });
      } catch (err) {
          // Handle errors
          res.status(err?.status || 500).send({
              status: 'ERROR',
              message: err?.message || 'An unexpected error occurred',
          });
      }
  };
  

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