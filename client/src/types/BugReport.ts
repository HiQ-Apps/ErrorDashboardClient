export type BugReport = {
  id: number;
  issue: string;
  description: string;
  createdAt: string;
};

export type CreateBugReport = Pick<BugReport, "issue" | "description">;
