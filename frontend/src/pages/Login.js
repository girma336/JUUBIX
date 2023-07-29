import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const  { email, password } = formData
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
        <FaSignInAlt /> Register
      </h1>
      <p>Please create an account</p>
    </section>
    <section>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>
            Submit
          </button>
        </div>
        
      </form>
    </section>
    </>
  )
}

export default Login