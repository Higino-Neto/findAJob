"use client";
import { FormEvent } from "react";

export default function PostJobPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary") ?? null,
    };

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("Error posting the Job: ", error);
    }
  };

  return (
    <div className="min-h-[cal(100vh-10rem)] flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="flex justify-center text-4xl mb-6">Post a Job</h1>
        <h1 className="text-2xl">Job Info</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label>Job Title</label>
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
            <label>Company</label>
            <input
              type="text"
              name="company"
              id="company"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label>Location</label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label>Job Type</label>
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
            <label>Description</label>
            <textarea
              rows={6}
              name="description"
              id="description"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              id="salary"
              placeholder="e.g. $80.000 - $120.000"
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>

          <div className="flex flex-col ">
            <h1 className="text-2xl mb-4">Questions for the Candidate</h1>
            <button className="block mb-4 font-extrabold text-2xl border border-gray-500 h-10 w-10 rounded-full">
              +
            </button>

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
