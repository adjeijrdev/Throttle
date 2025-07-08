
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL


export const  loginAPI = async (formData)=>{
    
    return await axios.post(`${BASE_URL}/auth/signin`,formData, {
      headers:{
          "Content-Type":"application/json"
          
      },
       
    withCredentials: true

      
  }
)
.then((data)=>{
     
    
      return data
  }).catch(error=>{
      throw error?.response?.data
  })

}




