import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Button from '../components/Button';
const Register = () => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth)
  const [mess, setMess] = useState(isError)
  const  {name, email, password, password2} = formData
  useEffect(() => {
    if(isError) {
      setError(isError)
    }

    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
 const handleChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }))
 }

const handleSubmit =(e) => {
  e.preventDefault()
  if(password !== password2) {
    setError('Password do not match')
  } else {
    const userData = {
      name,
      email,
      password
    }

    dispatch(register(userData))
  }
}

  return (
    <div className='w-80 ml-auto bg-white rounded mr-auto border mt-10  flex shadow-md justify-center flex-col' >
    <section >
      <h1 className='flex p-2 w-full justify-center items-center text-xl  '>
        <FaUser /> <span className='ml-4'>Register</span>
      </h1>
      <p className='flex w-full justify-center items-center '>Please create an account</p>
    </section>
    {mess && <div className='text-red-500 ml-auto mr-auto'>Please fill all input field</div> }
    <section>
      <form onSubmit={handleSubmit}>
        <div className='p-2'>
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
            name='name'
            value={name}
            placeholder='Enter your name'
            id='name'
            onChange={handleChange}
          />
        </div>
        
        <div className='p-2'>
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
            type='email'
            name='email'
            value={email}
            placeholder='Enter your eamil'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
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
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            id='password'
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
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
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm your password'
            id='password2'
            onChange={handleChange}
          />
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div className='w-48 ml-auto mr-auto'>
          <Button className="mt-4 mb-4 ml-auto mr-auto" loading={isLoading}  type='submit'>
            Submit
          </Button>
          {isError && 'Error creating user...'}
        </div>
        
      </form>
    </section>
    </div>
  )
}

export default Register