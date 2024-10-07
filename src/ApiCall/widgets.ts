import {
  _IWidgetData,
  IResponse,
  IWidgetConfig,
  IWidgetData,
  IWidgetEntityTableResponse,
  IWidgetGroupResponse,
} from "@/types/general";
import { getSession } from "next-auth/react";

export const _getWidgetData = async (
  senderId: string,
  characteristics: string[],
  start?: string,
  end?: string
): Promise<_IWidgetData> => {
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

export const getWidgetData = async (
  senderId: string,
  characteristics: string[],
  limit: number,
  page: number,
  start?: string,
  end?: string
): Promise<IWidgetData> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://mqtt.sensolisttech.com/api/mqtt-data/data/last?senderId=${senderId}&${characteristics.map(
        (char) => `characteristics=${char}&`
      )}limit=${limit}&page=${page}`.replace(/,/g, ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400 };
  }
};

export const getTableWidgetData = async (
  senderId: string[],
  characteristics: string[]
): Promise<IWidgetEntityTableResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://mqtt.sensolisttech.com/api/mqtt-data/data/table?${senderId.map(
        (sId) => `sendersId=${sId}&`
      )}${characteristics.map(
        (char, i) =>
          `characteristics=${char}${
            i !== characteristics.length - 1 ? "&" : ""
          }`
      )}`.replace(/,/g, ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return {
      table: [],
    };
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
