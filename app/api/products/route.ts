import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    message: "successful fetch",
    products: [{ name: "Bag", id: 1, price: "#5000" }],
  });
};
