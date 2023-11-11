"use client"
import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { createPost, getPostsByUser } from '@/lib/actions';
import FormField from './FormField';
import Image from 'next/image';
import Link from 'next/link';


type FormState = {
    post: string;
    base64str: string;
}

 interface Post {
  username: string;
  post: string;
  base64str: string;

}





const PostCard = ({username, post, base64str}: Post) => {
  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card text-black'>
      <Link href="#" className='flexCenter group relative w-full h-full flex flex-col'>
          <div className='flex gap-2'>
            <Image 
              src="/userImage"
              width={24}
              height={24}
              className='rounded-full mr-auto'
              alt="profile image"
              />
            <span className='font-bold'>{username}</span>
          </div>
        <div>
          <p className='w-full'>{post}</p>
        </div>
        <Image 
          src={base64str}
          width={450}
          height={450}
          className='w-full h-full object-cover rounded-2xl'
          alt='post image'
          />

      </Link>
    </div>
  )
}

export default PostCard