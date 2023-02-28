const express = require("express");
const { authUser } = require("../../middleware/auth");
const app = express.Router();
const Joi = require("joi");
const { User } = require("../../db");
const { serverErrorOut } = require("../../utilities/log");


/** 
 * @path /api/wallet/deposit
*/
app.post("/deposit", authUser, async (req, res) => {
    const user_id = req.user._id;
    const schema = Joi.object().keys({
        amount: Joi.number().required(),
    })

    try{

        const data = await schema.validateAsync(req.body);
        
        const {wallet} = await User.findOne({_id: user_id}, "wallet", {lean: true});
        
        const newWallet = wallet + data.amount;
        
        await User.updateOne({_id: user_id}, {wallet: newWallet});
        
        return res.status(200).json({
            ...req.user,
            wallet: newWallet,
        })

    }catch(err){
        serverErrorOut(res,err);
    }
})



module.exports = app;