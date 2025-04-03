import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Dashboard from './Pages/Admin/Dashboard'
import MyDashboard from './Pages/User/MyDashboard'
import UserTask from './Pages/User/UserTask'
import PrivateRoutes from './Routes/PrivateRoutes'
import CreateTask from './Pages/Admin/CreateTask'
import ManageTask from './Pages/Admin/ManageTask'
import ManageUsers from './Pages/Admin/ManageUsers'
import ViewTaskDetails from './Pages/User/ViewTaskDetails'
 
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoutes allowedRoles={['admin']} />} >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/createTask" element={<CreateTask />} />
            <Route path="/admin/task" element={<ManageTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          <Route element={<PrivateRoutes allowedRoles={['user']} />} >
            <Route path="/user/dashboard" element={<MyDashboard />} />
            <Route path="/user/task" element={<UserTask />} />
            <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App