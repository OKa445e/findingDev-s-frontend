import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    rejectRequests: (state, action) => {
     const remove = state.filter((user) => user._id !== action.payload);
     return remove; 
    },
  },
});

export const { addRequests, rejectRequests } = requestSlice.actions;
export default requestSlice.reducer;
