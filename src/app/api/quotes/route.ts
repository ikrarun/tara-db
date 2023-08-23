import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const request = req.headers;
  console.log(request)
  return NextResponse.json({ message: "❤️❤️❤️❤️", success: true });
}
