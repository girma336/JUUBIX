import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const  {name, email, password, password2} = formData
 const handleChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }))
 }

const handleSubmit =() => {

}

  return (
    <>
    <section>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type='text'
            name='name'
            value={name}
            placeholder='Enter your name'
            id='name'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <input 
            type='email'
            name='email'
            value={email}
            placeholder='Enter your eamil'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <input 
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            id='password'
            onChange={handleChange}
          />
        </div>
        <div>
          <input 
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm your password'
            id='password2'
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>
            Submit
          </button>
        </div>
        
      </form>
    </section>
    </>
  )
}

export default Register