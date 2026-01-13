import { getServerSession } from "next-auth";
import { authOptions } from "@/authConfig";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.redirect(new URL("/auth/signin", request.url));

  try {
    const data = await request.json();

    const job = await prisma.job.create({
      data: {
        ...data.job,
        postedById: session.user.id as string,

        questions: {
          create: data.questions.map(
            (q: {
              text: string;
              type: string;
              order: number;
              options?: {
                id: string;
                text: string;
                order: number;
              }[];
            }) => {
              if (q.type === "open")
                return {
                  text: q.text,
                  type: q.type,
                  order: q.order,
                };

              return {
                text: q.text,
                type: q.type,
                order: q.order,
                options: {
                  create: q.options?.map(
                    (option: { id: string; text: string; order: number }) => ({
                      text: option.text,
                      order: option.order,
                    })
                  ),
                },
              };
            }
          ),
        },
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating new Job: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect(new URL("auth/signin", request.url));
  }

  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error getting jobs: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
