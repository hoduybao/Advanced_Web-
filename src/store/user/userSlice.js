import {createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions"
export const userSlice= createSlice ({

    name: "user",
    initialState: {
        isLoggin: false,
        current: null,
        token:null,
        isLoading: false,
        mes:""
    },

    reducers:{
        login: (state,action)=>{
            state.isLoggin=action.payload.isLoggin;
            state.token=action.payload.token;
        },
        logout: (state,action)=>{
            state.isLoggin=false;
            state.token=null
        },
        clearMessage: (state)=>{
            state.mes="";

        }


    },
    extraReducers: (builder)=>{
        builder.addCase(actions.getCurrent.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(actions.getCurrent.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.current=action.payload;
            state.isLoggin=true;
        });

        builder.addCase(actions.getCurrent.rejected, (state,action)=>{
            state.isLoading=false;
            state.current=null;
            state.isLoggin=false;
            state.token=null;
            state.mes="The login session has expired. Please log in again to continue!"
        })
        builder.addCase(actions.updateUser.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(actions.updateUser.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.current=action.payload;
            state.isLoggin=true;
        });

        builder.addCase(actions.updateUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.isLoggin=true;

        })
    }
   
})
export const {login,logout,clearMessage} =userSlice.actions

export default userSlice.reducer;

 