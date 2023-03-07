const express = require("express");
const { Draw, Bet, User } = require("../../db");
const { serverErrorOut } = require("../../utilities/log");
const app = express.Router();
const { drawNumbers, compareBets } = require("../../utilities/game");
const { retriveDrawSettings } = require("../../utilities/setting");

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

/**
 * @path /api/draws
 */
app.put('/', async (req, res)=> {
    try {
        //find active draw
        const activeDraw = await Draw.findOne({status: "pending"}, '-__v', {lean: true});

        //random draw (6 numbers)
        const randomDrawNumbers = drawNumbers(6);
        
        
        //find all active bets for given id (draw id)
        const activeBets = await Bet.find({draw: activeDraw._id, status: "pending"}, '-__v', {lean: true});

        //filter winning bets
        const mappedBets = compareBets(randomDrawNumbers, activeBets);
        
        //find draw settings
        const drawSettings = await retriveDrawSettings();

        //find prize for each combination accordingly to draw settings
        const prizeMap = drawSettings.steps.map(step => {
            return {
                combination: step.counter,
                totalPrize: activeDraw.jackpot * step.value / 100,
            }
        })

        //map all winning bets
        // array of { combination: n, totalWinners: m} with n from 2 to 6
        const winningBets = [
            { combination: 2, totalWinners: 0},
            { combination: 3, totalWinners: 0},
            { combination: 4, totalWinners: 0},
            { combination: 5, totalWinners: 0},
            { combination: 6, totalWinners: 0}
        ]; 
        
        mappedBets.forEach(bet => {
            if (bet.won) {
                const winning_index = winningBets.findIndex(item => item.combination == bet.combination);

                winningBets[winning_index].totalWinners += 1;
            }
        })

        // adding single prize on prize map
        winningBets.forEach(winning => {
            const prize_index = prizeMap.findIndex(item => item.combination == winning.combination);
            prizeMap[prize_index].singlePrize = winning.totalWinners != 0 ? prizeMap[prize_index].totalPrize / winning.totalWinners : 0;
        })

        // assigning prize to bet
        let totalPrize = 0;
        mappedBets.forEach((bet, index) => {
            const winning = prizeMap.find(item => item.combination == bet.combination);
            
            if (winning) {
                mappedBets[index].winningPrize = winning.singlePrize;
                totalPrize += winning.singlePrize;
            }
        })

        const newJackpot = activeDraw.jackpot - totalPrize;

        //close existing draw session and create a new one (adding remaining jackpot)
        await Draw.updateOne({ _id: activeDraw._id }, { 
            status: "done", 
            numbers: randomDrawNumbers,
            stats: {
                prizeMap, 
                winningBets, 
                totalPrize,
            }
        });
        
        
        for (let i = 0; i < mappedBets.length; i++) {
            const currentBet = mappedBets[i];

            // update single won bets
            await Bet.updateOne({ _id: currentBet._id }, {
                selected_numbers: currentBet.selected_numbers,
                status: "done",
                won: currentBet.won,
                prize: currentBet.winningPrize,
            });

            // update user wallets
            if (currentBet.won) {
                const currentUser = await User.findOne({ _id: currentBet.user }, "wallet", { lean: true });
                await User.updateOne({ _id: currentBet.user }, { wallet: currentUser.wallet + currentBet.winningPrize });
            }
        }

        // create new draw session
        const draw = await new Draw({jackpot: newJackpot}).save();

        return res.status(201).json({ mappedBets })
    } catch (err) {
        serverErrorOut(res, err);
    }
})










module.exports=app;