import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATH } from '../../Utils/apiPath';
import { LuUser } from 'react-icons/lu';

const SelectUser = ({ selectedUsers, setSelectedUsers }) => {

    const [allUsers, setAllUsers] = useState([]);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const[tempSelectedUsers, setTempSelectedUsers] = useState([]);  

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATH.USER.GET_ALL_USERS);
            if(response.data?.length > 0){
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const toggleUserSelection = (user) => {
        setTempSelectedUsers((prev) => {
            const isSelected = prev.some(u => u._id === user._id);
            if (isSelected) {
                return prev.filter(u => u._id !== user._id);
            } else {
                return [...prev, user];
            }
        });
    }

    const handleAssign = () =>{
        setSelectedUsers(tempSelectedUsers);
        setIsOpenModel(false);
    }

    const selectUserAvatar = allUsers.filter((user) => selectedUsers.includes(user._id)).map((user) => user.profileImage);

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }

        return() => {}
    }, [selectedUsers]);

  return (
    <div className='space-y-2 mt-2'>
        {
            selectUserAvatar.length === 0 && (
                <button className='card-btn' onClick={() => setIsOpenModel(true)}>
                    <LuUser className='text-sm'/>Add Member
                </button>
            )
        }
    </div>
  )
}

export default SelectUser