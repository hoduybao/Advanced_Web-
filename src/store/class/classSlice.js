import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const classSlice = createSlice({
  name: "class",
  initialState: {
    myclass:[],
    isLoading: false,
    mes: "",
  },

  reducers: {
 
    clearMessage: (state) => {
      state.mes = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getListClass.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getListClass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myclass = action.payload;
    });

    builder.addCase(actions.getListClass.rejected, (state, action) => {
      state.isLoading = false;
      state.myclass = null;
    });
  },
});
export const { clearMessage } = classSlice.actions;

export default classSlice.reducer;
