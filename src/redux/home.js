import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get, post } from "../api";
import { endpoints } from "../api/configs";
import initial from "./initial";

export const GetVenues = createAsyncThunk("venues/get", async () => {
  try {
    const response = await get(endpoints.home.venues);
    console.log("RESULTTTT==============>>>>>>>>>>> GET VENUEESSS", response);
    return Promise.resolve(response);
  } catch (error) {
    console.log("ERROR IN GET VENUEESSS", error);
    throw new Error(error);
  }
});

export const homeSlice = createSlice({
  name: initial.home.name,
  initialState: initial.home.state,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  //   extraReducers: {
  //     [Login.fulfilled]: (state, action) => {
  //       const {payload} = action;
  //       state.token = payload;
  //     },
  //     [Logout.fulfilled]: state => {
  //       state.token = null;
  //     },
  //   },
});
export const { setUser } = homeSlice.actions;
export default homeSlice.reducer;
