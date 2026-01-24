export type QuestionWithOptions = {
    options?: {
        id: string;
        text: string;
        order: number;
        questionId: string;
    }[];
} & {
    id: string;
    type: string;
    jobId: string;
    text: string;
    order: number;
}