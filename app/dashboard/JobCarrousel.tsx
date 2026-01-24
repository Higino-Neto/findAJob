"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Job } from "@/types/job";
import { ApplicationWithAnswers } from "@/types/applicationWithAnswers";
import { User } from "../generated/prisma";
import { QuestionWithOptions } from "@/types/questionsWithOptions";

export default function JobCarrousel({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationWithAnswers | null>(null);

  const { data: applications } = useQuery<ApplicationWithAnswers[]>({
    queryKey: ["applications", selectedJob?.id],
    enabled: !!selectedJob,
    queryFn: async () => {
      const applicationsData = await fetch(
        `/api/jobs/applications/${selectedJob!.id}`,
      );
      const applications = await applicationsData.json();
      return (await applications.json()) as ApplicationWithAnswers[];
    },
  });

  const handleSelectedApplication = async (
    application: ApplicationWithAnswers,
  ) => {
    const userRes = await fetch(`/api/users/${application.userId}`);
    if (!userRes.ok) throw new Error("Error fetching user");
    const user: User = await userRes.json();

    const questionsRes = await fetch(`/api/questions/${application.jobId}`);
    if (!questionsRes.ok) throw new Error("Error getting questions");
    const questions: QuestionWithOptions[] = await questionsRes.json();

    const answers = application.answers;

    const questionsWithAnswers = [];

    for (const question of questions) {
      if (question.type === "OPEN") {
        questionsWithAnswers.push({
          id: question.id,
          order: question.order,
          commandText: question.text,
          answer:
            answers.find((answer) => answer.id === question.id)?.textAnswer ??
            "",
        });
      } else if (question.type === "MULTIPLE") {
        questionsWithAnswers.push({
          id: question.id,
          order: question.order,
          commandText: question.text,
          options: question.options ?? [],
          selectedOption:
            answers.find((answer) => answer.id === question.id)?.optionId ?? "",
        });
      }
    }

    const applicationData = {
      username: user.name,
      email: user.email,
      questionsWithAnswers: questionsWithAnswers,
    };

    setSelectedApplication(application);
  };
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
                onClick={() => setSelectedJob(job)}
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

      <div className="flex min-h-screen mt-12">
        <div className="w-1/2 flex text-start flex-col gap-4 p-4 m-3 rounded-lg">
          <h2>Browse for Jobs</h2>
          {applications?.map((app) => {
            return (
              <div key={app.id}>
                <button
                  onClick={() => handleSelectedApplication(app)}
                  className="transition-all shadow-lg duration-500 focus:ring-2 w-full border border-gray-300 text-start bg-white p-4 rounded-lg hover:cursor-pointer"
                >
                  <p>{app.id}</p>
                  <p>{app.status}</p>
                  <p>{app.userId}</p>
                  <p>{app.appliedAt}</p>
                </button>
              </div>
            );
          })}
        </div>
        {selectedApplication && (
          <div className=" w-1/2 flex flex-col border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col h-screen text-start bg-white p-4 rounded-lg">
              <a className="text-2xl">{selectedApplication.id}</a>
              <a className="">{selectedApplication.userId}</a>
              <a className="">{selectedApplication.jobId}</a>
              <a className="">{selectedApplication.appliedAt}</a>
              <a className="mt-6">{selectedApplication.status}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
