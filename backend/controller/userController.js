const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//@desc   Create a user if one does not already exist
//@route  POST api/users
//@access private
const registerUser = asyncHandler( async(req,res) =>{
const {name, email, password} = req.body

if (!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
}

//check if user exists
const userExists = await User.findOne({email})
if(userExists){
    res.status(400)
    throw new Error('User already exists')
}

//hash pass
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

//create user
const user = await User.create({
    name,
    email,
    password: hashedPassword
})

if (user){
    res.status(201).json({
    _id: user.id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
    })
} else{
    res.status(400)
    throw new Error('Invalid User Data')
}

res.json({message:'Register user'})
})


//@desc   Get user data
//@route  POST api/users
//@access private
const getMe = asyncHandler(async(req,res) =>{
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })

})


//@desc   login a user
//@route  POST api/users
//@access private
const loginUser = asyncHandler(async (req,res) =>{

const {email, password} = req.body

//assign user object to the user variable based on email address
const user = await User.findOne({email})
//validate for password
if (user && (await bcrypt.compare(password,user.password))){
    res.json({
    token:generateToken(user._id)
 })
 }else{
    res.status(400)
    throw new Error('Invalid credentials')
 }

})


//Generate JWT
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    }) 
}
module.exports={
    registerUser,
    getMe,
    loginUser
}