const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('../model/userModel')

const protect = asyncHandler (async(req,res,next)=>{
    
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
           
            //Get Token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token and assign jwt payload to decoded field
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user id from the token and exclude the password
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        }catch(error){
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    
    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

module.exports  ={protect}