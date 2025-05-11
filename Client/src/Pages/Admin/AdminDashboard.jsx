import React from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth'
import DashboardLayout from '../../Components/Layouts/DashboardLayout';

const AdminDashboard = () => {
  useUserAuth();
  return (
    <DashboardLayout >AdminDashboard</DashboardLayout>
  )
}

export default AdminDashboard