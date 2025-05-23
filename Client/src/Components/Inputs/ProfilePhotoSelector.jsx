import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleChangeImage = (e) => {
        const file = e.target.files[0]

        if(file){
            setImage(file)
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = (e) =>{
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }
  return (
    <div className='flex justify-center mb-6'>
        <input type="file"
        accept='image/*'
        ref={inputRef} 
        onChange={handleChangeImage}
        className='hidden' />

        {!image ?(
            <div className='w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer'>
                <LuUser className='text-4xl text-blue-500'/>
                <button 
                type='button'
                className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white absolute -bottom-1 -right-1 cursor-pointer'
                onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>
            </div>
        ) : (

            <div className='relative'>
                <img src={previewUrl} alt="profile Image" className='w-20 h-20 object-cover rounded-full'/>
                <button type="button" className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1' onClick={handleRemoveImage}>
                    <LuTrash />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector