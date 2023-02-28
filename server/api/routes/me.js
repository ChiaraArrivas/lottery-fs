const express = require("express")
const { Bet } = require("../../db")
const {authUser} = require("../../middleware/auth")
const { serverErrorOut } = require("../../utilities/log")

const app = express.Router()


/**
 * @path /api/me
 */
app.get("/",authUser, async (req,res)=>{
    try {
        const bets = await Bet.find({user: req.user._id, status:'pending'}, '-__v', {lean: true});

        const user = {...req.user, bets};

        return res.status(200).json(user)  
    } catch (err) {
        return serverErrorOut(res, err)
    }
})


module.exports = app