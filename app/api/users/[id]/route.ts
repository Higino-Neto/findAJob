import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error getting user from DB: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
