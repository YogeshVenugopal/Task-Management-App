import React from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'

const UserDashboard = () => {
  useUserAuth()
  return (
    <DashboardLayout activeMenu={"Dashboard"}>UserDashboard</DashboardLayout>
  )
}

export default UserDashboard