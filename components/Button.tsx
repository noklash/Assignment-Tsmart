import { MouseEventHandler } from "react";

type Props = {
    title: string,
    handleClick?: MouseEventHandler,
    submitting?: boolean | false,
    type?: "button" | "submit",
    bgColor?: string,
    textColor?: string
}

const Button = ({ title, handleClick, submitting, type, bgColor, textColor }: Props) => {
  return (
    <button
        type={type || 'button'}
        disabled={submitting || false}
        className={`flexCenter gap-3 px-4 py-3 my-4
        ${textColor ? textColor : 'text-white'} 
        ${submitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default Button