"use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { QuestionWithOptions } from "@/types/questionsWithOptions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDeleteApplicationMutate } from "@/hooks/useDeleteApplicationMutate";
import { SweperJobs } from "@/components/sweper";
import PdfPreview from "@/components/pdfPreview";

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
  status: string;
  curriculumPath: string;
};

type JobStatus = "pending" | "accepted" | "rejected";
type DraftStatus = "rejected" | "accepted" | null;

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
  const [draftStatus, setDraftStatus] = useState<DraftStatus>(null);
  const [curriculumUrl, setCurriculumUrl] = useState("");
  const { mutate } = useDeleteApplicationMutate();
  const [isClient, setIsClient] = useState(false);

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
    setJobStatus("pending");
    setDraftStatus(null);
    setIsClient(true);
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

    setJobStatus(normalizeJobStatus(application.status));
    setSelectedApplication(applicationData);
    handleShowCurriculum(application.curriculumPath);
  };

  function normalizeJobStatus(value: string): JobStatus {
    const v = value.toLowerCase();
    if (v === "pending" || v === "accepted" || v === "rejected") {
      return v;
    }

    return "pending";
  }

  const handleStatusChange = (value: string) => {
    setJobStatus(normalizeJobStatus(value));
    if (value !== "pending") {
      setDraftStatus(value as DraftStatus);
    }
  };

  const handleDeleteApplication = (id: string) => {
    mutate(id);
  };

  const handleShowCurriculum = async (curriculumPath: string) => {
    const fileRes = await fetch(
      `/api/applications/download-curriculum/${curriculumPath}`,
    );
    if (!fileRes.ok) throw new Error("Error getting curriculum");
    const file = await fileRes.blob();
    const url = URL.createObjectURL(file);
    setCurriculumUrl(url);
  };

  const downloadCV = async (username: string, url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV-${username.replaceAll(" ", "-")}.pdf`;
    a.click();
  };

  return (
    <div>
      <SweperJobs jobs={jobs} setSelectedJob={setSelectedJob} />

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
          <div className=" w-1/2 flex flex-col border border-gray-300 rounded-lg shadow-lg max-h-screen">
            <div className="flex flex-col h-screen text-start bg-white p-4 rounded-lg">
              <a className="text-2xl">{selectedApplication.username}</a>
              <a className="">{selectedApplication.email}</a>

              <div className="my-4">
                <div className="max-h-60 max-w-60 w-100 h-60">
                  {curriculumUrl && isClient && <PdfPreview objectUrl={curriculumUrl} />}
                </div>
                <Button
                  onClick={() =>
                    downloadCV(selectedApplication.username!, curriculumUrl)
                  }
                  className="hover:cursor-pointer mt-2"
                >
                  Download CV
                </Button>
              </div>

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
                    <SelectItem value="pending">PENDING</SelectItem>
                    <SelectItem value="accepted" className="text-green-500">
                      ACCEPTED
                    </SelectItem>
                    <SelectItem value="rejected" className="text-red-500">
                      REJECTED
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div>
                  <Dialog
                    open={draftStatus === "accepted"}
                    onOpenChange={(open) => {
                      if (!open) {
                        setDraftStatus(null);
                        setJobStatus(
                          normalizeJobStatus(selectedApplication.status),
                        );
                      }
                    }}
                  >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to accept/approve this
                          candidate?
                        </DialogTitle>
                        <DialogDescription>
                          Future description for accept a user here.
                        </DialogDescription>
                      </DialogHeader>
                      <Button onClick={() => {}}>Accept</Button>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Dialog
                    open={draftStatus === "rejected"}
                    onOpenChange={(open) => {
                      if (!open) {
                        setDraftStatus(null);
                        setJobStatus(
                          normalizeJobStatus(selectedApplication.status),
                        );
                      }
                    }}
                  >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to reject/reprove this
                          candidate? (This application will disapear)
                        </DialogTitle>
                        <DialogDescription>
                          Future description to reject a user here.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        onClick={() => {
                          handleDeleteApplication(selectedApplication.id);
                        }}
                      >
                        Reject
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
