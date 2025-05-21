import React, { useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../Utils/data'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATH } from '../../Utils/apiPath'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { LuTrash2 } from 'react-icons/lu';

const CreateTask = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = localStorage.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    attachments: [],
    todoCheckList: []
  })

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      attachments: [],
      todoCheckList: []
    })
  }

  const createTask = () => { }
  const updateTask = () => { }
  const handleSubmit = () => { }
  const getTaskDetailById = () => { }
  const deleteTask = () => { }


  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              <h2 className=''>
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {
                taskId && (
                  <button className='' onClick={setOpenDeleteAlert(true)}>
                    <LuTrash2 className='' /> Delete
                  </button>
                )
              }
            </div>

            <div className="">
              <label className="">
                Task Title
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask