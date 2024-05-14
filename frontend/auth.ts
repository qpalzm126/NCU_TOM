import Credentials from "next-auth/providers/credentials";
import NextAuth, { type DefaultSession } from "next-auth";
import "next-auth/jwt";
import { UserProfile } from "@/models/users";
import { getToken } from "@/apis/auth/getToken";
import { getUser } from "@/apis/auth/getUser";
import type { NextAuthConfig } from "next-auth";
import { object, string } from "zod";
import { z } from "zod";

const signInSchema = z.object({
  username: string({ required_error: "Email is required" }).min(
    1,
    "Email is required"
  ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const config = {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Credentials are missing.");
        }

        let user = null;

        // Get token
        const { username, password } = await signInSchema.parseAsync(
          credentials
        );
        const { refresh, access } = await getToken(username, password);

        user = await getUser(access);
        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token?.accessToken) return session;
      const userProfile: UserProfile = await getUser(token.accessToken);

      return {
        ...session,
        user: {
          ...session.user,
          ...userProfile,
        },
      };
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    user: UserProfile;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
