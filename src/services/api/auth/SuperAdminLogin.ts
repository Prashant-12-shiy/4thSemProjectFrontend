import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookies from "js-cookie";


const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const loginSuperAdmin = async (data: any) => {
  try {
    const response = await axios.post(
      BaseUrl +  "/api/auth/loginSuperAdmin",
      data
    );

    return response.data;
  } catch (error: any) {
    throw new Error("Login Failed");
  }
};


export const useLoginSuperAdmin = () => {
  
    const mutation = useMutation({
      mutationFn: loginSuperAdmin,
      onSuccess: (data) => {
        cookies.set("token", data.token);
        cookies.set("role", data.data.role);
       
      },
      onError: (error) => {
         // handle error or show message
      },
    });
  
    return mutation;
  };