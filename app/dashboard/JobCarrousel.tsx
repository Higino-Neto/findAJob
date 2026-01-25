"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Job } from "@/types/job";
import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { QuestionWithOptions } from "@/types/questionsWithOptions";
import { cn } from "@/lib/utils";

type ApplicationData = {
  id: string;
  username: string | null;
  email: string | null;
  questionsWithAnswers: {
    id: string;
    type: string;
    order: number;
    commandText: string;
    answer?: string;
    options?: {
      id: string;
      text: string;
      order: number;
      questionId: string;
    }[];
    selectedOption?: string;
  }[];
  appliedAt: string;
};

type JobStatus = "pending" | "accepted" | "rejected";

const statusColor: Record<JobStatus, string> = {
  pending: "text-muted-foreground",
  accepted: "text-green-500",
  rejected: "text-red-500",
};

export default function JobCarrousel({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus>("pending");

  const { data: applications } = useQuery<JobApplicationItemDTO[]>({
    queryKey: ["applications", selectedJob?.id],
    enabled: !!selectedJob,
    queryFn: async () => {
      const applicationsData = await fetch(
        `/api/jobs/applications/${selectedJob!.id}`,
      );
      const applications = await applicationsData.json();
      return applications as JobApplicationItemDTO[];
    },
  });

  const handleSelectedApplication = async (
    application: JobApplicationItemDTO,
  ) => {
    // const userRes = await fetch(`/api/users/${application.userId}`);
    // if (!userRes.ok) throw new Error("Error fetching user");
    // const user: User = await userRes.json();

    const questionsRes = await fetch(`/api/questions/${application.jobId}`);
    if (!questionsRes.ok) throw new Error("Error getting questions");
    const questions: QuestionWithOptions[] = await questionsRes.json();

    const answers = application.answers;

    const questionsWithAnswers = [];

    console.log(questions);

    for (let question of questions) {
      console.log(question);
      console.log(questionsWithAnswers);
      if (question.type === "open") {
        const answer = answers.find(
          (answer) => answer.questionId === question.id,
        );
        questionsWithAnswers.push({
          id: question.id,
          type: question.type,
          order: question.order,
          commandText: question.text,
          answer: answer?.textAnswer ?? "...",
        });
      } else if (question.type === "multiple") {
        const answer = answers.find(
          (answer) => answer.questionId === question.id,
        );
        questionsWithAnswers.push({
          id: question.id,
          type: question.type,
          order: question.order,
          commandText: question.text,
          options: question.options ?? [],
          selectedOption: answer?.optionId ?? "...",
        });
      }
    }

    const applicationData = {
      id: application.id,
      username: application.user.name,
      email: application.user.email,
      questionsWithAnswers: questionsWithAnswers,
      appliedAt: application.appliedAt,
    };

    function normalizeJobStatus(value: string): JobStatus {
      const v = value.toLowerCase();
      if (v === "pending" || v === "accepted" || v === "rejected") {
        return v;
      }

      return "pending";
    }

    setJobStatus(normalizeJobStatus(application.status));
    setSelectedApplication(applicationData);
  };

  const handleStatusChange = (value: string) => {
    setJobStatus(value as JobStatus);
  }
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
          <h2>Browse for Applications</h2>
          {applications?.map((app) => {
            return (
              <div key={app.id}>
                <button
                  onClick={() => handleSelectedApplication(app)}
                  className="transition-all shadow-lg duration-500 focus:ring-2 w-full border border-gray-300 text-start bg-white p-4 rounded-lg hover:cursor-pointer"
                >
                  <p>{app.user.name}</p>
                  <p>{app.user.email}</p>
                  <p>{app.status}</p>
                  <p>{app.appliedAt}</p>
                </button>
              </div>
            );
          })}
        </div>
        {selectedApplication && (
          <div className=" w-1/2 flex flex-col border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col h-screen text-start bg-white p-4 rounded-lg">
              <a className="text-2xl">{selectedApplication.username}</a>
              <a className="">{selectedApplication.email}</a>
              <a className="">
                {selectedApplication.questionsWithAnswers.map(
                  (questionWithAnswer) => {
                    if (questionWithAnswer.type === "open") {
                      return (
                        <div key={questionWithAnswer.id} className="m-1">
                          <p className="text-xl">
                            {questionWithAnswer.commandText}
                          </p>
                          <p>{questionWithAnswer.answer}</p>
                        </div>
                      );
                    } else if (questionWithAnswer.type === "multiple") {
                      return (
                        <div key={questionWithAnswer.id} className="m-1">
                          <p className="text-xl">
                            {questionWithAnswer.commandText}
                          </p>
                          <div>
                            {questionWithAnswer.options?.map((option) => (
                              <p
                                key={option.id}
                                className={
                                  questionWithAnswer.selectedOption ===
                                  option.id
                                    ? `text-blue-500`
                                    : ""
                                }
                              >
                                {option.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  },
                )}
              </a>
              <a className="mt-6">{selectedApplication.appliedAt}</a>
              <div className="mt-4">
                <Select value={jobStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger
                    className={cn(
                      "w-45",
                      statusColor[jobStatus] ?? "text-muted-foreground",
                    )}
                  >
                    <SelectValue placeholder="(default) PENDING" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" >PENDING</SelectItem>
                    <SelectItem value="accepted" className="text-green-500">
                      ACCEPTED
                    </SelectItem>
                    <SelectItem value="rejected" className="text-red-500">
                      REJECTED
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
