import React, { useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import { validEmail } from '../../Utils/helper'
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector'
import Input from '../../Components/Inputs/Input'
import { Link } from 'react-router-dom'

const Register = () => {
  const[profilePic, setProfilePic] = useState("")
  const[fullName, setFullName]  = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[adminInviteToken, setAdminInviteToken] = useState("")

  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if(!fullName){
      setError("Please enter your full name")
    }
    if(!email||!password){
      setError("Please enter your email and password")
    }
    if(!validEmail(email)){
      setError("Please enter a valid email address")
    }
    if(password.length < 8){
      setError("Password must be at least 8 characters")
    }
  }
  
  return (

    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold'>Create an account</h3>
        <p className='text-sm text-slate-600 mt-[5px] mb-6'>Join us today by entering your details below</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} label={"Full Name"} type="text" placeholder="john" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} label={"Email Address"} type="text" placeholder="john@example.com" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} type="text" placeholder="Min. 6 character" />
          <Input value={adminInviteToken} onChange={(e) => setAdminInviteToken(e.target.value)} label={"Admin Invite Token"} type="text" placeholder="6 digit code" />
          </div>
          {error && <p className='text-xs text-red-600 pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGNUP
          </button>

          <p className='text-[13px] text-slate-700 mt-3'>
            Already have an account?{" "}
            <Link to={"/login"} className='text-blue-500 underline font-medium'>Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register