import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import { getTasks, reset } from '../features/tasks/taskSlice'
import TaskItem from '../components/TaskItem'
import Skeleton from '../components/Skeleton'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth )
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks)

  
    
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }else {
      dispatch(getTasks())
    }
    // 
   
    dispatch(reset())
  
  }, [user, navigate, isError, message, dispatch])
  
  if(isLoading) {
    return (
      <Skeleton times={6} className="h-10 w-full" />
    )
  }
  return (
    <div className='bg-gray-100'> 
    <section >
      <h1 className='flex p-2 w-full font-semibold justify-center items-center text-2xl'>
      Welcome {user && user.name}
      </h1>
      <p className='flex w-full justify-center items-center  text-gray-400'>Task Dashboard</p>
    </section>
    <div className='w-80 ml-auto rounded mr-auto border mt-10  flex shadow-md justify-center flex-col' >
      <section className='bg-white rounde-lg'>
         <TaskForm isLoading={isLoading} />
      </section>
      </div>
      <section className='w-98 m-5' >
        {tasks.length > 0 ? (
          <div className='w-98 grid grid-cols-2 gap-4'>
            {tasks.map((task) => (
              <TaskItem  className='bg-white rounde-lg' key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <h3>You have not set any Tasks</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard