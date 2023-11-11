import React from 'react'
import Image from 'next/image'

const Navbar: any = () => {
  return (
    <nav className='flex py-4 mx-6'>
        <div className='mr-auto'>
            <Image
                src="/give2.svg"
                width={60}
                height={60}
                alt='logo'
                className=''
            />
        </div>
        <div>
            <Image
                src="/userImage.png"
                width={60}
                height={60}
                alt='user image'
                className='rounded-full'
            />
        </div>
    </nav>
  )
}

export default Navbar