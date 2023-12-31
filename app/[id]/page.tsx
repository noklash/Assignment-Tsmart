import PostCard from "@/components/PostCard";
import Link from "next/link";


type Props = {
    params: {
        id: string
    }
}

const Page = async ({ params}: Props) => {
const realP = params.id

const newEmail = realP.replace('%40', '@');
console.log(newEmail);

function removeSubstring(str: string, substring: string) {
    const index = str.indexOf(substring);
    if (index !== -1) {
      return str.substring(0, index) + str.substring(index + substring.length);
    } else {
      return str;
    }
  }
  
  const emailAddress = newEmail;
  const updatedUsername = removeSubstring(emailAddress, "@gmail.com");

  const moments = [
                    {"username": "username1", "post": "here's caption 1 test", "base64str": "/evening.jpeg"},
                    {"username": "username2", "post": "here's caption 2 test", "base64str": "/homebg.jpg"},
                    {"username": "username3", "post": "here's caption 3 test", "base64str": "/givelogo.png"}
]


  return (
    <div className='flex flex-col m-4'>

        <Link href={`/${realP}/create-post`} className="btn-post hover:bg-black hover:text-white text-center pt-1 font-bold my-6">create post</Link>
        <h3 className="capitalize text-2xl text center">Here&apos;s your moment <span className="font-bold text-2xl">{updatedUsername}</span></h3>

        <section className="md:flex gap-8">
            {
                moments.map((moment, i) => (
                    <div className="my-6 " key={`${moment?.username} + ${1}`}>
                        <PostCard
                            key={`${moment?.username} + ${1}`}
                            username={moment?.username}
                            base64str={moment?.base64str}
                            post={moment?.post}
                        />
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default Page