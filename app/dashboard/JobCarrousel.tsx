"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { QuestionWithOptions } from "@/types/questionsWithOptions";
import { SweperJobs } from "@/components/sweper";
import { ApplicationData } from "@/types/application-data.dto";
import SelectJobStatus from "@/components/dashboard/SelectJobStatus";
import Curriculum from "@/components/dashboard/Curriculum";

export default function JobCarrousel({ jobs }: { jobs: Job[] }) {
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

  useEffect(() => {
    setSelectedApplication(null);
  }, [applications]);

  const handleSelectedApplication = async (
    application: JobApplicationItemDTO,
  ) => {
    const questionsRes = await fetch(`/api/questions/${application.jobId}`);
    if (!questionsRes.ok) throw new Error("Error getting questions");
    const questions: QuestionWithOptions[] = await questionsRes.json();

    const answers = application.answers;

    const questionsWithAnswers = [];

    for (let question of questions) {
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
      status: application.status,
      curriculumPath: application.curriculumPath,
    };

    setSelectedApplication(applicationData);
  };

  return (
    <div>
      <SweperJobs jobs={jobs} setSelectedJob={setSelectedJob} />

      <div className="flex min-h-screen mt-12">
        <div className="w-1/2 flex text-start flex-col gap-4 p-4 m-3 rounded-lg">
          <h2>Browse for Applications</h2>
          {applications?.map((app) => {
            if (app.status !== "REJECTED") {
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
            }
          })}
        </div>
        {selectedApplication && (
          <div className=" w-1/2 flex flex-col border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col min-h-screen text-start bg-white p-5 rounded-lg">
              <a className="text-2xl">{selectedApplication.username}</a>
              <a className="">{selectedApplication.email}</a>

              <div className="">
                <h1 className="text-2xl mt-5">Curriculum</h1>
                <Curriculum selectedApplication={selectedApplication} />
              </div>

              <a className="">
                <h1 className="text-2xl my-3 mt-10">Questions</h1>
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

              <SelectJobStatus
                applications={applications}
                selectedApplication={selectedApplication}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
