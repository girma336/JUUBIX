import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import Button from './Button'

const TaskItem = ({task}) => {
  const dispatch = useDispatch()
  return (
    <div className='border rounded shadow-sm'>
        <div className='flex justify-between p-4'>
            <h2>{task.name}</h2>
            <Button onClick={() => dispatch(deleteTask(task._id))}><FaTrash /></Button>
            
        </div>
    </div>
  )
}

export default TaskItem