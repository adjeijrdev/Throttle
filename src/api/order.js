
import api from "./axiosConfig";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const orderUplodViaExcelCSVAPI= async (formData) => {
  try {
    const response = await api.post("/order/uploadByCsvExcel", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return response;
  } catch (error) {
   
    if (error?.response?.data?.errors) {
      throw error?.response?.data?.errors[0];
    } else {
      throw (
        error?.response?.data || {
          message: "Sorry an error occured on the server",
        }
      );
    }
  }
};

export const assignOrderAPI = async(formData)=>{
  try{
    const response = await api.patch("/order/assignTo",formData,{
       headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }catch(error){
  if (error?.response?.data?.errors) {
      throw error?.response?.data?.errors[0];
    } else {
      throw (
        error?.response?.data || {
          message: "Sorry an error occured on the server",
        }
      );
    }
  }
}


export const OrderInTransitAPI = async(id)=>{
  try{
    const response = await api.patch(`/order/transit/${id}`,{},{
       headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }catch(error){
  if (error?.response?.data?.errors) {
      throw error?.response?.data?.errors[0];
    } else {
      throw (
        error?.response?.data || {
          message: "Sorry an error occured on the server",
        }
      );
    }
  }
}

