"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useLoginSuperAdmin } from "@/services/api/auth/SuperAdminLogin";
import { useRouter } from "next/navigation";
import routes  from "@/config/routes";
import { useUserLogin } from "@/services/api/auth/UserLoginApi";
import { toast } from "sonner";

const Login = () => {
  const router= useRouter();
  const { register, handleSubmit } = useForm();

  const { mutate: loginMutation } = useLoginSuperAdmin();
  const {mutate: userLoginMutation} = useUserLogin();

  const onSubmit = (data: any) => {
    console.log(data);
    loginMutation(data, {
      onSuccess: () => {
        window.location.replace(routes.superAdmin);
      },
      onError: () => {
        userLoginMutation(data, {
          onSuccess: () => {
            console.log("user Logged in");
            window.location.replace(routes.teacher);
          },
          onError: () => {
            toast.error('Failed To Logged In')
          }
        })
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black border hover:bg-white">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="max-md:max-w-[90vw] max-md:rounded-md">
        <DialogHeader>
          <DialogTitle className="text-3xl">Login</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" >
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="m@example.com"
            type="email"
            {...register("email")}
          />

          <Label htmlFor="password">Password</Label>
          <Input type="password" {...register("password")} />
      

        <div className="flex gap-5 *:w-32 mt-4">
          <Button className="bg-black" type="submit">
            Login
          </Button>
          <DialogClose>
            {" "}
            <Button className="bg-red-500 hover:bg-red">Cancel</Button>
          </DialogClose>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
