import React from 'react'
import Link from 'next/link'
import AnimatedHome from '@/components/Animation'

const Page = ({}) => {
  return (
    <div className='p-6 flex flex-col home'>
          <div className='flex flex-col mt-8 py-6 justify-center mx-auto'>
        
            <AnimatedHome/>
          </div>
            

      <div className='flex m-4 p-6 gap-8 text-white mx-auto '>
        <Link href="/login" className='btnn hover:bg-white hover:text-black text-center pt-1 font-bold'>Sign in</Link>
        <Link href="/register" className='btnn hover:bg-white hover:text-black text-center pt-1 font-bold hover:border-pink-50'>Sign up</Link>
      </div>

    </div>
  )
}

export default Page
