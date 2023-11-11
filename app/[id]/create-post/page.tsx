"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { createPost, getPostsByUser } from '@/lib/actions';
import FormField from '@/components/FormField';
import Image from 'next/image';



type FormState = {
    post: string;
    base64str: string;
}

interface Props {
//   username: string;
  post: string;
  base64str: string;
  params: {
    id: string
  }

}



export default function Posts({params, post, base64str}: Props) {
  const router = useRouter();
  const realP = params.id
  const username = realP.replace('%40', '@');

//   const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<FormState>({
       post: post || "",
       base64str:  base64str || ""
  })

//   console.log(form.base64str)

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
        console.log(result)
    };
  };

  const handleCreatePost = async ( e: FormEvent) => {
    e.preventDefault()
    const result = await createPost(username, form.post, form.base64str);
    
    if(result){
        router.push(`/${realP}/posts`)
    }
    // Refresh the page to show the new post
    // router.reload();
  };

//   useEffect(() => {
//     async function fetchPosts() {
//       const response = await getPostsByUser(router.query.email);

//       setPosts(response.data);
//     }

//     fetchPosts();
//   }, []);

  return (
    <div className='m-4 p-6'>
        <h1 className='text-3xl font-bold'> Create Post</h1>
      {/* <form onSubmit={handleCreatePost}> */}
      <form className='my-2' onSubmit={handleCreatePost }>

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
                    className="sm:p-8 object-contain z-20" alt="image"
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
        <button className='my-4 py-4  text-white bg-blue-700 rounded w-full md:w-32'>
            Create Post
        </button>
      </form>

      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.post}</h3>
            <img src={post.base64str} alt="" />
          </li>
        ))}
      </ul> */}
    </div>
  );
}