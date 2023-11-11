import React from 'react'
import Posts from '@/components/PostCard'
import Link from 'next/link'

const page = ({}) => {
  return (
    <div className='p-6 flex flex-col'>

      <h1 className='font-bold text-2xl'>Home</h1>
      <div className='flex m-4 p-6 gap-8'>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>

    </div>
  )
}

export default page
