export type Answer = {
  id: string;
  textAnswer: string | null;
  optionId: string | null;
  applicationId: string;
  questionId: string;
};

export function answerFactory(overrides: Partial<Answer> = {}): Answer {
  return {
    id: crypto.randomUUID(),
    textAnswer: null,
    optionId: "option_3",
    applicationId: "app_456",
    questionId: "question_2",
    ...overrides,
  };
}

export function answersFactory(overrides: Partial<Answer>[] = []): Answer[] {
  if (overrides.length === 0) {
    return [answerFactory()];
  }

  return overrides.map((answerOverride) => answerFactory(answerOverride));
}
