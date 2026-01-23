import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();

    const curriculumPath = `${data.application.userId}/${data.application.jobId}.pdf`;

    await prisma.application.create({
      data: {
        ...data.application,
        curriculumPath: curriculumPath,
        answers: {
          create: data.answers,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending curriculum to Storage: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
