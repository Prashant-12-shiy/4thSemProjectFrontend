import axiosInstance from "@/services/axiosInstance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { toast } from "sonner";

const getAllStudent =async () => {
    try {
        const response = await axiosInstance.get("/api/superadmin/getAllStudent");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.data || "Error while Geting Students")
    }
}

export const useGetAllStudents = () => {
    return useQuery({
        queryKey: ["getAllStudents"],
        queryFn: getAllStudent
    })
}

const getStudentById = async (id: string) => {
    try {
        const response = await axiosInstance.get("/api/superadmin/getStudent/" + id);

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.data || "Error while Geting Students")
    }
}

export const useGetStudentById = (id: string) => {
    return useQuery({
      queryKey: ["getStudent"], // Include the ID as part of the key to ensure unique queries per ID
      queryFn: () => getStudentById(id), // Pass a function that calls getStudentById when triggered
    });
  };

  export interface StudentData {
    name: string;
    email: string;
    password: string;
    role: string;
    className: string;
    profilePicture: string;
    rollNumber: string;
    guardianName: string;
    guardianContact: string;
  }

  const createStudent = async (data: StudentData) => {
    try {
        const response = await axiosInstance.post("/api/superadmin/createStudent", data);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.data || "Error while Creating Students")
    }
  }

  export const useCreateStudent = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createStudent, 
        onSuccess: () => {
            toast.success("New Student Created");
            queryclient.invalidateQueries({queryKey: ["getAllStudents"]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return mutation
  }