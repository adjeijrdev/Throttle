import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  userProfile: {
    fullName: {
      surname: "",
      firstName: "",
      middleName: "",
    },
    gender: "",
    contact: "",
    email: "",
    picture: "",
    _id: "",
    id: "",
  },
  preference: {
    enable2FA: false,
    enableEmailNotification: false,
  },
  auditingAndConfirmation: {
    accountVerificationStatus: "",
    emailVarification: false,
    _id: "",
    lastLogin: "",
    numberOfOtpVerificationTry: 0,
    id: "",
  },
  createdAt: "",
  updatedAt: "",
  role: "",
  fullName: "",
};

export const staffAuthSlice = createSlice({
  name: "staffAuth",
  initialState,
  reducers: {
    addUser: (state, action) => {
        state = action.payload
      
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = staffAuthSlice.actions;

export default staffAuthSlice.reducer;
