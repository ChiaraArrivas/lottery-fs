const jwt = require("jsonwebtoken")

const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SERVER_PRIVATE_KEY,{issuer: "chat-app", expiresIn: "1day"})
}

const verifyToken = (token)=>{
    try {
        return jwt.verify(token, process.env.SERVER_PRIVATE_KEY)
    } catch (error) {
      console.log(error)  
    }
}

module.exports = {
    generateToken, verifyToken
}