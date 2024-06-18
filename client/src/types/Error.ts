import { ShortTagType, TagType } from "./Tag";

export type ShortErrorData = {
  id: string;
  message: string;
  status_code: number;
  resolved: boolean;
  tags?: ShortTagType[];
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
  tags: TagType[];
  created_at: Date;
  updated_at: Date;
};

export type ErrorAggregateData = {
  count: number;
  time: Date;
};

export type ErrorAggregateDataResponse = ErrorAggregateData[];

export type GetErrorAggregateRequest = {
  namespace_id: string;
  start_time: string;
  time_interval_minutes: number;
  timezone: string;
};
