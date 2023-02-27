const serverErrorOut = (res,error,code = 500,message = "Internal Server Error")=>{
    console.log(error)
    return res.status(code).json({message})
}

module.exports = {
    serverErrorOut,
}