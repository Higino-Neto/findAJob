"use client";

import { usePathname } from "next/navigation";

export default function Custom404() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl mb-4 mt-2">404</h1>
      <h3 className="font-medium ">
        <a className="text-red-800 font-bold">{pathName}</a> cannot be found.
      </h3>
    </div>
  );
}
