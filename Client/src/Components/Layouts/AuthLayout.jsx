import React from 'react'
import loginImage from '../../assets/loginImage.png'
const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h1 className='md:text-2xl text-lg font-medium text-black'>Task Manager</h1>
            {children}
        </div>    
        
        <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-gradient-to-br from-sky-200 to-blue-400'>
            <img src={loginImage} alt="Image" />
        </div>
    </div>
  )
}

export default AuthLayout