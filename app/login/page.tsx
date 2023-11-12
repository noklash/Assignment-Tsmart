"use client"
import React, {useState, ChangeEvent, FormEvent} from 'react'
import FormField from '@/components/FormField'
import { loginUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
interface  FormState  {
    username: string;
    password: string;
    
}



const Login = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false);
    const type = "login"
    const [login, setLogin] = useState<FormState>({
        username:  "",
        password:  "",
        
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setLogin((prevForm) => ({ ...prevForm, [fieldName]: value}))
      }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const res = await loginUser(login.username, login.password)
            if(res?.email){
                console.log(res.email)
                router.push(`/${res.email}`) 
            }
        }catch (error){
            console.error
            alert("Failed to login. Try again");
        } finally {
            setSubmitting(false)
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



<div className='flexStart w-full'>
            <Button
                title={submitting ? `${type === "login" ? "Logging in" : "Editing"}` : `${type === "login" ? "Login" : "Edit"}`}
                type="submit"
                submitting={submitting}
                />
       </div>

        </form>
    </div>
  )
}

export default Login