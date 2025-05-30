import React, { useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../Utils/data'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATH } from '../../Utils/apiPath'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '../../Components/Inputs/SelectDropdown'

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
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-medium'>
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {
                taskId && (
                  <button className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 cursor-pointer' onClick={setOpenDeleteAlert(true)}>
                    <LuTrash2 className='text-base' /> Delete
                  </button>
                )
              }
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input type="text"
              placeholder='Create App UI'
              className='form-input'
              value={taskData.title}
              onChange={(e) => handleValueChange("title", e.target.value)} 
              />
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>

              <textarea
                rows={4}
                placeholder='Describe Task'
                className='form-input'
                value={taskData.description} 
                onChange={(e) => handleValueChange("description", e.target.value)}
              />
            </div>


            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className='col-span-6 md:col-span-3'>
                <label className='text-xs font-medium text-slate-600'>
                  Priority
                </label>

                <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select Priority"
                />
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'>
                  Due Date
                </label>
                <input type="date"
                placeholder='Create App UI'
                value={taskData.dueDate}
                className='form-input'
                onChange={(e) => handleValueChange("dueDate", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask