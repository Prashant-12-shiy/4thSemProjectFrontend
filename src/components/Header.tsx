import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Login from './Login'
import Signin from './Signin'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex justify-around items-center mt-2 translate-y-5 border rounded-[50px] max-w-[80vw] max-md:max-w-[95vw] m-auto py-2 max-md:py-1 border-black sticky top-0 bg-white transition-all duration-300 '>
        <div className='cursor-pointer'>
            <Image src="./next.svg" alt='logo' height={70} width={70} className='max-md:h-[40px] max-md:w-[40px]'/>
        </div>
        <div>
            <ul className='flex items-center justify-center gap-10 cursor-pointer font-semibold text-sm max-md:text-xs max-md:gap-4'>
                <Link href="/"> <li>Home</li> </Link>
                <Link href="/aboutus"> <li>About</li></Link>
                <li>Contact</li>
            </ul>
        </div>
        <div className='flex gap-5 *:h-8'>
            {/* <Signin/> */}
            <Login/>
        </div>
    </div>
  )
}

export default Header