import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async(imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {headers:{"Content-Type": "multipart/form-data"}});   
        return response.data
    } catch (error) {
        console.log(error);
        throw error        
    }
}

export default uploadImage