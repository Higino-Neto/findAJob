"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function JobApplication() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [file, setFile] = useState<File | null>(null);

  // This function is only a test (It will be removed after)
  const sendFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("jobId", jobId);

    await fetch("/api/jobs/curriculum", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg h-screen">
        <form className="">
          <div className="flex flex-col items-center">
            <h1 className="text-xl mt-10">Put your curriculum here</h1>
            <label className="text-center text-gray-500 border border-gray-400 p-2 m-2 w-60 h-10 mb-4 rounded-md hover:cursor-pointer">
              <p>Select a file:</p>
              <input
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-10"
                type="file"
                accept="application/pdf"
                hidden
              />
            </label>
            <button
              type="button"
              onClick={() => {
                if (!file) {
                  return;
                }
                return sendFile(file);
              }}
              className="bg-indigo-500 w-30 text-gray-50 rounded-md mt-2 hover:cursor-pointer"
            >
              Send to supabase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
