import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  menuOpen: boolean;
}

const initialState: ProfileState = {
  menuOpen: true,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<ProfileState>) => {
      state.menuOpen = action.payload.menuOpen;
    },
  },
});

export const { toggleMenu } = profileSlice.actions;

export default profileSlice.reducer;
