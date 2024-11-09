import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { useLoginSuperAdmin } from '@/api/teacherLoginApi'

const Login = () => {

  const {mutate: loginMutation} = useLoginSuperAdmin();

  const onSubmit = () => {
    loginMutation();
  }

  return (
    <Dialog>
    <DialogTrigger  asChild>
      <Button className="bg-white text-black border hover:bg-white">
        Login
      </Button>
    </DialogTrigger>

    <DialogContent >
        <DialogHeader>
            <DialogTitle className='text-3xl'>Login</DialogTitle>
        </DialogHeader>
        <Separator/>
        <Label htmlFor='email'>Email</Label>
        <Input placeholder='m@example.com' type='email' name='email'/>

        <Label htmlFor='password'>Password</Label>
        <Input type='password' name='password'/>

    <div className='flex gap-5 *:w-32'>
        <Button className='bg-black' onClick={onSubmit}>Login</Button>
        <Button className='bg-red-500 hover:bg-red'>Cancel</Button>
    </div>
    </DialogContent>
    
  </Dialog>
  )
}

export default Login