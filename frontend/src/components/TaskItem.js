import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import Button from './Button'
import TaskEdit from './TaskEdit'

const TaskItem = ({task}) => {
  const [edit, setEdit] = useState()
  const dispatch = useDispatch()
  

  const handleDelete = () => {
    dispatch(deleteTask(task._id))
  }

  const handleUpdate = () => {
    setEdit(!edit)
  }

 
  return (
    <>
    <div className='border rounded bg-white rounde-lg shadow-xl '>
        <div className='flex justify-between p-4'>
            <h2>{task.name}</h2>
            <div className='flex justify-between'>
              <Button className='mr-2' onClick={handleUpdate}><FaEdit /></Button>
              <Button onClick={handleDelete}><FaTrash /></Button>
             </div>
        </div>   
    </div>
    { edit &&
    <div className='h-300 w-500 bg-gray-300 right-0 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded'>
     <TaskEdit className="h-300 w-500"  name={task.name} id={task._id}  />
     </div>
    } 
    </>
  )
}

export default TaskItem