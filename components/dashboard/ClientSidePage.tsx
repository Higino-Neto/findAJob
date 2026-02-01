"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Job } from "@/types/job";
import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { SwiperJobs } from "@/components/dashboard/SwiperJobs";
import { ApplicationData } from "@/types/application-data.dto";
import ApplicationsList from "@/components/dashboard/ApplicationsList";
import SelectedApplication from "@/components/dashboard/SelectedApplication";

export default function ClientSidePage({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);

  const { data: applications } = useQuery<JobApplicationItemDTO[]>({
    queryKey: ["applications", selectedJob?.id],
    enabled: !!selectedJob,
    queryFn: async () => {
      const applicationsData = await fetch(
        `/api/jobs/${selectedJob!.id}/applications`,
      );
      const applications = await applicationsData.json();
      return applications as JobApplicationItemDTO[];
    },
  });

  return (
    <div>
      <div>
        <SwiperJobs jobs={jobs} setSelectedJob={setSelectedJob} />
      </div>
      <div className="flex gap-4 px-4 py-4">
        <div className="w-1/2">
          <ApplicationsList
            applications={applications}
            setSelectedApplication={setSelectedApplication}
          />
        </div>

        <div className="w-1/2 sticky top-4 max-h-[calc(100vh-1rem)] overflow-y-auto">
            <SelectedApplication selectedApplication={selectedApplication} />
        </div>
      </div>
    </div>
  );
}
