const userService = require('../service/userService')


// body requires user' info: email, password, today
const createUser = async (req,res)=>{
        const { body } = req
        if(!body) {
          res.status(400).send({data: {error: "body is missing"}})
          return
        }
        if (!body.email && !body.password && !body.day){
          res.status(400).send({data: {error: "parametr is missing"}})
          return
        }
        try{
          const userId =await userService.createUserAndPoolist(body)

          res.status(200).send({status: 'OK', data:{
            userId: userId,
            message: `new user succsesfully created!!`}})
        }catch(err){
          res.status(err?.status ||500).send({error: err?.message || err})
      }


    }
const loginUser = async (req,res)=>{
      const {day,email, password} =req.query
        // Validate if required parameters are missing
      if (!email || !password || !day) {
        res.status(400).send({
          data: { error: "Missing required parameters: email, password, or day" },
        });
        return;
      }
      const body = {day: day, email:email, password: password}

       try{
        const [session, userId] = await userService.loginUser(body)
        console.log(session)
        res.status(200).send({
          status: 'OK',
          data: {
          userId: userId,
          session: session? session.times: `todays' session created`}
        })

       }catch(err){
        console.error(err)
        res.status(err?.status || 500).send({error: err?.message || err})
       }
  
  
  }

const deleteUser = async function (req, res) {
      const {params: { userId },} = req;
  
      // Validate userId
      if (!userId) {
          return res.status(400).send({data: {error: 'Parameter is missing'},
          });
      }
  
      try {
          // Attempt to delete the user and poo data
          await userService.deleteUserAndPooList(userId);
  
          // Send success response
          res.status(200).send({
              status: 'OK',
              message: "user successfully deleted",
          });
      } catch (err) {
          // Handle errors
          res.status(err?.status || 500).send({
              status: 'ERROR',
              message: err?.message || 'An unexpected error occurred',
          });
      }
  };
  
const logoutUser = async function(req, res){
  try{
    await userService.logoutUser()
    res.status(200).send({data: 'user succesfuly logged out'})
   }catch(err){
    res.status(err?.status || 500).send({
      status: 'ERROR',
      message: err?.message || 'An unexpected error occurred',
  });
  }
}




  


    module.exports ={
      createUser,
      deleteUser, 
      loginUser,
      logoutUser
      
  }