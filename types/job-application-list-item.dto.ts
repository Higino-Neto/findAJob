import { ApplicationStatus } from "@/app/generated/prisma";

export type JobApplicationItemDTO = {
    user: {
        name: string | null;
        id: string;
        email: string | null;
        image: string | null;
    };
    answers: {
        id: string;
        textAnswer: string | null;
        optionId: string | null;
        applicationId: string;
        questionId: string;
    }[];
} & {
    jobId: string;
    id: string;
    userId: string;
    curriculumPath: string;
    status: ApplicationStatus;
    appliedAt: string;
}