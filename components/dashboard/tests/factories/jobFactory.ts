import { Job } from "@/types/job";

export default function jobFactory(overrides?: Partial<Job>): Job {
    return {
    id: crypto.randomUUID(),
    title: "Frontend Developer",
    description: "Description of the work here",
    postedAt: new Date(),
    company: "Amazon Group",
    postedById: crypto.randomUUID(),
    location: "Brazil, Rio de Janeiro, Barra da Tijuca.",
    type: "Remote",
    salary: "10.000",
    ...overrides,
  };
}
