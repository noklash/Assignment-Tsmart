"use client"
import React, {useState, ChangeEvent, FormEvent} from 'react'
import FormField from '@/components/FormField'
import { registerUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

interface  FormState  {
    username: string;
    password: string;
}

type Props = {
    username: string;
    password: string;
}

const page = ({username, password}: Props) => {
    const type = "register"
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [register, setRegister] = useState<FormState>({
        username: username || "",
        password: password || "",
    })

    const router = useRouter()

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setRegister((prevForm) => ({ ...prevForm, [fieldName]: value}))
      }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            const res =  await registerUser(register.username, register.password)
            if(res.email){
                console.log(res.email)
                router.push(`/${res.email}`) 
            }
        }catch (error){
            console.error
            alert("Failed to register. Try again");
        } finally {
            setSubmitting(false)
        }
       
    }

  return (
    <div className='mx-4 p-4'>
        <h2 className='font-bold text-3xl my-4 '>Register</h2>
        <form onSubmit={handleFormSubmit}>
            <FormField
                type='text'
                placeholder='johndoe@gmail.com'
                title='Email'
                state={register.username}
                setState={(value) => handleStateChange("username", value)}

            />

            <FormField
                type='password'
                placeholder='Enter a secure password'
                title='Password'
                state={register.password}
                setState={(value) => handleStateChange("password", value)}

            />



        <div className='flexStart w-full'>
            <Button
                title={submitting ? `${type === "register" ? "Registering" : "Editing"}` : `${type === "register" ? "Register" : "Edit"}`}
                type="submit"
                submitting={submitting}
                />
       </div>

        </form>
    </div>
  )
}

export default page