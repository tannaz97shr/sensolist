import { configureStore } from "@reduxjs/toolkit";
import appletSlice from "./features/applet/appletSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";
import notificationReducer from "./features/notification/notificatioSlice";
import profileSlice from "./features/profile/profileSlice";
import thingsSlice from "./features/things/thingsSlice";
import { usersApiSlice } from "./features/api/usersSlice";
import { rolesApiSlice } from "./features/api/roleSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      notificationReducer,
      profileSlice,
      appletSlice,
      dashboardSlice,
      thingsSlice,
      [usersApiSlice.reducerPath]: usersApiSlice.reducer,
      [rolesApiSlice.reducerPath]: rolesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        usersApiSlice.middleware,
        rolesApiSlice.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
