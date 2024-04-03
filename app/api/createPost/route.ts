import prisma from "@/lib/prisma/prisma";
import { postsValidationSchema } from "@/lib/schemas/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const parsed = postsValidationSchema.safeParse(body);
  const { title, content } = body;
  if (!parsed.success) {
    return NextResponse.json({ message: "Check your form values" });
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          create: { name: "seun" },
        },
      },
    });

    return NextResponse.json({ message: "Post created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 501 });
  }
};
