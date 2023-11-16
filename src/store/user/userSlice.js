import {createSlice } from "@reduxjs/toolkit";
export const userSlice= createSlice ({
    name: "user",
    initialState: {
        isLoggin: false,
        current: null,
        token:null
    },

    reducers:{
        login: (state,action)=>{
            console.log(action.payload)
            state.isLoggin=action.payload.isLoggin;
            state.current=action.payload.userData;
            state.token=action.payload.token;
        }

    },
   
})
export const {login} =userSlice.actions

export default userSlice.reducer;

 