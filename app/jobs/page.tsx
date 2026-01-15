"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string | null;
  postedAt: Date;
  postedById: string;
};

export default function BrowseJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [showJob, setShowJob] = useState<Job | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      const res = await fetch("/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const jobs = await res.json();
      setJobs(jobs);
    };
    loadJobs();
  }, []);

  const handleShowHeader = (job: Job) => {
    setShowJob(job);
  };

  return (
    <div className="flex h-screen">
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
      </div>
      {showJob && (
        <div className=" w-1/2 flex flex-col border border-gray-300 rounded-lg shadow-lg">
          <div className="flex flex-col h-screen text-start bg-white p-4 rounded-lg">
            <a className="text-2xl">{showJob.title}</a>
            <button
              onClick={() => router.push(`/jobs/application/${showJob.id}`)}
              className="bg-indigo-500 w-40 px-2 py-1 rounded-md shadow-md mt-6 mb-3 text-gray-50"
            >
              Apply to this job
            </button>
            <a className="">{showJob.type}</a>
            <a className="">{showJob.company}</a>
            <a className="">{showJob.location}</a>
            <a className="mt-6">{showJob.description}</a>
            <a className="">{showJob.salary}</a>
          </div>
        </div>
      )}
    </div>
  );
}
