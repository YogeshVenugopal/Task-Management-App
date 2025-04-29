import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
const Input = ({ value, onChange, label, type, placeholder }) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className="input-box flex justify-between">
                <input
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === 'password' && (
                    <>
                        {
                            showPassword ? (
                                <FaRegEye onClick={toggleShowPassword} size={22} className='text-blue-500 cursor-pointer ' />
                            )
                                :
                                (
                                    <FaRegEyeSlash onClick={toggleShowPassword} size={22} className='text-slate-500 cursor-pointer' />
                                )
                        }
                    </>
                )}

            </div>


        </div>
    )
}

export default Input