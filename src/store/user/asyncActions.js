import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from '../../utils/api/user'
export const getCurrent=createAsyncThunk('user/current',async (data,{rejectWithValue})=>{
    const response =await UserService.getCurrent('user/current');
    if(!response.success) return rejectWithValue(response);
    return response.userData;

})
    
export const updateUser=createAsyncThunk('user/update',async (data,{rejectWithValue})=>{
    const response =await UserService.updateUser('user/update',data);
    if(!response.success) return rejectWithValue(response);
    return response.userData;

})