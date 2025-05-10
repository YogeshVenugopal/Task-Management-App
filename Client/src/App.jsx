import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import PrivateRoute from './routes/PrivateRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateTask from './Pages/Admin/CreateTask'
import ManageUser from './Pages/Admin/ManageUser'
import ManageTask from './Pages/Admin/ManageTask'
import ViewTaskDetails from './Pages/User/ViewTaskDetails'
import MyTask from './Pages/User/MyTask'
import UserDashboard from './Pages/User/UserDashboard'
import UserProvider, { UserContext } from './Context/userContext'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<PrivateRoute allowedRoles={['admin']} />} >
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/create-task' element={<CreateTask />} />
            <Route path='/admin/users' element={<ManageUser />} />
            <Route path='/admin/tasks' element={<ManageTask />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['user']} />} >
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/tasks' element={<MyTask />} />
            <Route path='/user/tasks/:id' element={<ViewTaskDetails />} />
          </Route>

          <Route path='/' element={<Root />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App


const Root = () =>{
  const { user, loading } = useContext(UserContext);

  if(loading) return <Outlet />

  if(!user){
    return <Navigate to="/login" />
  }
  
  return user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}