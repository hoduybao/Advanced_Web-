import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from '../../utils/api'
export const getCurrent=createAsyncThunk('user/current',async (data,{rejectWithValue})=>{
    const response =await UserService.getCurrent('user/current');
    console.log(response)
    if(!response.success) return rejectWithValue(response);
    return response.userData;

})