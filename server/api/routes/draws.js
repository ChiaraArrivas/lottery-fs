const express = require("express");
const { Draw } = require("../../db");
const { serverErrorOut } = require("../../utilities/log");
const app = express.Router();

/**
 * @path /api/draws?page=1&limit=10
 */
app.get("/", async(req, res)=> {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    try{
        const draws = await Draw.paginate({}, {page, limit});
        return res.status(200).json(draws);

    }catch(err){
        serverErrorOut(res,err);
    }
})

/**
 * @path /api/draws/active
 */
app.get("/active", async (req, res) => {
    try{
        const activeDraw = await Draw.findOne({status: "pending"}, null, {lean: true});
        return res.status(200).json(activeDraw || {});    

    }catch(err){
        serverErrorOut(res,err);
    }
})

/**
 * @path /api/draws
 */
app.post("/", async (req, res) => {
    try{
        const activeDraw = await Draw.findOne({status: "pending"}, null, {lean: true});
        if(activeDraw){
            return res.status(200).json(activeDraw);    
        }
        const draw = await new Draw({jackpot: 1000}).save();
        return res.status(201).json(draw._doc || draw);

    }catch(err){
        serverErrorOut(res,err);
    }
})








module.exports=app;