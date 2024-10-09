import { IWidgetConfig } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  draftWidgets: IWidgetConfig[];
  widgetEdit?: {
    index: number;
    dashboardId: string;
    widget: IWidgetConfig;
    draft: boolean;
    characters: string[];
  } | null;
}

const initialState: DashboardState = {
  draftWidgets: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidgetEdit: (
      state,
      action: PayloadAction<{
        dashboardId: string;
        widget: IWidgetConfig;
        draft: boolean;
        index: number;
        characters: string[];
      }>
    ) => {
      state.widgetEdit = action.payload;
    },
    emptyWidgetEdit: (state) => {
      state.widgetEdit = null;
    },
    addDraftWidget: (
      state,
      action: PayloadAction<{ widget: IWidgetConfig }>
    ) => {
      state.draftWidgets = [...state.draftWidgets, action.payload.widget];
    },
    editDraftWidget: (
      state,
      action: PayloadAction<{ widget: IWidgetConfig; index: number }>
    ) => {
      state.draftWidgets = state.draftWidgets.map((drft, i) =>
        i === action.payload.index ? action.payload.widget : drft
      );
    },
    emptyDraftWidget: (state) => {
      state.draftWidgets = [];
    },
    removeDraftWidget: (state, action: PayloadAction<{ index: number }>) => {
      state.draftWidgets = state.draftWidgets.filter(
        (drft, i) => i !== action.payload.index
      );
    },
  },
});

export const {
  removeDraftWidget,
  emptyDraftWidget,
  addDraftWidget,
  addWidgetEdit,
  emptyWidgetEdit,
  editDraftWidget,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
