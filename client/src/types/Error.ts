import { ShortTagType, TagType } from "./Tag";

export type ShortErrorData = {
  id: string;
  message: string;
  status_code: number;
  resolved: boolean;
  tags?: ShortTagType[];
};

export type StreamErrorData = {
  id: string;
  status_code: number;
  message: string;
  resolved: boolean;
  namespace_id: string;
  stack_trace: string;
};

export type AggregateErrorResponseData = {
  status_code: number;
  message: string;
  aggregated_tags: ShortTagType[];
  user_affected_count: number;
  error_count: number;
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
