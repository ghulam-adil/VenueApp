import { createSlice } from "@reduxjs/toolkit";
import initial from "./initial";

export const generalSlice = createSlice({
  name: initial.general.name,
  initialState: initial.general.state,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
// export const useGlobalLoader = () => {
//   const isLoading = useSelector(state => state.general.globalLoadingEnabled);
//   return isLoading;
// };
// export const {toggleGlobalLoader, toggleInlineLoader} = generalReducer.actions;
export const { toggleLoading } = generalSlice.actions;
export default generalSlice.reducer;
