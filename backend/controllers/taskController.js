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

   const user  = await User.findById(req.user.id)

   if(!user) {
    res.status(400)
    throw new Error('User not found')
   }

   if(task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
   }
   
   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
   })
    res.status(200).json({ message: 'Task was updated successfuly'})
})


const deleteTask =  asyncHandler(async  (req, res) => {
    const task = await Task.findById(req.params.id)

   if(!task) {
    res.status(400)
    throw new Error("Task not found")
   }
   
   const user  = await User.findById(req.user.id)

   if(!user) {
    res.status(400)
    throw new Error('User not found')
   }

   if(task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
   }
   
   await task.remove()
    res.status(200).json({ message: 'Task was Deleted successfuly'})
})

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}