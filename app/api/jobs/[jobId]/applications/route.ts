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

  try {
    const { jobId } = await params;

    const applicationsWithAnswers = await prisma.application.findMany({
      where: { jobId },
      include: {
        answers: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(applicationsWithAnswers);
  } catch (error) {
    console.error("Error getting applications by JobId: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
