const express = require("express")
const app = express.Router()

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"))

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"))

/**
 * @path /api/draws
 */
app.use("/draws", require("./routes/draws"))

/**
 * @path /api/wallet
 */
app.use("/wallet", require("./routes/wallet"))

/**
 * @path /api/bets
 */
app.use("/bets", require("./routes/bets"))



module.exports = app



