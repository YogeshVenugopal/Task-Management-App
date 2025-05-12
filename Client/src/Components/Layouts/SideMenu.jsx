import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../Utils/data';
import { useNavigate } from 'react-router-dom'

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate()
  
  console.log(user);
  const handleNavigate = (path) => {
    if(path ==="logout"){
      handleLogout();
    }
    navigate(path);
  }

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  }

  useEffect(() => {
    if(user){
      setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => {}
  },[user]);
  return (
    <div className='w-63 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
          <img src={user?.uploadImage || ""} alt="ProfileImage" className='w-20 h-20 bg-slate-400 rounded-full' />
        </div>

        {
          user?.role === "admin" && (
            <div className='text-[10px] font-medium text-white bg-blue-500 px-3 py-0.5 rounded-full mt-1'>
              Admin
            </div>
          )
        }

        <h5 className='text-gray-950 font-medium leading-6 mt-3'>
          {user?.name|| ""}
        </h5>

        <p className='text-[12px] text-gray-600'>{user?.email || ""}</p>
      </div>

      { sideMenuData.map((item, index) => (
        <button
        key={`menu_${index}`}
        onClick={() => handleNavigate(item.path)}
        className={`w-full flex items-center gap-4 text-[15px]${
          activeMenu === item.label?
          "text-blue-500 bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
          :""
          } py-3 px-6 mb-3 cursor-pointer`}
        >
          <item.icon className=""/>
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu