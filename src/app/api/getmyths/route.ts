import { apiRequestForMyths } from "@/lib/ApiSafety";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const request = req.headers;
  const readers = apiRequestForMyths.parse(request)
  console.log(readers);

  return NextResponse.json({ message: "❤️❤️❤️❤️", success: true });
}
