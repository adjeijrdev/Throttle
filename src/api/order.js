
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
    console.log(error)
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
