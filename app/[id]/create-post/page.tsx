"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { createPost, getPostsByUser } from '@/lib/actions';
import FormField from '@/components/FormField';
import Image from 'next/image';
import Button from '@/components/Button';




type FormState = {
    post: string;
    base64str: string;
}

interface Props {
  params: { id: string };
}





const  Page = ({params}: Props)  => {
  const router = useRouter();
  const realP = params.id
  console.log(realP)
  const type = "create"
  const username = realP.replace('%40', '@');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
       post:  "",
       base64str:  ""
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
        console.log(result)
    };
  };

  const handleCreatePost = async ( e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
        const result = await createPost(username, form.post, form.base64str);
        if(result){
          
            router.push(`/${realP}`)
        }
    } catch (error){
        console.error
        alert("Failed to create post. Try again");
    } finally {
        setSubmitting(false)
    }
    
  };

  return (
    <div className='m-4 p-6'>
      <h1 className='text-3xl font-bold'> Create Post</h1>
  
      <form className='my-2' onSubmit={handleCreatePost }>

        <div className='flexStart form_image-container py-4'>
            <label htmlFor='postImage' className='flexCenter form_image-label'>
                {!form.base64str && "choose an image"}
            </label>

            <input 
                id="image"
                type='file'
                accept='image/*'
                required
                className='form_image-input '
                onChange={(e) => handleChangeImage(e)}
            />

            { form.base64str && (
                <Image
                    src={form?.base64str}
                    className="sm:p-8 object-contain z-20 py-6" alt="image"
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
       <div className='flexStart w-full'>
            <Button
                title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                type="submit"
                submitting={submitting}
                />
       </div>
      </form>

    </div>
  );
}


export default Page;