import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Login from './Login'
import Signin from './Signin'

const Header = () => {
  return (
    <div className='flex justify-around items-center mt-2 translate-y-5 border rounded-[50px] max-w-[80vw] m-auto py-2 border-black sticky top-0 bg-white transition-all duration-300 '>
        <div className='cursor-pointer'>
            <Image src="./next.svg" alt='logo' height={70} width={70}/>
        </div>
        <div>
            <ul className='flex items-center justify-center gap-10 cursor-pointer font-semibold text-sm'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='flex gap-5 *:h-8'>
            <Signin/>
            <Login/>
        </div>
    </div>
  )
}

export default Header