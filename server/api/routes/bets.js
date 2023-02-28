const express = require("express");
const app = express.Router();

const Joi = require('joi');
const { Draw, Bet, User } = require("../../db");
const { authUser } = require("../../middleware/auth");
const { serverErrorOut } = require("../../utilities/log");

/**
 * @path /api/bets
 */
app.post('/', authUser, async (req, res)=> {
    const user = req.user._id;
    const schema = Joi.object().keys({
        numbers: Joi.array().items(Joi.number()).length(6).required()
    });
    try {
        const data = await schema.validateAsync(req.body);

        const activeDraw = await Draw.findOne({status: "pending"}, null, {lean: true});  
        if (!activeDraw) {
            return res.status(404).json({message: 'active draw not found'})
        }

        if (req.user.wallet < 2) {
            return res.status(400).json({message: 'not enough funds to create a new bet'})
        }

        // create new bet
        const bet = new Bet({user, draw: activeDraw._id, numbers: data.numbers});

        // update user wallet
        await User.updateOne({_id: user}, {
            wallet: req.user.wallet - 2, 
        })

        // update draws jackpot
        await Draw.updateOne({_id: activeDraw._id}, {
            jackpot: activeDraw.jackpot + 2,
        })

        const newBet = await bet.save()

        return res.status(201).json(newBet._doc || newBet);
    } catch (err) {
        return serverErrorOut(res, err)
    }

})



module.exports = app;