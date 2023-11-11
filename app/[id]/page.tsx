import Link from "next/link";

type Props = {
    params: {
        id: string
    }
}

const page = async ({ params}: Props) => {
const realP = params.id

const newEmail = realP.replace('%40', '@');
console.log(newEmail);


  return (
    <div className='flex flex-col'>
        <h2 className='text-center m-8 text-bold'>{newEmail}</h2>
        <Link href={`/${realP}/create-post`}>Create Post</Link>
    </div>
  )
}

export default page