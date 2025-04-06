import React from 'react'
import Login from '../../assets/login.jpg'
const AuthLayout = ({ children }) => {
    return (
        <>
            <div className='header text-xl md:text-3xl font-bold text-[#4C57FE] '>
                Task Manager
            </div>
            <div className='h-[calc(100vh-80px)] flex justify-center items-center'>
                {children}
                <div className='hidden w-1/2 h-[100%] bg-[#4C57FE] md:flex justify-center items-center relative'>
                    <p className='absolute text-white font-bold md:text-2xl lg:text-6xl lg:top-[15%] md:top-[25%] lg:right-[50%] md:right-[60%]'>Let's Get Start</p>
                    <img src={Login} alt="Images" />
                    <p className='absolute text-white font-bold md:text-2xl lg:text-6xl lg:bottom-[15%] md:bottom-[25%] lg:left-[50%] md:left-[50%]'>
                        with your Team
                    </p>
                </div>
            </div>
            
        </>
    )
}

export default AuthLayout

// #4C57FE