import {
  ILoginResponse,
  IOtpResponse,
  IRefreshTokenResponse,
} from "@/types/general";

export const getOtpToken = async (
  phoneNumber: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          phonenumber: "+" + phoneNumber,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return {
      statusCode: 400,
      message: "Login failed",
    };
  }
};

export const sendOtpToken = async (
  code: string,
  token: string
): Promise<IOtpResponse> => {
  try {
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/auth/otp",
      {
        method: "POST",
        body: JSON.stringify({
          otp: code,
          token: token,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return {
      statusCode: 400,
      message: "Login failed",
    };
  }
};
export const getRefreshToken = async (): Promise<IRefreshTokenResponse> => {
  try {
    const res = await fetch(
      "https://sensolist-backend.vercel.app/api/v3/auth/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = res.json();
    console.log("get refresh token api", await data);
    return data;
  } catch (e) {
    return {
      statusCode: 400,
      message: "fetch refresh token failed",
    };
  }
};
