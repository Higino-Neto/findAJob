import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();
    const { id } = await params;

    const update = await prisma.application.update({
      where: { id },
      data,
    });

    return NextResponse.json(update);
  } catch (error) {
    console.error("Error updating field in application", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.redirect(new URL("auth/signin", request.url));
//   }

//   try {
//     const { id } = await params;

//     const deletedApplication = await prisma.application.delete({
//       where: { id },
//     });

//     return NextResponse.json(deletedApplication);
//   } catch (error) {
//     console.error("Error deleting application: ", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
