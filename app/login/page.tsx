"use client"
import React, {useState, ChangeEvent, FormEvent} from 'react'
import FormField from '@/components/FormField'
import { loginUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

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


const Login = ({username, password}: Props) => {
    const router = useRouter()
    
    const [login, setLogin] = useState<FormState>({
        username: username || "",
        password: password || "",
        
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setLogin((prevForm) => ({ ...prevForm, [fieldName]: value}))
      }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await loginUser(login.username, login.password)
        if(res.email){
            console.log(res.email)
            router.push(`/${res.email}`) 
        }
    }

  return (
    <div className=' flex flex-col justify-center my-8 p-4 '>
        <h2 className='font-bold text-3xl my-4 '>Login</h2>
        <form onSubmit={handleFormSubmit}>
            <FormField
                type='text'
                placeholder='johndoe@gmail.com'
                title='Email'
                state={login.username}
                setState={(value) => handleStateChange("username", value)}

            />

            <FormField
                type='password'
                placeholder='Enter your password'
                title='Password'
                state={login.password}
                setState={(value) => handleStateChange("password", value)}

            />



            <button className='text-white bg-red-700 px-5 py-3 my-6 rounded'>
                Login
            </button>

        </form>
    </div>
  )
}

export default Login