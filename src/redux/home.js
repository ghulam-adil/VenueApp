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
  extraReducers: (builder) => {
    builder.addCase(GetVenues.fulfilled, (state, action) => {
      state.venues = action.payload.results;
    });
  },
});
export default homeSlice.reducer;
