import {
  IAppletDetailsResponse,
  IAppletResponse,
  IFilesResponse,
  IResponse,
} from "@/types/general";
import { getSession } from "next-auth/react";

export const postAppletData = async (
  name: string,
  description: string,
  assignedUsers: string[],
  imageId: string
): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/applet",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description,
          assignedUsers: assignedUsers,
          imageId: imageId,
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
    return { statusCode: 400, message: "Post applets failed" };
  }
};

export const getAppletImages = async (): Promise<IFilesResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/files/static/list/Applet",
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
      message: "Fetch images failed",
    };
  }
};

export const getAllApplet = async (): Promise<IAppletResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/applet/all",
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
      message: "Fetch applets failed",
    };
  }
};

export const patchPinApplet = async (
  id: string,
  pin: boolean
): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/applet/change-pin/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          pin: pin,
        }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Pin applet failed" };
  }
};

export const deleteApplet = async (id: string): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/applet/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Delete applet failed" };
  }
};

export const getPinnedApplets = async (): Promise<IAppletResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/applet/all/pinned",
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
      message: "Fetch pinned applets failed",
    };
  }
};

export const editAppletData = async (
  id: string,
  name: string,
  description: string,
  assignedUsers: string[],
  imageId: string
): Promise<IResponse> => {
  try {
    console.log("api call edit");
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/applet/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          description: description,
          assignedUsers: assignedUsers,
          imageId: imageId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Edit applet failed" };
  }
};

export const getSingleApplet = async (
  id: string
): Promise<IAppletDetailsResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/applet/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Get Single Applet failed" };
  }
};
