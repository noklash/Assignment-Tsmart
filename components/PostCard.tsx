
import Image from 'next/image';
import Link from 'next/link';




 interface Post {
  username: string;
  post: string;
  base64str: string;

}





const PostCard = ({username, post, base64str}: Post) => {
  return (
    <div className='  flex-col rounded-2xl drop-shadow text-black shadow-lg shadow-black card mx-auto'>
      <Link href="#" className='flexCenter group relative w-full flex flex-col'>
          <div className='flex p-2'>
            <Image 
              src="/userImage.png"
              width={45}
              height={45}
              className='rounded-full flexStart'
              alt="profile image"
              />
            <span className='font-bold py-2 px-6'>{username}</span>
          </div>
        <div>
          <p className='px-6'>{post}</p>
        </div>
        <Image 
          src={base64str}
          width={250}
          height={250}
          className='w-full h-full object-cover rounded-3xl p-4'
          alt='post image'
          />

      </Link>
    </div>
  )
}

export default PostCard