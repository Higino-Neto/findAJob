"use client";
import JobInput from "@/components/JobInput";
import Questions from "@/components/Questions";
import { useState } from "react";

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

export default function PostJobPage() {
  const [questions, setQuestion] = useState<Question[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary") ?? null,
    };

    const rawQuestionData = questions.map((q) => ({ ...q }));
    const questionData: {
      text: string;
      type: "open" | "multiple";
      options?: {
        text: string;
        order: number;
      }[];
      order: number;
    }[] = [];

    rawQuestionData.forEach((question, id) => {
      const filteredOptions = question.options?.map((option, index) => {
        return {
          text: option.text,
          order: index,
        };
      });

      questionData.push({
        text: question.text ?? "",
        type: question.type,
        options: filteredOptions ?? [],
        order: id,
      });
    });

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          job: jobData,
          questions: questionData,
        }),
      });
    } catch (error) {
      console.log("Error posting the Job: ", error);
    }
    setQuestion([]);
  };

  return (
    <div className="min-h-[cal(100vh-10rem)] flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="flex justify-center text-4xl mb-6">Post a Job</h1>
        <h1 className="text-2xl">Job Info</h1>

        <form onSubmit={handleSubmit}>
          <JobInput
            placeholder={"e.g. Fullstack Junior Developer"}
            name="title"
          >
            Job Title *
          </JobInput>
          <JobInput name="company">Company *</JobInput>
          <JobInput name="location">Location *</JobInput>

          <div className="flex flex-col mb-6">
            <label>Job Type *</label>
            <select
              name="type"
              id="type"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            >
              <option value="">Select an option</option>
              <option value="remote">Remote</option>
              <option value="presential">Presential</option>
              <option value="hibrid">Hibrid</option>
            </select>
          </div>

          <div className="flex flex-col mb-6">
            <label>Description *</label>
            <textarea
              rows={6}
              name="description"
              id="description"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

          <JobInput name="salary" placeholder="e.g. $80.000 - $120.000" required={false}>
            Salary (Optional)
          </JobInput>

          <Questions questions={questions} setQuestion={setQuestion} />

          <div>
            <button
              type="submit"
              className="text-gray-50 text-2xl w-full p-2 flex justify-center items-center bg-indigo-500 rounded-md shadow-lg hover:cursor-pointer transition-all duration-200 hover:scale-101"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
