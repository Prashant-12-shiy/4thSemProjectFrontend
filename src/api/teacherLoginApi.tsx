import { useMutation } from '@tanstack/react-query';
import axios from 'axios'

const data: any = {
    email: "prash@gmail.com",
    password: "pasword"
}

const loginSuperAdmin = async () => {
    const response = await axios.post( "http://localhost:5000/api/auth/loginSuperAdmin", data);

    console.log(response);
    
    return response.data;
}

export const useLoginSuperAdmin = () => {
    const mutation =  useMutation({
        mutationFn: loginSuperAdmin,
    });

    return mutation
}