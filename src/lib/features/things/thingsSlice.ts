import { getAllThings } from "@/ApiCall/things";
import { IThing } from "@/types/general";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ThingsState {
  things: IThing[];
  loading: boolean;
  error?: string | null;
}
const initialState: ThingsState = {
  things: [],
  loading: false,
  error: null,
};

export const fetchThings = createAsyncThunk(
  "things/fetchAllThings",
  async () => {
    const response = await getAllThings();
    return response;
  }
);

export const thingsSlice = createSlice({
  name: "things",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThings.fulfilled, (state, action) => {
        state.loading = false;
        state.things = action.payload.list || [];
      })
      .addCase(fetchThings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default thingsSlice.reducer;
