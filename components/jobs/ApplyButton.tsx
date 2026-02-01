import { useRouter } from "next/navigation";

type ApplyButtonProps = {
  jobId: string;
  hasApplied: boolean;
};

export default function ApplyButton({ jobId, hasApplied }: ApplyButtonProps) {
  const router = useRouter();
  return (
    <>
      <button
        disabled={hasApplied}
        onClick={() => router.push(`/jobs/${jobId}/applications`)}
        className="bg-indigo-500 w-40 px-2 py-1 rounded-md disabled:cursor-no-drop disabled:bg-indigo-300 shadow-md mt-6 mb-3 text-gray-50 hover:cursor-pointer"
      >
        Apply to this job
      </button>
    </>
  );
}
