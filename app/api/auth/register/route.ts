import prisma from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/query";
import {
  RegisterFormValues,
  registerValidationSchema,
} from "@/lib/schemas/register";
import { generateVerificationToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: RegisterFormValues = await req.json();
  const parsed = registerValidationSchema.safeParse(body);
  const { name, email, password } = body;
  if (!parsed.success) {
    return NextResponse.json({ message: "Check your form values" });
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken({ email, name });
    console.log("verification token from signup", verificationToken);

    return NextResponse.json({ message: "Token has been sent to users" });
  } catch (error) {
    console.log("error from reg", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
