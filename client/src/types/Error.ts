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

export type AggregateErrorGroupByStatusResponseData = {
  status_code: number;
  aggregated_tags: ShortTagType[];
  user_affected_count: number;
  error_count: number;
};

export type AggregateErrorGroupByLineResponseData = {
  line: number;
  aggregated_tags: ShortTagType[];
  user_affected_count: number;
  error_count: number;
};

export type AggregateErrorGroupByMessageResponseData = {
  message: string;
  aggregated_tags: ShortTagType[];
  user_affected_count: number;
  error_count: number;
};

export type AggregateErrorGroupByTagResponseData = {
  tag: ShortTagType;
  user_affected_count: number;
  error_count: number;
};

export type AggregateErrorResponseData =
  | AggregateErrorGroupByStatusResponseData[]
  | AggregateErrorGroupByMessageResponseData[]
  | AggregateErrorGroupByLineResponseData[]
  | AggregateErrorGroupByTagResponseData[];

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

export type ErrorMetaData = {
  id: string;
  resolved: boolean;
  created_at: string;
};

export type ErrorMetaDataRequest = {
  namespace_id: string;
  group_by: string;
  group_key?: string;
  offset: number;
  limit: number;
};

export type GetErrorAggregateRequest = {
  namespace_id: string;
  start_time: string;
  time_interval_minutes: number;
  timezone: string;
};

export const isGroupByStatusResponse = (
  data: AggregateErrorResponseData
): data is AggregateErrorGroupByStatusResponseData[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    (data[0] as AggregateErrorGroupByStatusResponseData).status_code !==
      undefined
  );
};

export const isGroupByLineResponse = (
  data: AggregateErrorResponseData
): data is AggregateErrorGroupByLineResponseData[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    (data[0] as AggregateErrorGroupByLineResponseData).line !== undefined
  );
};

export const isGroupByMessageResponse = (
  data: AggregateErrorResponseData
): data is AggregateErrorGroupByMessageResponseData[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    (data[0] as AggregateErrorGroupByMessageResponseData).message !== undefined
  );
};

export const isGroupByTagResponse = (
  data: AggregateErrorResponseData
): data is AggregateErrorGroupByTagResponseData[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    (data[0] as AggregateErrorGroupByTagResponseData).tag !== undefined
  );
};
