import { registerValidationSchema } from "@/lib/schemas/register";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const parsed = registerValidationSchema.safeParse(body);
  const { email, password } = body;
  if (!parsed.success) {
    return NextResponse.json({ message: "Check your form values" });
  }
  try {
    const userExist = await sql`SELECT *  FROM users WHERE email = ${email}`;
    if (userExist)
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
    return NextResponse.json({ message: "successful registration" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
