"use client"
import { useState, useEffect } from 'react'
import { getPostsByUser } from '@/lib/actions'
import PostCard from '@/components/PostCard'

type Props = {
    params: {
        id: string
    }
    username: string;
    post: string;
    base64str: string;
}

interface Post {
    username: string;
    post: string;
    base64str: string;
  
  }

const Page = ({ params, username, post, base64str }: Props) => {
    const realP = params.id
    const user = realP.replace('%40', '@');

    const [posts, setPosts] = useState([])
    console.log(`posts is ${posts}`)
    useEffect(() => {
      async function fetchPosts() {
        const response = await getPostsByUser(user)

        setPosts(response?.data)
      }

      fetchPosts();
    }, [posts]);

  return (
    <div>
        <h1>Posts</h1>
        {
            posts.length > 0 &&
            posts?.map(({ node }: {node: Post}) => (
                <div className='my-4' key={`${node?.username} + ${1}`}>
                    <PostCard
                        key={`${node?.username} + ${1}`}
                        username={node?.username}
                        base64str={node?.base64str}
                        post={node?.post}
                    />
                </div>
            ))
        }
    </div>
  )
}

export default Page