import { signIn, signOut } from "next-auth/react";

export const loginGitHub = async () => {
  await signIn("github", { callbackUrl: "/" });
};

export const loginGoogle = async () => {
  await signIn("google", { callbackUrl: "/" });
};

export const logout = async () => {
  await signOut({ callbackUrl: "/auth/signIn" });
};
