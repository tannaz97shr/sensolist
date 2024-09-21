import { authOptions } from "@/lib/configs/auth/authOptions";
import {
  IDashboardDetailsResponse,
  IDashboardResponse,
  IFilesResponse,
  IResponse,
} from "@/types/general";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const getAllDashboard = async (): Promise<IDashboardResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/dashboard/all",
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
      message: "Fetch dashboards failed",
    };
  }
};

export const searchDashboard = async (
  search: string | null,
  sort: string | null,
  page: number = 1,
): Promise<IDashboardResponse> => {
  const params = new URLSearchParams();
  if (search) {
    params.append("search", search);
  }
  if (sort) {
    params.append("sort", sort);
  }
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        `https://sensolist-backend.vercel.app/api/v3/dashboard/search/${page}?${params.toString()}`,
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
      message: "Fetch dashboards failed",
    };
  }
};

export const getAllDashboardServerSide =
  async (): Promise<IDashboardResponse> => {
    try {
      const serverSession = await getServerSession(authOptions);

      if (serverSession?.accessToken) {
        const headers = {
          Authorization: `Bearer ${serverSession.accessToken}`,
          "Content-type": "application/json",
        };
        const res = await fetch(
          "https://sensolist-backend.vercel.app/api/v3/dashboard/all",
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

export const getDashboardImages = async (): Promise<IFilesResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/files/static/list/Dashboard",
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
      message: "Fetch images failed",
    };
  }
};

export const postDashboardData = async (
  name: string,
  description: string,
  assignedUsers: string[],
  imageId: string,
): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/dashboard",
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
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Post dashboards failed" };
  }
};

export const patchPinDashboard = async (
  id: string,
  pin: boolean,
): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/dashboard/change-pin/${id}`,
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
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Pin dashboards failed" };
  }
};

export const deleteDashboard = async (id: string): Promise<IResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/dashboard/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "DELETE dashboard failed" };
  }
};

export const editDashboardData = async (
  id: string,
  name: string,
  description: string,
  assignedUsers: string[],
  imageId: string,
): Promise<IResponse> => {
  try {
    console.log("api call edit");
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/dashboard/${id}`,
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
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "Edit dashboard failed" };
  }
};

export const getSingleDashboard = async (
  id: string,
): Promise<IDashboardDetailsResponse> => {
  try {
    const session = await getSession();
    const res = await fetch(
      `https://sensolist-backend.vercel.app/api/v3/dashboard/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return { statusCode: 400, message: "DELETE dashboard failed" };
  }
};

export const getPinnedDashboards = async (): Promise<IDashboardResponse> => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-type": "application/json",
      };
      const res = await fetch(
        "https://sensolist-backend.vercel.app/api/v3/dashboard/all/pinned",
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
      message: "Fetch pinned dashboards failed",
    };
  }
};
