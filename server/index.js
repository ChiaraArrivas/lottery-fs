require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const db = require("./db")

app.use(cors())
app.use(helmet())

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))

/**
 * @path /api
 */
app.use("/api",require("./api"))

/**
 * @path /auth
 */
app.use("/auth",require("./auth/token"))

app.listen(process.env.SERVER_PORT,()=> console.log(`server up running on port ${process.env.SERVER_PORT}`))
db.connect(()=> console.log("mongodb connected"))
