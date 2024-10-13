import { getAllDashboard, searchDashboard } from "@/ApiCall/dashboards";
import { IDashboard, IWidgetConfig } from "@/types/general";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  dashboards: IDashboard[];
  loading: boolean;
  error?: string | null;

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
  dashboards: [],
  loading: false,
};

export const fetchDashboards = createAsyncThunk(
  "things/fetchAllThings",
  async () => {
    const response = await getAllDashboard();
    return response;
  }
);

export const searchDashboards = createAsyncThunk(
  "dashboard/searchDashboards",
  async ({
    search,
    sort,
    page,
  }: {
    search: string | null;
    sort: string | null;
    page?: number;
  }) => {
    const response = await searchDashboard(search, sort, page || 1);
    return response;
  }
);

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
        (_drft, i) => i !== action.payload.index
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboards.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboards = action.payload.list || [];
      })
      .addCase(fetchDashboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchDashboards.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDashboards.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboards = action.payload.list || [];
      })
      .addCase(searchDashboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
