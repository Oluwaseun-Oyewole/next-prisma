import { signIn } from "@/auth";
import { LoginFormValues, loginValidationSchema } from "@/lib/schemas/register";
import { login_redirect } from "@/routes";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: LoginFormValues = await req.json();
  const validated = loginValidationSchema.safeParse(body);
  const { email, password } = body;
  if (!validated.success) {
    return NextResponse.json({ message: "Fill your fields" }, { status: 409 });
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: login_redirect,
    });
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.log("error from login", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ message: error }, { status: 501 });
        default:
          return NextResponse.json(
            { message: "Oops, something went wrong" },
            { status: 501 }
          );
      }
    }
    throw error;
  }
};
