import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { logout } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)
  const onLogout = () => {
    dispatch(logout())
    // dispatch(reset())
    navigate('/')
  }
  return (
    <header className='w-full flex justify-between item-center h-13  border'>
        <div className='ml-10 pt-2 flex item-center'>
            <Link className='text-xl' to='/'>Task Setter</Link>
        </div>
        <ul className='flex justify-around item-center mr-10'>
           {user ? (<>
              <li className='p-1'>
                <Button className='flex p-2 w-full  hover:border rounded justify-center items-center text-xl' onClick={onLogout} >
                  <FaSignOutAlt /> <span className='ml-4'>Logout</span>
                </Button>
              </li>
            </>) : (<>
             <li className='p-1'>
                <Link to='/login' className='flex p-2 w-full  hover:border rounded justify-center items-center text-xl'>
                <FaSignInAlt /> <span className='ml-4'>Login</span>
                </Link>
            </li>

            <li className='p-1'>
                <Link className='flex p-2 w-full justify-center hover:border rounded items-center text-xl' to='/register'>
                <FaUser /> <span className='ml-4'>Register</span>
                </Link>
            </li>
           </>)}
        </ul>
    </header>
  )
}

export default Header