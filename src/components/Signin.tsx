import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const Signin = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white border hover:bg-black">
          Signin
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">Create an account</DialogTitle>
          <DialogDescription>
            Enter your email below to create your account
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Label htmlFor="name">Name</Label>
        <Input  type="text" name="name" />

        <Label htmlFor="email">Email</Label>
        <Input placeholder="m@example.com" type="email" name="email" />

        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />


          <Button className="bg-black hover:bg-black">Create account</Button>
 
      </DialogContent>
    </Dialog>
  );
};

export default Signin;
