import { createSlice } from "@reduxjs/toolkit";

const initialState = {
viewAbleTabs: localStorage.getItem("viewAbleTabs")? JSON.parse(localStorage.getItem("viewAbleTabs")): [],
};

export const staffAuthSlice = createSlice({
  name: "staffAuth",
  initialState,
  reducers: {
    setViewAbleTabs: (state, action) => {
        state.viewAbleTabs = action?.payload
      localStorage.setItem("viewAbleTabs",JSON.stringify(state.viewAbleTabs))  
    }
  },
});

// Action creators are generated for each case reducer function
export const { setViewAbleTabs } = staffAuthSlice.actions;

export default staffAuthSlice.reducer;
