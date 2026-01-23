"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ApplicationStatus } from "@/app/generated/prisma";

type Question = {
  id: string;
  type: "open" | "multiple";
  text?: string;
  options?: {
    id: string;
    text: string;
    order: number;
  }[];
};

export default function JobApplication() {
  const { data: session } = useSession();
  const params = useParams();
  const jobId = params.jobId as string;

  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetch(`/api/questions/${jobId}`);
      const questions = await data.json();
      setQuestions(questions ?? []);
    };

    fetchQuestions();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const applicationData = {
      jobId: jobId,
      userId: session?.user.id as string,
      status: ApplicationStatus.PENDING,
    };

    const answerData = [];

    for (let question of questions) {
      if (question.type === "open") {
        const textAnswer = formData.get(question.id) as string;
        answerData.push({
          questionId: question.id,
          textAnswer: textAnswer,
        });
      } else {
        const optionId = formData.get(question.id) as string;

        if (optionId) {
          answerData.push({
            questionId: question.id,
            optionId: optionId,
          });
        }
      }
    }

    await fetch("/api/jobs/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        application: applicationData,
        answers: answerData,
      }),
    });
    
    const curriculumFormData = new FormData();

    if (file) {
      curriculumFormData.append("file", file);
      curriculumFormData.append("jobId", jobId);

      await fetch("/api/jobs/applications/upload-curriculum", {
        method: "POST",
        body: curriculumFormData,
      });
    } else {
      alert("Envie o currículo antes de continuar!");
      return;
    }

    setFormKey((prev) => prev + 1);
    setFile(null);
    setQuestions(questions);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg min-h-screen">
        <form className="mt-10" onSubmit={handleSubmit} key={formKey}>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">Application</h1>
            <h1 className="text-xl mt-10">Put your curriculum here</h1>
            <label className="text-center text-gray-500 border border-gray-400 p-2 m-2 w-60 h-10 mb-4 rounded-md hover:cursor-pointer">
              <p>Select a file:</p>
              <input
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-10"
                type="file"
                id="curriculum"
                name="curriculum"
                accept="application/pdf"
                hidden
              />
            </label>
          </div>

          <div className="m-6 ml-30">
            <h1 className="text-2xl mb-3">Questions:</h1>
            {questions.map((question, index) => {
              if (question.type === "open") {
                return (
                  <div key={index} className="w-full flex flex-col">
                    <div className="flex flex-col items-start m-3">
                      <label className="">{`${index + 1} - ${question.text}`}</label>
                      <input
                        type="text"
                        name={question.id}
                        data-type="open"
                        className="border border-gray-500 rounded-md p-1 mt-2"
                      />
                    </div>
                  </div>
                );
              } else if (question.type === "multiple") {
                return (
                  <div key={index} className="w-full flex flex-col">
                    <div className="items-start m-3">
                      <label className="">{`${index + 1} - ${question.text}`}</label>
                      <div>
                        {question.options?.map((option) => {
                          return (
                            <div key={option.id}>
                              <label>
                                <input
                                  className="mt-2"
                                  type="radio"
                                  data-type="multiple"
                                  value={option.id}
                                  name={question.id}
                                />
                                {option.text}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            <button
              type="submit"
              className="bg-indigo-500 w-30 text-gray-50 rounded-md mt-2 hover:cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
