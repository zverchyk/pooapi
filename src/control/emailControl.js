const emailService = require('../service/emailService')


const sendMail = async function(req, res){
    const {body} = req

    if(!body?.email) {
        res.status(400).send({data: {error: 'email is missing'}})
        return }
    if(!body?.imageData) {
        res.status(400).send({data: {error: 'body parametrs are missing'}})
        return }

    try{
        
        await emailService.sendMail(body.email, body.imageData)
        res.send({status: "OK", data: "session was updated"})
    }catch(err){
        res.status(err?.status ||500).send({error: err?.message || err})
    }

}


module.exports ={
    sendMail

  }