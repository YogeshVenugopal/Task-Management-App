export const BASE_URL = "http://localhost:8000";

export const API_PATH={
    AUTH:{
        REGISTER:'/auth/signup',
        LOGIN:'/auth/login',
        GET_PROFILE:'/auth/profile'
    },

    USER:{
        GET_ALL_USERS: '/user',
        GET_USER_BY_ID:(userId)=> `/user/${userId}`,
        CREATE_USER: '/user',
        DELETE_USER:(userId) => `/user/${userId}`,
        UPDATE_USER:(userId) => `/user/${userId}`,
    },

    TASK:{
        GET_DASHBOARD_DATA:'/task/dashboard-data',
        GET_USER_DASBOARD_DATA:'/task/user-dashboard-data',
        GET_TASKS:'/task',
        GET_TASK_BY_ID:(taskId) => `/task/${taskId}`,
        CREATE_TASK:'/task',
        DELETE_TASK:(taskId) => `/task/${taskId}`,
        UPDATE_TASK:(taskId) => `/task/${taskId}`,
        UPDATE_TASK_STATUS:(taskId) => `/task/${taskId}/status`,
        UPDATE_TASK_CHECKLIST:(taskId) => `/task/${taskId}/todo`,
    },

    REPORT:{
        EXPORT_TASK_REPORT:'/report/export-task-report',
        EXPORT_USER_REPORT:'/report/export-user-report',
    },

    IMAGE:{
        UPLOAD_IMAGE:'/auth/upload-image'
    }

}