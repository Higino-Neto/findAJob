import { JobApplicationItemDTO } from "@/types/job-application-list-item.dto";
import { answersFactory } from "./answer.factory";
import userFactory from "./user.factory";
import { DeepPartial } from "@/types/utils/deepPartial";

export default function applicationFactory(
  overrides: DeepPartial<JobApplicationItemDTO> = {},
): JobApplicationItemDTO {
  const application: JobApplicationItemDTO = {
    user: userFactory(overrides.user),
    answers: answersFactory(overrides.answers),
    jobId: "job_789",
    id: crypto.randomUUID(),
    userId: "user_123",
    curriculumPath: "/uploads/curriculos/joao_silva.pdf",
    status: "PENDING",
    appliedAt: "2026-01-15T14:32:00.000Z",
  };

  return {
    ...application,
    ...overrides,
  } as JobApplicationItemDTO;
}
