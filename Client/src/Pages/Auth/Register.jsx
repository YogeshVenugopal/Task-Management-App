import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import { validEmail } from '../../Utils/helper'
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector'
import Input from '../../Components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { API_PATH } from '../../Utils/apiPath'
import { UserContext } from '../../Context/userContext'
import axiosInstance from '../../Utils/axiosInstance'
import uploadImage from '../../Utils/uploadImage'

const Register = () => {
  const [profilePic, setProfilePic] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const navigate = useNavigate()
  const {updateUser} = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()
    
    if(!fullName){
      setError("Please enter your full name")
      return
    }
    
    if(!email || !password){
      setError("Please enter your email and password")
      return
    }
    
    if(!validEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    
    if(password.length < 8){
      setError("Password must be at least 8 characters")
      return
    }

    setError("")
    setIsLoading(true)
    let profileImageUrl = ""
    
    try {
      if(profilePic){
        setIsUploading(true)
        try {
          const imgUploadRes = await uploadImage(profilePic)
          profileImageUrl = imgUploadRes.imageUrl || ""
          setIsUploading(false)
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError)
          setIsUploading(false)
          setError("Failed to upload profile image. Please try again.")
          setIsLoading(false)
          return
        }
      }
      
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken: adminInviteToken || undefined 
      })

      const {token, role} = response.data;

      if (token){
        localStorage.setItem("token", token)
        updateUser(response.data)
      }

      if (role === "admin"){
        navigate("/admin/dashboard")
      } else if (role === "user") {
        navigate("/user/dashboard")
      } else {
        console.warn("Unknown user role:", role)
        navigate("/") 
      }

    } catch (error) {
      console.error("Registration error:", error)
      
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      } else {
        setError("Registration failed. Please check your information and try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold'>Create an account</h3>
        <p className='text-sm text-slate-600 mt-[5px] mb-6'>Join us today by entering your details below</p>
        
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector 
            image={profilePic} 
            setImage={setProfilePic} 
            disabled={isLoading || isUploading}
          />
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              label={"Full Name"} 
              type="text" 
              placeholder="John Doe" 
              disabled={isLoading}
              required
            />
            
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              label={"Email Address"} 
              type="email" 
              placeholder="john@example.com" 
              disabled={isLoading}
              required
            />
            
            <Input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              label={"Password"} 
              type="password" 
              placeholder="Min. 8 characters" 
              disabled={isLoading}
              required
            />
            
            <Input 
              value={adminInviteToken} 
              onChange={(e) => setAdminInviteToken(e.target.value)} 
              label={"Admin Invite Token (Optional)"} 
              type="text" 
              placeholder="6 digit code" 
              disabled={isLoading}
            />
          </div>
          
          {error && <p className='text-xs text-red-600 pb-2.5'>{error}</p>}

          <button 
            type='submit' 
            className='btn-primary'
            disabled={isLoading || isUploading}
          >
            {isUploading ? "UPLOADING IMAGE..." : isLoading ? "SIGNING UP..." : "SIGNUP"}
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