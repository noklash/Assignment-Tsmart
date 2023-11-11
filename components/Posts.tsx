"use client"
import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { createPost, getPostsByUser } from '@/lib/actions';
import FormField from './FormField';
import Image from 'next/image';


type FormState = {
    post: string;
    base64str: string;
}

interface Post {
  id: number;
  username: string;
  post: string;
  base64str: string;

}



export default function Posts({id, username, post, base64str}: Post) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<FormState>({
       post: post || "",
       base64str:  base64str || ""
  })

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value}))
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return ;
    if (!file.type.includes("image")){
        alert("Please upload an image!");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        handleStateChange("base64str", result)
    };
  };

//   const handleCreatePost = async (post: string, base64str: string) => {
//     await createPost(router.query.email, post, base64str);

//     // Refresh the page to show the new post
//     router.reload();
//   };

//   useEffect(() => {
//     async function fetchPosts() {
//       const response = await getPostsByUser(router.query.email);

//       setPosts(response.data);
//     }

//     fetchPosts();
//   }, []);

  return (
    <div>
      {/* <form onSubmit={handleCreatePost}> */}
      <form >

        <div className='flexStart form_image-container'>
            <label htmlFor='postImage' className='flexCenter form_image-label'>
                {!form.base64str && "choose an image"}
            </label>

            <input 
                id="image"
                type='file'
                accept='image/*'
                required
                className='form_image-input'
                onChange={(e) => handleChangeImage(e)}
            />

            { form.base64str && (
                <Image
                    src={form?.base64str}
                    className="sm:p-10 object-contain z-20" alt="image"
                    fill
                    />
            )}

        </div>


        <FormField
            type='text'
            placeholder="Enter a caption"
            title='Caption'
            state={form.post}
            setState={(value) => handleStateChange("post", value)}
        />
        
        <input type="file" name="image" />
        <button type="submit">Create Post</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.post}</h3>
            <img src={post.base64str} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
