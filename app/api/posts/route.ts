import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const posts = await prisma?.post.findMany({
    where: { published: false },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return NextResponse.json({ message: "Posts successfully fetched", posts });
};
