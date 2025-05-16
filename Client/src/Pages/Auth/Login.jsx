import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import Input from '../../Components/Inputs/Input'
import { validEmail } from '../../Utils/helper'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATH } from '../../Utils/apiPath'
import { UserContext } from '../../Context/userContext'

const Login = () => {
  
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {updateUser} = useContext(UserContext)

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
    setIsLoading(true)

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email, 
        password
      })

      const {token, role} = response.data;

      if(token){
        localStorage.setItem("token", token); 
        updateUser(response.data);
      }

      if(role === "admin"){
        navigate("/admin/dashboard")
      }else if(role === "user"){
        navigate("/user/dashboard")
      }else{
        console.warn("Unknown user role:", role);
        navigate("/")
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Unable to login. Please check your credentials or try again later.");
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[60%] md:mx-auto h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to login</p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            label={"Email Address"} 
            type="email" 
            placeholder="john@example.com" 
            disabled={isLoading}
          />
          
          <Input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            label={"Password"} 
            type="password" 
            placeholder="Min. 8 characters" 
            disabled={isLoading}
          />

          {error && <p className='text-xs text-red-600 pb-2.5'>{error}</p>}

          <button 
            type='submit' 
            className='btn-primary'
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOGIN"}
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