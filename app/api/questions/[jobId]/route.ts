import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  const { jobId } = await params;

  try {
    const questionsWithOptions = await prisma.question.findMany({
      where: {
        jobId: jobId,
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
    console.error("Error getting questions: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
