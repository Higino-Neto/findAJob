export type ApplicationWithAnswers = {
  id: string;
  jobId: string;
  userId: string;
  curriculumPath: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: string;

  answers: {
    id: string;
    questionId: string;
    textAnswer?: string | null;
    optionId?: string | null;
  }[];
};