const pooService = require('../service/pooService')


const createPooList = async function(req, res){
    const {params: {userId}} = req
    if(!userId) {
        res.status(400).send({error: 'userId is missing'})
        return }
    try{

        const response = await pooService.createPooList(userId)
        res.send({status: "OK",
            data: {
                message: response
            }})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }
    
}

const getSession = async function(req, res){
    const {params: {userId}, query: {day}} = req
   
    if(!userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }
    if(!day) {
        res.status(400).send({data: {error: 'day is missing'}})
        return }
    try{
        const userInfo = {userId: userId, day: day}
        const response = await pooService.getSession(userInfo)

        res.send({status: "OK",
            data: {
                times: response
        }})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }
}

const updateSession = async function(req, res){
    const {body, 
        params: {userId}} = req
    if(!userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }
    if(!body?.day && !body?.times) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }
    try{
        const userInfo = {userId: userId, day: body.day, times: body.times}
        const response = await pooService.updateSession(userInfo)
        res.send({status: "OK", data: {message: response}})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}

const createSession = async function(req, res){
    const {params: {userId}, query: {day}} = req
    if(!userId) {
        res.status(400).send({data: {error: 'userId is missing'}})
        return }
    if(!day) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }
 try {   
    const userInfo = {userId: userId, day: day}
    const response = await pooService.createSession(userInfo) 
    res.send({status: "OK", data: response})



 }catch(err){
    res.status(err?.status ||500).send({error: err?.message || err})
}
}

module.exports ={
    createPooList,
    getSession,
    updateSession,
    createSession
  }