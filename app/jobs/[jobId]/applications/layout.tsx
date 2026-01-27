import { authOptions } from "@/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
