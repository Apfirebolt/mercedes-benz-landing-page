import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request) {
  try {
    const token = await getToken({ req: request, secret, raw: true });

    if (token) {
      return NextResponse.json({ jwt: token }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Not authenticated or token missing." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error retrieving raw JWT:", error);
    return NextResponse.json(
      { error: "Internal Server Error during token retrieval." },
      { status: 500 }
    );
  }
}
