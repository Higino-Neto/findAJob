import { authOptions } from "@/authConfig";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.redirect(new URL("/auth/signin", request.url));

  try {
    const data = await request.formData();
    const file = data.get("file") as File;
    const jobId = data.get("jobId") as string;
    const userId = session.user.id;
    const filePath = `${userId}/${jobId}.pdf`;

    const bufferFile = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin.storage
      .from("curriculum")
      .upload(filePath, bufferFile, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending curriculum to Storage", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
