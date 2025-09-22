
import api from "./axiosConfig";
const BASE_URL = import.meta.env.VITE_BASE_URL;



export const orderUploadAPI= async (formData) => {
  try {
    const response = await api.post("/order", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
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


export const OrderCompletedAPI = async(formData)=>{
  try{
    const response = await api.patch(`/order/completed/`,formData,{
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

export const OrderFailedAPI = async(formData)=>{
  try{
    const response = await api.patch(`/order/failed`,formData,{
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

export const OrderRejectedAPI = async(formData)=>{
  try{
    const response = await api.patch(`/order/rejected`,formData,{
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

export const deleteSingleOrderdAPI = async(id)=>{
  try{
    const response = await api.delete(`/order/${id}`,{},{
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




export const payToVendrAPI = async(formData)=>{
  try{
    const response = await api.patch(`/order/payedToVendor`,formData,{
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
