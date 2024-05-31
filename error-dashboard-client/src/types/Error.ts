export type ShortErrorData = {
  id: string;
  message: string;
  status_code: number;
  resolved: boolean;
  created_at: Date;
};

export type ErrorData = {
  id: string;
  status_code: number;
  user_affected: string;
  path: string;
  line: number;
  message: string;
  stack_trace: string;
  resolved: boolean;
  created_at: Date;
  updated_at: Date;
};
