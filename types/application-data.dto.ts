export type ApplicationData = {
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
