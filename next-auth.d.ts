import { ROLES } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: ROLES;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: ROLES;
  }
}
