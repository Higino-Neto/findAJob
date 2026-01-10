import { PrismaAdapter } from "@auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaClient } from "./app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    })
  ],
  adapter: PrismaAdapter(prisma),
};
