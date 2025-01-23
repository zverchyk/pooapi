const pooService = require('../service/pooService')


const updateSession = async function(req, res){
    const {body} = req

    if(!body?.userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }
    if(!body?.day && !body?.times) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }

    try{
        const userInfo = {userId: body.userId, day: body.day, times: body.times}
        await pooService.updateSession(userInfo)
        res.send({status: "OK", data: "session was updated"})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}


module.exports ={
    updateSession,

  }