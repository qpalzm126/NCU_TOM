import Credentials from "next-auth/providers/credentials";
import NextAuth, { type DefaultSession } from "next-auth";
import { UserProfile } from "@/models/users";
import { getToken } from "@/apis/auth/getToken";
import { getUser } from "@/apis/auth/getUser";
import { object, string } from "zod";
import type { Provider } from "next-auth/providers";
import { z } from "zod";
declare module "next-auth" {
  interface Session {
    user: UserProfile & DefaultSession["user"];
  }
}

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

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        const token = await getToken(username, password);

        // logic to verify if user exists
        user = await getUser();

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

const providers: Provider[] = [
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
      const { username, password } = await signInSchema.parseAsync(credentials);
      const token = getToken(username, password);

      // logic to verify if user exists
      user = await getUser();

      if (!user) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error("User not found.");
      }

      // return user object with the their profile data
      return user;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
