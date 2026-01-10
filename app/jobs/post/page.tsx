export default function PostJobPage() {
  return (
    <div className="min-h-[cal(100vh-10rem)] flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="flex justify-center text-4xl mb-6">Post a Job</h1>
        <form>
          <div className="flex flex-col mb-6">
            <label>Job Title</label>
            <input
              type="text"
              name="jobName"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label>Company</label>
            <input
              type="text"
              name="company"
              required
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label>Location</label>
            <input
              type="text"
              name="location"
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
              <option value="Remote">Remote</option>
              <option value="Presential">Presential</option>
              <option value="Hibrid">Hibrid</option>
            </select>
          </div>
          <div className="flex flex-col mb-6">
            <label>Description</label>
            <textarea
              rows={6}
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
              className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
            />
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
