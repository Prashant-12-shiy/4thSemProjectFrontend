import axiosInstance from "@/services/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import cookies from "js-cookie";

interface loginData {
  email: String;
  password: String;
}

const userLogin = async (data: loginData) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useUserLogin = () => {
  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      cookies.set("token", data.token);
      cookies.set("role", data.data.role);
    },
    onError: (error) => {
      // toast.error(error.message);
    },
  });

  return mutation;
};
