const pooService = require('../service/pooService')


const updateSession = async function(req, res){
    const {body} = req

    if(!body?.userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }
    if(!body?.day && !body?.times && !body?.sizes) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }

    try{
     
        const userInfo = {userId: body.userId, day: body.day, times: body.times, sizes: body.sizes}
        await pooService.updateSession(userInfo)
        res.send({status: "OK", data: "session was updated"})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}

const getAllSessions = async function(req, res){
    const {userId} = req.params

    if(!userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }

    try{
        const sessions = await pooService.getAllSessions(userId)
        res.send({status: "OK", data: sessions})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}
// iot device
const addElementToSession = async function(req, res){

        const {body} = req

        if(!body?.userId) {
            res.status(400).send({data: {error: 'userId is missing'}})
            return }
        if(!body?.day && !body?.time && body?.size) {
            res.status(400).send({data: {error: 'body parametrs are missing'}})
            return }
    
        try{
         
            const userInfo = {userId: body.userId, day: body.day, time: body.time, size: body.size}

            await pooService.addElementToSession(userInfo)
            res.send({status: "OK", data: "record was added"})

    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }
}


module.exports ={
    addElementToSession,
    updateSession,
    getAllSessions

  }