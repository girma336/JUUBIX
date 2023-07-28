const express = require('express');
const router = express.Router();
const {
    getTask,
    updateTask,
    deleteTask,
    setTask
} = require('../controllers/taskController');

router.route('/').get(getTask).post(setTask);

router.route('/:id').delete(deleteTask).put(updateTask)

module.exports = router;