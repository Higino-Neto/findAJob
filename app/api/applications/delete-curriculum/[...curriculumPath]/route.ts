import { authOptions } from "@/authConfig";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ curriculumPath: string[] }>;
  },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  try {
    const { curriculumPath } = await params;
    const [userIdPath, jobIdPath] = curriculumPath;
    const filePath = `${userIdPath}/${jobIdPath}`;

    const { data, error } = await supabaseAdmin.storage
      .from("curriculum")
      .remove([filePath]);

    if (error) {
      throw new Error("Error deleting curriculum from Storage Object: ", error);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting curriculum from database: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
