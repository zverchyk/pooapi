const pooService = require('../service/pooService')


const createPooList = async function(req, res){
    const {params: userid} = req
    if(!userid) {
        res.status(400).send({error: 'userid is missing'})
        return }
    try{
        const response = pooService.createPooList(userid)
        res.send({status: "OK",
            data: {message: ` poo list created ${response}`}})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }
    
}

const getPooList = async function(req, res){
    const {params: userid} = req
    if(!userid) {
        res.status(400).send({data: {error: 'userid is missing'}})
        return }
    try{
        const response = pooService.getPooList(userid)
        res.send({status: "OK",
            data: {poolist: response,
                                    message: "poolist recieved"
        }})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }
}

const updateSession = async function(req, res){
    const {body, 
        params: userid} = req
    if(!userid) {
        res.status(400).send({data: {error: 'userid is missing'}})
        return }
    if(!body?.day && !body?.times) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }
    try{
        const response = pooService.updateSession(userid, body)
        res.send({status: "OK", data: {message: ` poo list updated ${response}`}})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}

module.exports ={
    createPooList,
    getPooList,
    updateSession
  }