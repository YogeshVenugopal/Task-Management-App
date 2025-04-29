import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import Input from '../../Components/Inputs/Input'
import { validEmail } from '../../Utils/helper'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields")
      return
    }

    if(!validEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setError("")
  }

  const navigate = useNavigate()
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to login</p>

        <form onSubmit={handleLogin}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} label={"Email Address"} type="text" placeholder="john@example.com" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} type="password" placeholder="Min. 8 characters" />

          {error && <p className='text-xs text-red-600 pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-700 mt-3'>
            Don't have an account?{" "}
            <Link to={"/register"} className='text-blue-500 underline font-medium'>SignUp</Link>
          </p>
        </form>
      </div>

    </AuthLayout>
  )
}

export default Login