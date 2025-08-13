import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: null, // Keep as null but handle it properly in components
    reducers: {
        addUsers: (state,action) => {
            return action.payload;
        },
        removeUsers: (state,action) => {
            return null;
        },
    },
});

export const {addUsers,removeUsers} = userSlice.actions;

export default userSlice.reducer;
