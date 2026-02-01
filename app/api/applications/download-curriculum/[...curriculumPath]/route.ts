import { authOptions } from "@/authConfig";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ curriculumPath: string[] }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  try {
    const { curriculumPath } = await params;
    const [userIdPath, jobIdPath] = curriculumPath;

    const { data, error } = await supabaseAdmin.storage
      .from("curriculum")
      .download(`${userIdPath}/${jobIdPath}`);
    if (error) {
      throw new Error("Error fetching from Object Storage: ", error);
    }
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error getting curriculum from Object Storage");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
