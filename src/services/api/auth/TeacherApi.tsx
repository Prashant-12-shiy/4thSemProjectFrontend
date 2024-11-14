// "use client"
import axiosInstance from "@/services/axiosInstance"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface TeacherLoginData {
    name: string,
    email: string,
    password: string,
    role: string,
    course: string,
    classInCharge: string
}

const createTeacher = async (data: TeacherLoginData) => {
    try {
        const response = await axiosInstance.post("/api/superadmin/createTeacher", data);

        return response.data;
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
}

export const useCreateTeacher = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTeacher,
        onSuccess: (data) => {
            toast.success(data.message);
            queryclient.invalidateQueries({queryKey: ["getAllTeacher"]})
        },
        onError: (error) => {
            console.log(error);
            
            toast.success(error.message)
        }
    })

    return mutation
}

interface Course {
    _id: string;
    name: string;
    code: string;
  }
  
  interface ClassInCharge {
    _id: string;
    name: string;
  }
  
  export interface Teacher {
    map(arg0: (teacher: Teacher, index: number) => import("react").JSX.Element): import("react").ReactNode;
    length: number;
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    course: Course;
    classInCharge: ClassInCharge;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
const getAllTeacher = async () => {
    try {
        const response = await axiosInstance.get("/api/superadmin/getAllTeacher");

        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const useGetAllTeacher = () => {
    return useQuery<Teacher[]>({
        queryKey: ["getAllTeacher"],
        queryFn: getAllTeacher
    })
}

export interface UpdateTeacher {
    name: string;
    email: string;
    password: string;
    role: string;
    course: string;
    classInCharge: string;
  }
  

const updateTeacher = async ({ id, data }: { id: string, data: UpdateTeacher })  => {
    try {
        console.log(data);
        
        const response = await axiosInstance.post(`/api/superadmin/updateTeacher/${id}`, data);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'An error Occured'); 
    }
}

export const useUpdateTeacher = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateTeacher,
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey: ["getAllTeacher"]});
            toast.success("Teacher Updated")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return mutation
}