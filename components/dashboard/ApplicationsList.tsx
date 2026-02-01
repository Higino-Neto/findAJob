import { ApplicationData } from "@/types/application-data.dto";
import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { QuestionWithOptions } from "@/types/questionsWithOptions";
import { Dispatch, SetStateAction, useEffect } from "react";

type ApplicationsListProps = {
  applications: JobApplicationItemDTO[] | undefined;
  setSelectedApplication: Dispatch<SetStateAction<ApplicationData | null>>
};

export default function ApplicationsList({
  applications,
  setSelectedApplication,
}: ApplicationsListProps) {


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
    <>
      <div className="flex">
        <div className="w-full flex text-start flex-col gap-4 rounded-lg">
          <h2 className="mt-4 text-2xl">Browse for Applications</h2>

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
      </div>
    </>
  );
}
