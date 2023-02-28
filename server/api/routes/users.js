const express = require("express")
const app = express.Router()
const Joi = require("joi");
const bcrypt = require("bcryptjs")
const { User } = require("../../db");
const { serverErrorOut } = require("../../utilities/log");


/**
 * get all users paginated
 * @path /api/users
 * @method GET
 */
app.get("/", async (req,res)=> {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;

    try {
        const users = await User.paginate({}, {
            page,limit, lean: true, select: "-__v -password"
        });

        return res.status(200).json(users)

    } catch (error) {
        return serverErrorOut(res,error)
    }
})

/**
 * get user by id
 * @path /api/users/:user_id
 * @method GET
 */
app.get("/:user_id", async (req,res)=>{

    const _id = req.params.user_id;

    try {
        const user = await User.findOne({_id}, "-__v -password", {lean: true})

        return res.status(200).json({...user})

    } catch (error) {
        return serverErrorOut(res,error)
    }
})


/**
 * register new user
 * @path /api/users
 * @method POST 
 */
app.post("/", async (req,res) => {
   const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
   });

   try {
    const data = await schema.validateAsync(req.body);

    data.password = bcrypt.hashSync(data.password,12)

    const user = await new User({
        ...data
    }).save()

    delete user._doc.password;
    delete user.password;

    return res.status(201).json(user._doc || user)
   } catch (error) {
    return serverErrorOut(res,error)
   }

})

module.exports = app