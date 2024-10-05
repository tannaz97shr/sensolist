import { Node } from "@xyflow/react";
import { Layout } from "react-grid-layout";
import { User } from "./users";

export type LoginStepsType = "details" | "verification";

export type ChangePasswordStepsType =
  | "phoneNumber"
  | "verification"
  | "setPassword";

export type ForgetPasswordStepsType = "phoneNumber" | "verification" | "reset";

export interface LoginInputs {
  phoneNumber: string;
  password: string;
}

export interface ResetPasswordInputs {
  confirmPassword: string;
  password: string;
}

export interface INotificationAlert {
  message: string;
  type: "success" | "warning" | "error";
}

export interface _IThings {
  id: string;
  name: string;
  model: string;
  type: string;
  images: string[];
  brand: string;
  actions: string;
  characteristics: string;
  activationDate: string;
  description: string;
}

export interface ICreateDashboardInputs {
  name: string;
  description: string;
  image: string;
}

export interface IProfileMenuItem {
  name: string;
  title: string;
  link: string;
  icon: React.ReactNode;
}

export interface INotification {
  content: string;
  date: string;
  new: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  pin?: boolean;
}

export interface ISelectOption {
  title: string;
  value: string;
}

export interface IPermission {
  name: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export interface IRole {
  name: string;
  description: string;
}

export interface IChartFormData {
  title: string;
  thing: string;
  xAxesLabel: string;
  yAxesLabel: string;
  yAxesMin: number;
  yAxesMax: number;
  yAxesUnit: string;
  description?: string;
}

export interface IChartData extends IChartFormData {
  charactristic: string[];
  senderId: string;
}

export interface IAlarmData {
  title: string;
  thing: string;
  charactristic: string;
}

export interface IGuageData {
  title: string;
  thing: string;
  charactristic: string;
  min: number;
  max: number;
  unit: string;
  description?: string;
}

export interface ICardData {
  title: string;
  thing: string;
  value: string;
  unit: string;
  charactristic: string;
  description?: string;
}

export interface IAirQualityFormData {
  title: string;
  thing: string;
  unit: string;
  description?: string;
}

export interface IAirQualityData extends IAirQualityFormData {
  senderId: string;
  charactristic: string[];
}

export interface IIndoorEnvironmentFormData {
  title: string;
  thing: string;
  description?: string;
}

export interface IIndoorEnvironmentData extends IIndoorEnvironmentFormData {
  charactristic: string[];
  senderId: string;
}

export interface IOutdoorEnvironmentFormData {
  title: string;
  thing: string;
  description?: string;
}

export interface IOutdoorEnvironmentData extends IOutdoorEnvironmentFormData {
  charactristic: string[];
  senderId: string;
}

export interface IWidgetTableData {
  title: string;
  thing: string;
  charactristic: string;
  description?: string;
  columns: { key: string; name: string }[];
}

export interface ICondition {
  condition: string;
  value: string;
  output: string;
}

// nodes

export interface IConditionNodeInputs {
  title?: string;
  description?: string;
  inputs: string[];
  outputs: string[];
  conditions: { value: string; condition: string }[];
}

export type NodeDataType =
  | {
      value?: string | undefined;
      name?: string | undefined;
      icon?: React.ReactNode;
      count?: undefined;
    }
  | { name: string; value: string; count: string };

export interface ITriggerNodeData {
  value: string;
  name: string;
  icon: React.ReactNode;
}

export interface IThingNodeData {
  name: string;
}

export interface IVariableNode {
  nodeId: string;
  name: string;
  value: number;
}

export interface ITestNode {
  appletId: string;
  nodeId: string;
  email: string;
  thing: IThing;
  charactristic: string;
  value: number;
  condition: string;
}

export interface ITriggerNode {
  nodeId: string;
  title: string;
  description?: string;
  charactristic?: string;
  dashboard?: string;
  variable?: string;
  variableValue?: string;
}
export interface IConditionNode extends IConditionNodeInputs {
  nodeId: string;
}

export type TriggerNodeType = Node<{
  nodeId: string;
  value: string;
  name: string;
  icon: React.ReactNode;
}>;

export type ConditionNodeType = Node<ISubNode>;

export type VariableNodeType = Node<{
  value: string;
  name: string;
  count: number;
}>;

export type FlowNodeType = Node<{
  title: string;
  name: string;
  config: INodeFormData;
}>;

export type TestNodeType = Node<{
  name: string;
  appletId: number;
}>;

export interface IEditNode {
  thing?: string;
  nodeId?: string;
  title?: string;
  description?: string;
  charactristic?: string;
  dashboard?: string;
  inputs?: string[];
  outputs?: string[];
  conditions?: { value: string; condition: string }[];
  name?: string;
  value?: number;
  variableValue?: string;
  variable?: string;
  condition?: string;
  firstVariable?: string;
  phone?: string;
}

// Response

export interface IResponse {
  statusCode: number;
  message?: string;
  error?: string;
}

// authentication

export interface ILoginResponse extends IResponse {
  expiresOn?: string;
  otpToken?: string;
}

export interface IOtpResponse extends IResponse {
  accessToken?: string;
  expiresOn?: string;
}

export interface IRefreshTokenResponse extends IResponse {
  accessToken?: string;
  expiresOn?: string;
}

//things

export interface IThing {
  id: string;
  name: string;
  description: string;
  thingType: "Actual" | "Virtual";
  imageURL: string;
  model: string;
  characteristics: string[];
  senderId: string;
}

export interface IThingDetails {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: string;
  actions: string[];
  characteristics: string[];
  senderId: string;
  activition: string;
  description: string;
  images: { imageURL: string; isCover: boolean }[];
  thingType: string;
}

export interface IHomeThing {
  id: string;
  imageURL: string;
  name: string;
}

export interface IHomeThingsResponse extends IResponse {
  list?: IHomeThing[];
}

export interface ICharactristic {
  name: string;
  sender_id: string;
}

export interface IThingsResponse extends IResponse {
  list?: IThing[];
}

export interface IThingResponse extends IResponse {
  thing?: IThingDetails;
}
// dashboards

export interface IDashboard {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  pinned: boolean;
  assignedUsers: User[];
}

export interface IDashboardResponse extends IResponse {
  list?: IDashboard[];
}

export interface IDashboardDetails {
  id: string;
  name: string;
  description: string;
  widgets: IWidgetConfig[];
}

export interface IDashboardDetailsResponse extends IResponse {
  dashboard?: IDashboardDetails;
}

// Rules

export interface IRuleResponse {}

export interface IWidgetPayload {
  payload: number;
}

export interface _IWidgetData {
  [key: string]: { data: IWidgetPayload[] };
}

export interface IWidgetData extends IResponse {
  page?: number;
  pageCount?: number;
  senderId?: string;
  charactersData?: ICharatersData[];
}

export interface ICharatersData {
  character: string;
  data: {
    payload: string;
    receivedTime: string;
  }[];
}

export interface IWidgetEntityTableResponse {
  statusCode?: number;
  table: IWidgetEntityTableData[];
}

export interface IWidgetEntityTableData {
  _id: string;
  senderId: string;
  data: { [key: string]: string | null };
}

export interface _ISubWidget {
  name: string;
  image: string;
  parent?: string;
  chartData?: IChartData;
  tableData?: IWidgetTableData;
  airQualityData?: IAirQualityData;
  indoorEnvironmentData?: IIndoorEnvironmentData;
  outdoorEnvironmentData?: IOutdoorEnvironmentData;
  guageData?: IGuageData;
  cardData?: ICardData;
  alarmData?: IAlarmData;
}

export interface IWidget {
  groupName: string;
  groupDescription: string;
  groupImageURL: string;
  widgets: ISubWidget[];
}
export interface ISubWidget {
  widgetId: string;
  name: string;
  description: string;
  imageURL: string;
  fields: IWidgetFields[];
}

export interface IWidgetFields {
  name: string;
  groupLabel: string;
  type: string;
  enum: { [key: string]: string };
  description?: string;
}

export interface IWidgetGroupResponse extends IResponse {
  list?: IWidget[];
}

export interface IWidgetFormData {
  title: string;
  description: string;
  thing: string;
  characteristics: string[];
  [key: string]: any;
}

export interface IWidgetModalData {
  widgetId: string;
  fields?: IWidgetFields[];
  widgetName: string;
}

export interface IWidgetConfig extends IWidgetFormData {
  widget: string;
  widgetName?: string;
  senderId?: string;
  fields?: IWidgetFields[];
  layout?: Layout;
}

// files

export interface IFile {
  fileId: string;
  url: string;
  mime: string;
}

export interface IFilesResponse extends IResponse {
  files?: IFile[];
}

//applets

export interface ICreateAppletInputs {
  name: string;
  description: string;
  image: string;
}

export interface IApplet {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  pinned: boolean;
  assignedUsers: string[];
}

export interface IAppletResponse extends IResponse {
  list?: IApplet[];
}

export interface INodeGroupResponse extends IResponse {
  list?: INode[];
}

export interface INode {
  groupName: string;
  groupTitle: string;
  nodes: ISubNode[];
}
export type ISubNode = {
  name: string;
  description: string;
  title: string;
  fields: INodeFields[];
};

export interface INodeFields {
  name: string;
  title: string;
  description?: string;
  type?: string;
  enum?: string[];
}

export interface INodeFormData {
  [key: string]: any;
}

export interface INodeConfig {
  config?: INodeFormData;
  name: string;
  nodeIndex: number;
  nodeX: number;
  nodeY: number;
  title: string;
  description: string;
  groupName: string;
}

export interface IStoreNodesBody {
  appletId: string;
  nodesConfig: {
    config: INodeFormData;
    nodeName: string;
    nodeIndex: number;
    centerX: number;
    centerY: number;
  }[];
  connections: {
    sourceIndex: number;
    destinationIndex: number;
  }[];
}

export interface IChainConnection {
  sourceIndex: number;
  destinationIndex: number;
}

export interface IAppletChain {
  nodesConfig: INodeConfig[];
  connections: IChainConnection[];
}

export interface IAppletDetails {
  id: string;
  name: string;
  chain: IAppletChain;
}
export interface IAppletDetailsResponse extends IResponse {
  applet?: IAppletDetails;
}
export interface IThingSensor {
  character: string;
  unit: string;
  active?: boolean;
  dataModel?: [string, string][];
}
export interface IThingSensorsResponse extends IResponse {
  list?: IThingSensor[];
}
