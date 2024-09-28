import { IWidgetConfig, IWidgetPosition } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  draftWidgets: IWidgetConfig[];
  widgetEdit?: {
    index: number;
    dashboardId: string;
    widget: IWidgetConfig;
    draft: boolean;
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
    editDraftWidgetPosition: (
      state,
      action: PayloadAction<{ widget: string; position: IWidgetPosition }>
    ) => {
      state.draftWidgets = state.draftWidgets.map((wdg) =>
        wdg.widget === action.payload.widget
          ? { ...wdg, position: action.payload.position }
          : wdg
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
  editDraftWidgetPosition,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
