import axiosInstance from "@/services/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface NoticeData {
  _id: any;
  name: string;
  date: string | Date;
  description: string;
}

const createNotice = async (data: NoticeData) => {
  try {
    const response = await axiosInstance.post(
      "/api/superadmin/createNotice",
      data
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while creating Notice"
    );
  }
};

export const useCreateNotice = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      toast.success("New Notice Created");
      queryclient.invalidateQueries({ queryKey: ["getAllNotice"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

const getAllNotice = async () => {
  try {
    const response = await axiosInstance.get("/api/superadmin/getAllNotice");

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while fetching Notice"
    );
  }
};

export const useGetAllNotice = () => {
  return useQuery<NoticeData[]>({
    queryKey: ["getAllNotice"],
    queryFn: getAllNotice,
    retry: 1
  });
};

const getNotice = async () => {
    try {
      const response = await axiosInstance.get("/api/teacher/getNotice");
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response.data.data || "Error Occur while fetching Notice"
      );
    }
  };
  
  export const useGetNotice = () => {
    return useQuery<NoticeData[]>({
      queryKey: ["getNotice"],
      queryFn: getNotice,
      retry: 1
    });
  };

const updateNotice = async ({id, data}: {id: string, data: NoticeData}) => {
  try {
    const response = await axiosInstance.patch(
      "/api/superadmin/updateNotice/" + id,
      data
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while updaing Notice"
    );
  }
};

export const useUpdateNotice = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateNotice,
    onSuccess: () => {
      toast.success(" Notice Updated");
      queryclient.invalidateQueries({ queryKey: ["getAllNotice"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

const deleteNotice = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      "/api/superadmin/deleteNotice/" + id
    );

    return response;
  } catch (error: any) {
    throw new Error(error.response.data.data || "Error while deleting Notice");
  }
};

export const useDeleteNotice = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      toast.success(" Notice Deleted");
      queryclient.invalidateQueries({ queryKey: ["getAllNotice"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
