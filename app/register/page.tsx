"use client"
import React, {useState, ChangeEvent, FormEvent} from 'react'
import FormField from '@/components/FormField'
import { registerUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

interface  FormState  {
    username: string;
    password: string;
    password2: string
}

const Page = () => {
    const type = "register"
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [register, setRegister] = useState<FormState>({
        username:  "",
        password:  "",
        password2:  ""
    })

    const router = useRouter()

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setRegister((prevForm) => ({ ...prevForm, [fieldName]: value}))
      }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true)
        try {
                if(register.password !== register.password2){
                    alert("Passwords do not match")
                    return
                }else{
                    const res =  await registerUser(register.username, register.password)
                    if(res.email){
                        console.log(res.email)
                        router.push(`/${res.email}`) 
                    } 
                }
            
        }catch (error){
            console.error
            alert("Failed to register. Try again");
        } finally {
            setSubmitting(false)
        }
       
    }

  return (
    <Modal>
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

                <FormField
                    type='password'
                    placeholder='Enter your password again'
                    title='Confirm Password'
                    state={register.password2}
                    setState={(value) => handleStateChange("password2", value)}

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
    </Modal>
  )
}

export default Page