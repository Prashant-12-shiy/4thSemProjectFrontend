import axiosInstance from "@/services/axiosInstance"
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllCourse = async () => {
    try {
        const response = await axiosInstance.get("/api/superadmin/getAllCourse");
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.data || "Error Fetching Couse Data")
    }
}

export const useGetAllCourse = () => {
    return useQuery({
        queryKey: ['getAllCourse'],
        queryFn:  getAllCourse
    })
}

interface Course {
    name: string;
    code: string;
    description: string;
    credits: number;
    className: string;
  }
  
  interface CoursesResponse {
    courses: Course[];
  }
  

const createCourse = async (data: Course) => {
    try {
        const response = await axiosInstance.post("/api/superadmin/createCourses", data);
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.data || "Error Creating Course Data")
    }
}

export const useCreateCourse = () => {
    const mutation = useMutation({
        mutationFn: createCourse,

    })

    return mutation;
}