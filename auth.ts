import prisma from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./lib/query";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, email }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      if (!existingUser?.emailVerified) return false;

      // if (account?.provider === "github" || account?.provider === "google") {
      //   try {
      //     // const existingUser = await await getUserById(user.id!);
      //     // if (!existingUser) {
      //     //   await User.create({
      //     //     name: user?.name,
      //     //     email: user?.email,
      //     //     role: user?.role,
      //     //     emailVerified: new Date(),
      //     //     employmentType: user?.employmentType,
      //     //   });
      //     //   return true;
      //     // }
      //     return true;
      //   } catch (error) {
      //     return false;
      //   }
      // }
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      // console.log("session", { sessionToken: token });
      return session;
    },
    async jwt({ token, user, account }) {
      if (token && user) {
        const existingUser = await getUserById(token?.sub!);
        if (!existingUser) return token;
        token.role = existingUser.role;
      }
      return { ...token, ...user };
    },
  },
  events: {
    async linkAccount({ user }) {
      // for all oauth users
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
});
