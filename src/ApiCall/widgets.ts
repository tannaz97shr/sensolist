import {
  IResponse,
  IWidgetConfig,
  IWidgetData,
  IWidgetGroupResponse,
} from "@/types/general";
import { getSession } from "next-auth/react";

export const getWidgetData = async (
  senderId: string,
  characteristics: string[],
  start?: string,
  end?: string
): Promise<IWidgetData> => {
  try {
    const session = await getSession();
    const res = await fetch("https://sensolisttech.com/api/data", {
      method: "POST",
      body: JSON.stringify({
        sender: senderId,
        characteristics: characteristics,
        page: 1,
        limit: start ? 20 : 1,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return {};
  }
};

export const getTableWidgetData = async (
  senderId: string[],
  characteristics: string[]
): Promise<IWidgetData> => {
  try {
    const session = await getSession();
    const res = await fetch("https://sensolisttech.com/api/data", {
      method: "POST",
      body: JSON.stringify({
        sender: senderId,
        characteristics: characteristics,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return {};
  }
};

export const getWidgetGroups = async (): Promise<IWidgetGroupResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/widget/groupes",
        { headers }
      );
      const data = await res.json();
      return data;
    } else {
      return {
        statusCode: 400,
        message: "Not Authenticated",
      };
    }
  } catch (e) {
    return {
      statusCode: 400,
      message: "Fetch widget groups failed",
    };
  }
};

export const storeWidgetsConfig = async (
  dashboardId: string,
  widgetsConfig: IWidgetConfig[]
): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/widget/config/store",
      {
        method: "POST",
        body: JSON.stringify({
          dashboardId: dashboardId,
          widgetsConfig: widgetsConfig.map((wdg) => {
            let temp = { ...wdg };
            delete temp.widgetName;
            return temp;
          }),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "store widget config failed" };
  }
};
