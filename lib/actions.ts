import axios from 'axios';

export type PostForm = {
    post: string,
    base64Url: string
}

const serverUrl = "gggg"


export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({
                path: imagePath,
            }),
        });
        return response.json();
    } catch (err) {
        throw err
    }
}


export async function loginUser(username: string, password: string): Promise<void> {
  const response = await axios.post('https://assignment-api-spxd.onrender.com/api/login', {
    username,
    password,
  });

 console.log(response)
  // Handle the response
  if(response.status === 200){
    
    // push router to home page
  }else{
    // response error
  }
}

// export async function signUp(username: string, password: string): Promise<void> {
//   const response = await axios.post('https://assignment-api-spxd.onrender.com/api/register', {
//     username,
//     password,
//   });
//   console.log(response)
//   // Handle the response
//   if(response.status === 200){
//     // push router to home page
//     console.log("it was registered")
//   }else {
//     // handle post creation error
//   }
// }

export const registerUser = async (username: string, password:string) => {
    try {
      const response = await fetch('https://assignment-api-spxd.onrender.com/api/register', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data; // or handle the response as needed
      } else {
        throw new Error('Registration failed');
      }
    } catch (error:any) {
      console.error('Error during registration:', error.message);
      throw error;
    }
  };

export async function createPost(username: string, post: string, base64str: string): Promise<void> {
    const imageUrl = await uploadImage(base64str)
    const variables = {
        "username": username,
        "post": post,
        "base64str": imageUrl

    }
    
    const response = await axios.post('https://assignment-api-spxd.onrender.com/api/createpost', variables);
  
    // Handle the response
    if(response.status === 200){
        // push router to home page
      }else{
        // response error
      }
  }
  
  export async function getPostsByUser(email: string): Promise<Post[]> {
    const response = await axios.get(`https://assignment-api-spxd.onrender.com/api/posts/${email}`);
  
    // Handle the response
    if(response.status === 200){
        // push router to home page
      }else{
        // response error
      }
  }