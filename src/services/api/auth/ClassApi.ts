import axiosInstance from "@/services/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createClass = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/superadmin/createClass", data);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data.data || "Error Occured ");
  }
};

export const useCreateClass = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      toast.success("New Class Added");
      queryclient.invalidateQueries({ queryKey: ["getAllClass"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return mutation;
};

interface ClassItem {
    _id: string;
    name: string;
    teacherInCharge?: {
        name: string;
    } | null;
}

const getAllClass = async () => {
  try {
    const response = await axiosInstance.get("/api/superadmin/getAllClass");

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occured While Fetching Class data"
    );
  }
};

export const useGetAllClass = () => {
  return useQuery<ClassItem[]>({
    queryKey: ["getAllClass"],
    queryFn: getAllClass,
  });
};

const deleteClass = async (id: string) => {
    try {
        const response = await axiosInstance.delete("/api/superadmin/deleteClass/" + id);

        return response.data
    } catch (error:any) {
        throw new Error(
            error.response.data.data || "Error Occured While Deleting Class data"
          );
    }
}

export const useDeleteClass = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteClass,
        onSuccess: () => {
            toast.success("Class deleted");
            queryclient.invalidateQueries({queryKey: ["getAllClass"]})
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return mutation
}