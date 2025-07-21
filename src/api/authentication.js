import axios from "axios"
import api from "./axiosConfig"
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
      throw error?.response?.data || {message:"Sorry an error occured on the server"}
  })

}

export const registerVendorAPI = async (formData)=>{   
    return await axios.post(`${BASE_URL}/auth/register/vendor`,formData, {
           
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json'
      },
   withCredentials: true   
  }
)
.then((data)=>{  
      return data
  }).catch(error=>{
    if(error?.response?.data?.errors){
      throw error?.response?.data?.errors[0]
    }else{
      throw error?.response?.data || {message:"Sorry an error occured on the server"}
    }
  })

}



export const createRoleAPI = async(formData)=>{
  return await api.post("/auth/role",formData,{
    headers:{
          "Content-Type":"application/json"       
      }   
  }).then((data)=>{
    return data

  }).catch(error =>{
      throw error?.response?.data
  })
}

export const deleteRoleAPI = async(roleId)=>{
  try {
  
    const response = await api.delete(`/auth/role/${roleId}`);
    return response.data;
  } catch (error) {

    throw error?.response?.data; 
  }
}


export const createStaffAPI = async(formData)=>{
  try{

    const response = await api.post("/auth/staff",formData,{
    headers:{
      "Content-Type":"application/json"
    }
  })
  return response
  }catch(error){
    throw error?.response?.data;
  }
}