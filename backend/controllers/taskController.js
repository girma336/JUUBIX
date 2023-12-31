const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')


const getTask = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })
    res.status(200).json(tasks)
})

const setTask = asyncHandler( async  (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add a text field')
    }
    const task = await Task.create({
        name: req.body.name,
        user: req.user.id
    })
    res.status(200).json(task)
})

const updateTask =  asyncHandler(async  (req, res) => {
   const task = await Task.findById(req.params.id)
   
   if(!task) {
    res.status(400)
    throw new Error("Task not found")
   }

//    const user  = await User.findById(req.user.id)

   if(!req.user) {
    res.status(400)
    throw new Error('User not found')
   }

   if(task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
   }
   
   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
   })
    res.status(200).json(updatedTask)
})


const deleteTask =  asyncHandler(async  (req, res) => {
    const task = await Task.findById(req.params.id)

   if(!task) {
    res.status(400)
    throw new Error("Task not found")
   }
   
//    const user  = await User.findById(req.user.id)

   if(!req.user) {
    res.status(400)
    throw new Error('User not found')
   }

   if(task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
   }
   
   const taskNod = await Task.deleteOne( {_id: task.id})
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}