import { configureStore } from '@reduxjs/toolkit'
import staffAuthReducer from "./authentication/staffAuthSlice"



export const store = configureStore({
  reducer: {
    staffAuth:staffAuthReducer
  },
})

