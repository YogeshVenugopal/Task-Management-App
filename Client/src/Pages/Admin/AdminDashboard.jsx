import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth'
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { UserContext } from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATH } from '../../Utils/apiPath';
import moment from 'moment';
import Infocard from '../../Components/Cards/Infocard';
import { addThousandSeparator } from '../../Utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../Components/Tables/TaskListTable';

const AdminDashboard = () => {
  useUserAuth();

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState([]);
  const [piechartData, setPiechartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);


  const getDashboardData = async() => {
    try {
      const response = await axiosInstance.get(API_PATH.TASK.GET_DASHBOARD_DATA);
      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error)
    }
  }

  const onSeeMore = () => {
    navigate("/admin/tasks");
  }
  useEffect(() =>{
    getDashboardData();

    return () => {}
  },[]);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='card my-5'>
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good morning! {user?.name}</h2>
            <p className='text-xs md:text-[14px] text-gray-400 mt-1.5'>
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-col-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <Infocard
          label='Total Tasks'
          value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
          color='bg-blue-500'
          />

           <Infocard
          label='Pending Tasks'
          value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
          color='bg-violet-500'
          />

           <Infocard
          label='In-progress Tasks'
          value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.Inprogress || 0)}
          color='bg-cyan-500'
          />
           <Infocard
          label='Completed Tasks'
          value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
          color='bg-lime-500'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
          <div className='md:col-span-2'>
            <div className=' card'>
              <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                  Recent Task
                </h5>
                <button className='card-btn' onClick={onSeeMore}>
                  See All <LuArrowRight className='text-base'/>
                </button>
              </div>

              <TaskListTable tableData={dashboardData?.recentTasks || []}></TaskListTable>
            </div>
          </div>
        </div>
      </div>  
    </DashboardLayout>
  )
}

export default AdminDashboard;