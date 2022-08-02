const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')


//@desc   Goals
//@route  GET api/goals
//@access private
const getGoals =asyncHandler ( async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@desc   Create Goal
//@route  POST api/goals
//@access private
const setGoal = asyncHandler (async (req,res) => {

    if (!req.body.text){
        console.log('error setgoal hit')
        res.status(400)
        throw new Error('Please add a text field')
    }
    
   
    console.log(req.body.text)
    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id
    })

    res.status(200).json({goal})
})

//@desc Update goal
//@route UPDATE api/goals/:id
//@access private
const updateGoal = asyncHandler (async (req,res) => {
   

 
   const goal = await Goal.findById(req.params.id)
 
    if (!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    
    //check if user exists
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user can only update his goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    
    res.status(200).json(updatedGoal)
})

//@desc Delete goal
//@route DELETE api/goals/:id
//@access private
const deleteGoal = asyncHandler (async (req,res) => {
    console.log('deletegoal hit')
    console.log(req.params.id)
    const goal = await Goal.findById(req.params.id)
    
    console.log(goal)
    if (!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
const user = await User.findById(req.user.id)
    
    //check if user exists
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user can only update his goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const deletedGoal = await Goal.remove(goal)
    res.status(200).json(deletedGoal)
})



module.exports = {getGoals,setGoal,updateGoal,deleteGoal}