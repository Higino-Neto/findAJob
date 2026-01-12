"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={"/"} className="flex items-center">
              <Image
                src="/image.png"
                alt="FindAJob Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Find A Job
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              href={"/jobs"}
            >
              Browse Jobs{" "}
            </Link>

            {session ? (
              <>
                <Link
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  href={"/jobs/post"}
                >
                  Post a Job{" "}
                </Link>

                <Link
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  href={"/dashboard"}
                >
                  Dashboard{" "}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  href={"/auth/signin"}
                >
                  Sign In{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
