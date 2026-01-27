import { authOptions } from "@/authConfig";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.formData();

    const file = data.get("file") as File;
    const bufferFile = Buffer.from(await file.arrayBuffer());
    const jobId = data.get("jobId") as string;
    const userId = session.user.id;
    const filePath = `${userId}/${jobId}.pdf`;

    const { data: supabaseData, error } = await supabaseAdmin.storage
      .from("curriculum")
      .upload(filePath, bufferFile, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending file into Storage Object");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
