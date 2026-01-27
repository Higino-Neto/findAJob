export type Job = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string | null;
  postedAt: Date;
  postedById: string;
};