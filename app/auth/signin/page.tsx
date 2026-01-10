"use client";

import { loginGitHub, loginGoogle } from "@/lib/auth";

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

        <div className="mt-2">
          <button
            onClick={loginGitHub}
            className="hover:cursor-pointer w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61 -.546-1.387-1.333-1.757-1.333-1.757 -1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998 .108-.776.418-1.305.762-1.605 -2.665-.305-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.22 -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23 .96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 3.176 .765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.62-5.48 5.92 .435.375.825 1.11.825 2.24 0 1.62-.015 2.93-.015 3.33 0 .315.21.69.825.57 C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
            <span className="text-base font-medium">
              {" "}
              Continue with GitHub{" "}
            </span>
          </button>
        </div>
        <div className="mt-2">
          <button
            onClick={loginGoogle}
            className="hover:cursor-pointer w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.96-2.18 5.47-4.6 7.18l7.08 5.49C43.86 36.52 46.5 30.77 46.5 24z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.59A14.5 14.5 0 0 1 9.5 24c0-1.6.28-3.15.77-4.59l-7.98-6.19A23.96 23.96 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.98-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.08-5.49c-1.96 1.32-4.47 2.09-8.82 2.09-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span className="text-base font-medium">
              {" "}
              Continue with Google{" "}
            </span>
          </button>
        </div>
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
