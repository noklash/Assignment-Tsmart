"use client"
import React, {useState, ChangeEvent, FormEvent} from 'react'
import FormField from '@/components/FormField'
import { registerUser } from '@/lib/actions';


interface  FormState  {
    username: string;
    password: string;
    // confirmPassword: string;
}

type Props = {
    username: string;
    password: string;
    // confirmPassword: string;
}

const page = ({username, password}: Props) => {
    const [register, setRegister] = useState<FormState>({
        username: username || "",
        password: password || "",
        // confirmPassword: confirmPassword || ""
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setRegister((prevForm) => ({ ...prevForm, [fieldName]: value}))
      }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await registerUser(register.username, register.password)

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



            <button className='text-white bg-red-700 px-5 py-3 my-6 rounded'>
                submit
            </button>

        </form>
    </div>
  )
}

export default page