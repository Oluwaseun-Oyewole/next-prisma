import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        const response = await sql`SELECT * FROM users WHERE email=${email}`;

        try {
          const user = response.rows[0];
          console.log("user from db", user);
          if (!user) {
            throw new Error("User not found");
          }
          if (!user?.password) {
            throw new Error("Invalid credentials");
          } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw new Error("Incorrect Password");
            else {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error as string);
        }

        return response.rows[0].email;
      },
    }),
  ],
  pages: {
    // signIn: "/auth/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
