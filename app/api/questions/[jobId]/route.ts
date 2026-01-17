import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const questionsWithOptions = await prisma.question.findMany({
      where: {
        jobId: params.jobId,
      },
      include: {
        options: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(questionsWithOptions);
  } catch (error) {
    console.error("Error getting questions");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
