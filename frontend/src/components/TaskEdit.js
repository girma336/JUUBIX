import React, { useState } from 'react'
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';

const TaskEdit = ({name, id}) => {
  const [newname, setTask] = useState(name);
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.tasks)
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateTask({name: newname, _id: id}))
  }
  return (
    <div>
        <div className='p-2 shadow-lg'>
        <section>
          <p className='flex w-full mb-4 text-lg justify-center items-center rounded-lg '>Update task </p>
        </section>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                className='placeholder:italic
                placeholder:text-slate-400 
                block bg-white w-full border
                border-slate-300 rounded-md 
                py-2 pl-9 pr-3 shadow-sm 
                focus:outline-none
                 focus:border-sky-500
                  focus:ring-sky-500 
                  focus:ring-1 sm:text-sm'
                  type='text'
                  value={newname}
                  id='name'
                  onChange={(e) => setTask(e.target.value)}
                />
            </div>
          <div className='w-48 ml-auto mr-auto'>
            <Button className="bg-blue-500 rounded mt-4 mb-4 ml-auto mr-auto" loading={isLoading}  type='submit'>
              Submit
            </Button>
        </div>
        </form>
    </div>
    </div>
  )
}

export default TaskEdit