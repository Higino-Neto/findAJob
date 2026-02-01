"use client";

import SignInButton from "@/components/auth/signin/SignInButton";
import { loginGitHub, loginGoogle } from "@/lib/auth";
import GithubLogo from "@/public/GithubLogo";
import GoogleLogo from "@/public/GoogleLogo";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg mx-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to the FindAJob
          </h2>
          <p className="text-gray-600">
            Sign In to post jobs or apply for opportunities
          </p>
        </div>

        <SignInButton
          providerFunction={loginGitHub}
          providerLogo={<GithubLogo />}
          providerName="GitHub"
        />
        <SignInButton
          providerFunction={loginGoogle}
          providerLogo={<GoogleLogo />}
          providerName="GitHub"
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Privace Policy
          </a>
        </div>
      </div>
    </div>
  );
}
