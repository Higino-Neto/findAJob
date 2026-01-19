"use client";
import { FormEvent, useState } from "react";

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

const optionMarks = "abcdefghijklmnopqrstuvwxyz".split("");

export default function PostJobPage() {
  const [questionType, setQuestionType] = useState<"open" | "multiple">("open");
  const [questions, setQuestion] = useState<Question[]>([]);
  const [formKey, setFormKey] = useState(0);

  const addQuestion = () => {
    let newQuestion: Question = {
      id: crypto.randomUUID(),
      type: questionType,
    };
    if (newQuestion.type === "multiple") {
      newQuestion = {
        id: crypto.randomUUID(),
        type: questionType,
        options: [
          {
            id: crypto.randomUUID(),
            text: "",
            order: 0,
          },
          {
            id: crypto.randomUUID(),
            text: "",
            order: 0,
          },
        ],
      };
    }

    setQuestion((prev) => [...prev, newQuestion]);
  };

  const addOption = (questionIndex: number) => {
    setQuestion((prev) =>
      prev.map((question, qIndex) => {
        if (qIndex !== questionIndex) return question;

        return {
          ...question,
          options: [
            ...(question.options ?? []),
            {
              id: crypto.randomUUID(),
              text: "",
              order: 0,
            },
          ],
        };
      }),
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestion((prev) => prev.filter((value) => value.id !== id));
  };

  const deleteOption = (optionIndex: number, questionIndex: number) => {
    setQuestion((prev) =>
      prev.map((question, qIndex) => {
        if (qIndex !== questionIndex) return question;

        return {
          ...question,
          options: question.options?.filter(
            (_, oIndex) => oIndex !== optionIndex,
          ),
        };
      }),
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    setFormKey((prev) => prev + 1);
    setQuestion([]);
  };

  return (
    <div className="min-h-[cal(100vh-10rem)] flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="flex justify-center text-4xl mb-6">Post a Job</h1>
        <h1 className="text-2xl">Job Info</h1>

        <form key={formKey} onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label>Job Title *</label>

            <input
              placeholder="e.g. Fullstack Junior Developer"
              type="text"
              name="title"
              id="title"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              id="company"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

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

          <div className="flex flex-col mb-6">
            <label>Salary (Optional)</label>
            <input
              type="text"
              name="salary"
              id="salary"
              placeholder="e.g. $80.000 - $120.000"
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl mb-4 mt-10">Questions for the Candidate</h1>
            <p className="mb-6">
              You can add questions to see if the candidate fits the company
              environment
            </p>

            <div>
              <div className="flex flex-col scale-90 border p-3 rounded-lg border-gray-700 shadow-md mb-6">
                <p className="text-gray-700">Ex:</p>
                <input
                  placeholder="e.g. What are your salary expectations?"
                  type="text"
                  disabled
                  className="block mt-1 border border-gray-100  rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
                />
                <p className="mt-2 px-3 text-gray-400 select-none">
                  e.g. $80.000 - $100.000
                </p>
                <hr className="mt-0.5 mb-6 mx-2 border-dotted" />
              </div>

              {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <h1>{`Question ${questionIndex + 1}`}</h1>
                  {question.type === "open" ? (
                    <div className="flex flex-col my-2 bg-gray-50 p-4 rounded-md">
                      <input
                        onChange={(e) => {
                          setQuestion((prev) =>
                            prev.map((thisQuestion) =>
                              thisQuestion.id === question.id
                                ? { ...thisQuestion, text: e.target.value }
                                : thisQuestion,
                            ),
                          );
                        }}
                        placeholder="Question"
                        type="text"
                        className="block mt-1 border border-gray-200  rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
                      />
                      <p className="mt-2 px-3 text-gray-400 select-none">
                        Answer here
                      </p>
                      <hr className="mt-0.5 border-dotted" />

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => deleteQuestion(question.id)}
                          className="bg-indigo-500 w-20 text-gray-50 rounded-md mt-2 hover:cursor-pointer"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col my-2 bg-gray-50 p-4 rounded-md">
                      <input
                        onChange={(e) => {
                          setQuestion((prev) =>
                            prev.map((thisQuestion) =>
                              thisQuestion.id === question.id
                                ? { ...thisQuestion, text: e.target.value }
                                : thisQuestion,
                            ),
                          );
                        }}
                        placeholder="Question"
                        type="text"
                        className="block mt-1 border border-gray-200  rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
                      />

                      <div className="flex flex-col gap-3 mt-3 ml-3">
                        {question.options?.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex gap-1 relative"
                          >
                            <p className="text-gray-400 mt-1">
                              {optionMarks[optionIndex]})
                            </p>
                            <input
                              onChange={(e) => {
                                setQuestion((prev) =>
                                  prev.map((question, innerQuestionIndex) => {
                                    if (innerQuestionIndex !== questionIndex)
                                      return question;

                                    return {
                                      ...question,
                                      options: question.options?.map(
                                        (innerOption, innerOptionIndex) => {
                                          if (optionIndex !== innerOptionIndex)
                                            return innerOption;

                                          return {
                                            ...innerOption,
                                            text: e.target.value,
                                          };
                                        },
                                      ),
                                    };
                                  }),
                                );
                              }}
                              className=" p-1 pl-3 w-full ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                deleteOption(optionIndex, questionIndex)
                              }
                              className="bg-indigo-500 absolute right-1 top-1 w-16 text-gray-50 rounded-md hover:cursor-pointer shadow-md"
                            >
                              delete
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => addOption(questionIndex)}
                          className="bg-indigo-500 w-20 text-gray-50 rounded-md mt-4 hover:cursor-pointer h-7 shadow-md"
                        >
                          + Option
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteQuestion(question.id)}
                          className="bg-indigo-500 w-20 text-gray-50 rounded-md mt-4 hover:cursor-pointer h-7 shadow-md"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="relative w-fit">
              <button
                type="button"
                onClick={addQuestion}
                className=" transition-all shadow-lg duration-200 hover:scale-101 w-40 text-lg text-gray-50 mb-25 flex items-start justify-center my-3 p-3 bg-indigo-500 rounded-md hover:cursor-pointer"
              >
                new question
              </button>
              <div className="absolute left-full ml-2 top-0 mt-3">
                <select
                  onChange={(e) => {
                    setQuestionType(e.target.value as "open" | "multiple");
                  }}
                  className="bg-gray-100 px-4 py-2 rounded-md hover:cursor-pointer shadow-sm"
                >
                  <option value="open">Open Question</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
            </div>
          </div>

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
