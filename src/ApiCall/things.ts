import { authOptions } from "@/lib/configs/auth/authOptions";
import {
  IHomeThingsResponse,
  IThingResponse,
  IThingSensor,
  IThingSensorsResponse,
  IThingsResponse,
} from "@/types/general";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const getAllThings = async (): Promise<IThingsResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/things/all/All",
        { headers },
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
      message: "Fetch things failed",
    };
  }
};

export const getAllThingsServerSide = async (): Promise<IThingsResponse> => {
  try {
    const serverSession = await getServerSession(authOptions);

    if (serverSession?.accessToken) {
      const headers = {
        Authorization: `Bearer ${serverSession?.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/things/all/All",
        { headers },
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
      message: "Fetch things failed",
    };
  }
};

export const getThing = async (id: string): Promise<IThingResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        `https://sensolist-backend.vercel.app/api/v3/things/detail/${id}`,
        { headers },
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
      message: "Fetch thins failed",
    };
  }
};

export const getLastTenThings = async (): Promise<IHomeThingsResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/things/last",
        { headers },
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
      message: "Fetch thins failed",
    };
  }
};

export const getThingSensors = async (): Promise<IThingSensorsResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/things/virtual/sensors",
        { headers },
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
      message: "Fetch thins failed",
    };
  }
};

export const createThingViaForm = async (
  name: string,
  description: string,
  imageId: string,
  sensors: IThingSensor[],
): Promise<IThingResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/things/virtual/form",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          sensors,
          imageId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Post applets failed" };
  }
};
