const express = require('express');
const router = express.Router();
const {
    getTask,
    updateTask,
    deleteTask,
    setTask
} = require('../controllers/taskController');

const  { protect } = require('../middelware/authMiddelware')


router.route('/').get(protect, getTask).post(protect, setTask);

router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)

module.exports = router;