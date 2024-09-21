import { getSingleApplet } from "@/ApiCall/applets";
import { IChainConnection, INodeConfig, INodeFields } from "@/types/general";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppletState {
  appletName?: string;
  nodes: INodeConfig[];
  connections: IChainConnection[];
  editNode?: { data: INodeConfig; fields: INodeFields[] };
  loading: boolean;
  error?: string | null;
}

const initialState: AppletState = {
  nodes: [],
  connections: [],
  loading: false,
};

export const fetchApplet = createAsyncThunk(
  "things/fetchAllThings",
  async (id: string) => {
    const response = await getSingleApplet(id);
    return response;
  }
);

export const appletSlice = createSlice({
  name: "applet",
  initialState,
  reducers: {
    addNode: (
      state,
      action: PayloadAction<{
        node: INodeConfig;
      }>
    ) => {
      state.nodes = [...state.nodes, action.payload.node];
    },
    addConnection: (
      state,
      action: PayloadAction<{
        connection: IChainConnection;
      }>
    ) => {
      state.connections = [...state.connections, action.payload.connection];
    },
    onDeleteNode: (state, action: PayloadAction<{ nodeId: string }>) => {
      state.nodes = state.nodes.filter(
        (nd) => nd.nodeIndex !== Number(action.payload.nodeId)
      );
      state.connections = state.connections.filter(
        (connection) =>
          connection.destinationIndex !== Number(action.payload.nodeId) ||
          connection.sourceIndex !== Number(action.payload.nodeId)
      );
    },
    editNode: (
      state,
      action: PayloadAction<{ nodeIndex: number; data: INodeConfig }>
    ) => {
      // state.nodes = [];
      state.nodes = state.nodes.map((nd) =>
        nd.nodeIndex !== action.payload.nodeIndex ? nd : action.payload.data
      );
    },
    addEditNode: (
      state,
      action: PayloadAction<{ nodeData: INodeConfig; fields: INodeFields[] }>
    ) => {
      state.editNode = {
        data: action.payload.nodeData,
        fields: action.payload.fields,
      };
    },
    removeEditNode: (state) => {
      delete state.editNode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplet.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = action.payload.applet?.chain.nodesConfig || [];
        state.connections = action.payload.applet?.chain.connections || [];
        state.appletName = action.payload.applet?.name || "";
      })
      .addCase(fetchApplet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {
  addNode,
  addConnection,
  onDeleteNode,
  addEditNode,
  removeEditNode,
  editNode,
} = appletSlice.actions;
export default appletSlice.reducer;
