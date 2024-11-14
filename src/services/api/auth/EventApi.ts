import axiosInstance from "@/services/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface EventData {
  _id: any;
  name: string;
  date: string | Date;
  description: string;
  venue: string;
}

const createEvent = async (data: EventData) => {
  try {
    const response = await axiosInstance.post(
      "/api/superadmin/createEvent",
      data
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while creating event"
    );
  }
};

export const usecreateEvent = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("New Event Created");
      queryclient.invalidateQueries({ queryKey: ["getAllEvent"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

const getAllEvent = async () => {
  try {
    const response = await axiosInstance.get("/api/superadmin/getAllEvent");

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while fetching event"
    );
  }
};

export const useGetAllEvent = () => {
  return useQuery<EventData[]>({
    queryKey: ["getAllEvent"],
    queryFn: getAllEvent,
    retry: 1
  });
};

const getEvent = async () => {
    try {
      const response = await axiosInstance.get("/api/teacher/getEvent");
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response.data.data || "Error Occur while fetching event"
      );
    }
  };
  
  export const useGetEvent = () => {
    return useQuery<EventData[]>({
      queryKey: ["getEvent"],
      queryFn: getEvent,
      retry: 1
    });
  };

const updateEvent = async ({id, data}: {id: string, data: EventData}) => {
  try {
    const response = await axiosInstance.patch(
      "/api/superadmin/updateEvent/" + id,
      data
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.data || "Error Occur while updaing event"
    );
  }
};

export const useUpdateEvent = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      toast.success(" Event Updated");
      queryclient.invalidateQueries({ queryKey: ["getAllEvent"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

const deleteEvent = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      "/api/superadmin/deleteEvent/" + id
    );

    return response;
  } catch (error: any) {
    throw new Error(error.response.data.data || "Error while deleting event");
  }
};

export const useDeleteEvent = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success(" Event Deleted");
      queryclient.invalidateQueries({ queryKey: ["getAllEvent"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
