import { INotificationAlert } from "@/types/general";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  alerts: INotificationAlert[];
}

const initialState: NotificationState = {
  alerts: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<INotificationAlert>) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
  },
});

export const { createAlert } = notificationSlice.actions;

export default notificationSlice.reducer;
