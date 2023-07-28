const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const getTask = asyncHandler(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
})

const setTask = asyncHandler( async  (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add a text field')
    }
    const task = await Task.create(req.body)
    res.status(200).json(task)
})

const updateTask =  asyncHandler(async  (req, res) => {
   const task = await Task.findById(req.params.id)

   if(!task) {
    res.status(400)
    throw new Error("Task not found")
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
   await task.remove()
    res.status(200).json({ message: 'Task was Deleted successfuly'})
})

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}