"use client";
import ApplyButton from "@/components/jobs/ApplyButton";
import { Pagination } from "@/components/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Job = {
  applications: {
    userId: string;
  }[];
} & {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string | null;
  postedAt: string;
  postedById: string;
};

export default function ClientBrowseJobs({ page }: { page: number }) {
  const router = useRouter();
  const [showJob, setShowJob] = useState<Job | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["jobs", page],
    queryFn: async () => {
      const res = await fetch(`/api/jobs?page=${page}`);
      return await res.json();
    },

    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return null;
  }

  const totalPages = data ? Math.ceil(data.totalJobs / data.take) : 1;
  const jobs = data?.jobs ?? [];

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleShowHeader = (job: Job) => {
    setShowJob(job);
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex text-start flex-col gap-4 p-4 m-3 rounded-lg">
        <h2>Browse for Jobs</h2>
        {jobs.map((job: Job) => {
          return (
            <div key={job.id}>
              <button
                onClick={() => handleShowHeader(job)}
                className="transition-all shadow-lg duration-500 focus:ring-2 w-full border border-gray-300 text-start bg-white p-4 rounded-lg hover:cursor-pointer"
              >
                <p>{job.title}</p>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.salary}</p>
              </button>
            </div>
          );
        })}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      {showJob && (
        <div className=" w-1/2 sticky top-4 max-h-[calc(100vh-1rem)] overflow-y-auto flex flex-col ">
          <div className="flex flex-col text-start bg-white p-4 rounded-md border shadow-lg">
            <a className="text-2xl">{showJob.title}</a>
            <ApplyButton
              jobId={showJob.id}
              hasApplied={showJob.applications.length > 0}
            />
            <div className="flex flex-col gap-2">
              <a className="text-xl">Type: </a>
              <a className="">{showJob.type}</a>
              <a className="text-xl">Company: </a>
              <a className="">{showJob.company}</a>
              <a className="text-xl">Location: </a>
              <a className="">{showJob.location}</a>
              <a className="text-xl">Description: </a>
              <a className="">{showJob.description}</a>
              <a className="text-xl">Salary: </a>
              <a className="">{showJob.salary}</a>
              <a className="text-xl">Posted at: </a>
              <a className="">{showJob.postedAt}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
