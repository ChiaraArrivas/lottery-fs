const {User} = require("../db");
const { verifyToken } = require("../utilities/auth");
const { serverErrorOut } = require("../utilities/log");


const authUser = async (req,res,next)=>{
    const bearerToken = req.headers.authorization || null;

    
    if(!bearerToken){
        return res.status(403).json({message: "Not Authorized"})
    }

    try {

        const token = bearerToken.replace("Bearer ","")
        const decoded = verifyToken(token)

        if(!decoded){
            return res.status(403).json({message: "Not Authorized"})
        }

        const user = await User.findOne({ _id: decoded._id, is_active: true}, "-__v -password",{lean: true})

        if(!user){
            return res.status(403).json({message: "Not Authorized"})
        }

        req.user = user

        return next()

    } catch (error) {
        return serverErrorOut(res,error) 
    }
}

module.exports = {authUser}

