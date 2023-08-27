import { NextResponse } from "next/server";
import quotes from "./quotes.json";

async function get_It() {
  const randomIndex =await Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export async function GET() {
  try {
    return await get_It()
      .then((res) => {
        return res != null
          ? NextResponse.json(res)
          : NextResponse.json({ code: 404, result: false });
      })
      .catch((e) => {
        return NextResponse.json(
          e.code
            ? { code: e.code, result: false }
            : { code: 400, result: false }
        );
      });
  } catch (error) {
    return NextResponse.json({
      message: 900,
      result: false,
    });
  }
}
