import React from 'react'

type Props = {
    type?: string;
    title: string;
    state: string | number;
    placeholder: string;
    setState: (value: string) => void
}

const FormField = ({type, title, state, placeholder, setState}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4 text-black mt-3">
        <label className="w-full text-gray-100 ">{title}</label>
            <input
                type={type || "text"}
                placeholder={placeholder}
                required
                value={state}
                className="form_field-input"
                onChange={(e) => setState(e.target.value)}
            />
        
    </div>
  )
}

export default FormField