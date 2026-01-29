import { authOptions } from "@/authConfig";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import JobCarrousel from "./JobCarrousel";
import type {Job} from "@/types/job";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  const jobs: Job[] = await prisma.job.findMany({
    // Eu documentei essa linha para fins de teste (Pois eu estou em outro usuário e preciso ter acesso a todos os jobs)
    // Tire o comentário das linhas abaixo:
    // where: {
    //   postedById: session.user.id,
    // },
  });
  return (
    <div>
      <h1></h1>
      <div>
        <JobCarrousel jobs={jobs} />
      </div>
    </div>
  );
}
