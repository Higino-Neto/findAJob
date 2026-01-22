import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import JobCarrousel from "./JobCarrousel";

type Job = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string | null;
  postedAt: Date;
  postedById: string;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  const jobs = await prisma.job.findMany({
    where: {
      postedById: session.user.id,
    },
  });
  return (
    <div>
      <div>
        <JobCarrousel jobs={jobs} />
      </div>
    </div>
  );
}
