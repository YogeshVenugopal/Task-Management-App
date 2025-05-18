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
import CustomPieChart from '../../Components/Charts/CustomPieChart';
import CustomBarChart from '../../Components/Charts/CustomBarChart';


const COLOR = ['#8D51FF', '#00B8DB', '#7BCE00']
const AdminDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState([]);
  const [piechartData, setPiechartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskpriorityLevels = data?.taskPriorityLevel || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.pending || 0 },
      { status: "In progress", count: taskDistribution?.inProgress || 0 },
      { status: "Completed", count: taskDistribution?.completed || 0 }
    ]

    setPiechartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskpriorityLevels?.low || 0 },
      { priority: "Medium", count: taskpriorityLevels?.medium || 0 },
      { priority: "High", count: taskpriorityLevels?.high || 0 }
    ]

    setBarChartData(priorityLevelData);
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TASK.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error)
    }
  }

  const onSeeMore = () => {
    navigate("/admin/tasks");
  }
  useEffect(() => {
    getDashboardData();

    return () => { }
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='card my-5'>

        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">Good morning! {user?.name}</h2>
          <p className='text-xs md:text-[14px] text-gray-400 mt-1.5'>
            {moment().format("dddd Do MMM YYYY")}
          </p>
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
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>

        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className='font-medium'>
                Task Distribution
              </h5>
            </div>
            <CustomPieChart
              data={piechartData}
              colors={COLOR}
            />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className='font-medium'>
                Task Priority Levels
              </h5>
            </div>
            <CustomBarChart 
              data={barChartData}
            />
          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'>
                Recent Task
              </h5>
              <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []}></TaskListTable>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard;