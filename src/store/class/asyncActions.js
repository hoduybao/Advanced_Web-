import { createAsyncThunk } from "@reduxjs/toolkit";
import ClassService from '../../utils/api/class'
export const getListClass=createAsyncThunk('class/list',async (data,{rejectWithValue})=>{
    const response =await ClassService.getListClass('class/list-class');
    console.log(response);
    if(!response.success) return rejectWithValue(response);
    return response.classes;

})
    