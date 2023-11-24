import axios from 'axios';

export type PostForm = {
    post: string,
    base64Url: string
}



// export async function loginUser(username: string, password: string) {
//   const response = await axios.post('https://assignment-api-spxd.onrender.com/api/login', {
//     username,
//     password,
//   });

 
// }

export const loginUser = async (username: string, password:string) => {
  
    const response = await fetch('https://assignment-api-spxd.onrender.com/api/login', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    console.log(response.status)
    return response.status
};



export const registerUser = async (username: string, password:string) => {
    // try {
      const response = await fetch('https://assignment-api-spxd.onrender.com/api/register', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
    //   if (response.ok ) {
    //     const data = await response.json();
    //     const session = {
    //         email: username
    //     }
        
    //     return session; // or handle the response as needed
    //   } else {
    //     throw new Error('Registration failed');
    //   }
    // } catch (error:any) {
    //   console.error('Error during registration:', error.message);
    //   throw error;
    // }
    console.log(response)
    return response
  };

export async function createPost(username: string, post: string, base64str: string) {
    const variables = {
        "username": username,
        "post": post,
        "base64str": base64str

    }
    
    const response = await axios.post('https://assignment-api-spxd.onrender.com/api/createpost', variables);
  
   
    if(response.status === 200){
        return response
      }
  }
  
  export async function getPostsByUser(email: string) {
    const response = await axios.get(`https://assignment-api-spxd.onrender.com/api/posts/${email}`);
  
    
    if(response.status === 200){
        return response
      }
  }