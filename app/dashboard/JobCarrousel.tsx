"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

export default function JobCarrousel({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["applications", selectedJob],
    queryFn: async () => {
      const applications = await fetch("/api/applications");
      // isso aqui está estranho, refatore quando possível
    },
  });
  const handleShowApplications = (jobId: string) => {};
  return (
    <div>
      <Swiper
        spaceBetween={15}
        slidesPerView={5.5}
        modules={[Navigation]}
        navigation
      >
        {jobs.map((job) => {
          return (
            <SwiperSlide key={job.id}>
              <button
                onClick={() => handleShowApplications(job.id)}
                className="w-full text-start hover:cursor-pointer rounded bg-white shadow p-2"
              >
                <div className="">
                  <h1>{job.title}</h1>
                  <p>{job.company}</p>
                  <p>{job.type}</p>
                  <p>{job.salary}</p>
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
