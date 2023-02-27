const express = require("express")
const { serverErrorOut } = require("../utilities/log")
const Joi = require("joi")
const {User} = require("../db")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utilities/auth")



const app = express.Router()


/**
 * @path /auth/token
 */
app.post("/token", async (req,res)=> {

    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    try {
        const data = await schema.validateAsync(req.body)

        const user = await User.findOne({ email: data.email, is_active: true}, "-__v",{lean: true})

        if(!user){
            return res.status(404).json({message: "wrong email or password"})
        }

        const is_valid_password = bcrypt.compareSync(data.password, user.password)

        if(!is_valid_password){
            return res.status(404).json({message: "wrong email or password"})
        }

        delete user.password

        const token = generateToken({
            _id: user._id,
            email: user.email
        })

        return res.status(201).json({token,user})

    } catch (error) {
        return serverErrorOut(res,error) 
    }
})

module.exports = app
