import React from 'react'
import Posts from '@/components/PostCard'
import Link from 'next/link'
import Image from 'next/image'
// import AnimatedText from '@/components/Animation'
import AnimatedHome from '@/components/Animation'

const Page = ({}) => {
  return (
    <div className='p-6 flex flex-col home'>
          <div className='flex flex-col mt-8 py-6 justify-center mx-auto'>
          {/* <Image
                src="/give2.svg"
                width={200}
                height={200}
                alt='logo'
                className=''
            />
            <h2 className='text-3xl font-bold text-center'>Moments</h2> */}
          <AnimatedHome/>
          </div>
            

      <div className='flex m-4 p-6 gap-8 text-white mx-auto text-2xl'>
        <Link href="/login" className='underline'>Sign In</Link>
        <Link href="/register" className='underline'>Sign Up</Link>
      </div>

    </div>
  )
}

export default Page
