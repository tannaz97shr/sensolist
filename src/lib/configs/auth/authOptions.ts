import { getRefreshToken, sendOtpToken } from "@/ApiCall/authentication";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshAccessToken = async (token: JWT) => {
  try {
    const refreshTokenResponse = await getRefreshToken();

    if (refreshTokenResponse.statusCode !== 200) throw refreshTokenResponse;

    return {
      ...token,
      accessToken: refreshTokenResponse.accessToken,
      expiresOn: refreshTokenResponse.expiresOn,
    };
  } catch (e) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otpToken: { label: "OTP Token", type: "text" },
        code: { label: "Code", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const response = await sendOtpToken(
          credentials.code,
          credentials.otpToken
        );
        console.log("authorize token", response);
        if (response.statusCode === 200) {
          return {
            ...response,
            id: "id" + Math.random().toString(16).slice(2),
          };
        } else {
          throw Error(response.message || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("callback jwt token", token);
      console.log("callback jwt userr", user);
      if (user) {
        token.accessToken = user.accessToken;
        token.expiresOn = user.expiresOn;
      }
      const expireDate = new Date(token.expiresOn as string);
      if (Date.now() < expireDate.getTime()) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.expiresOn = token.expiresOn as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: { signIn: "/authentication/login" },
};
