import { ShortTagType, TagType } from "./Tag";

export type ShortErrorData = {
  id: string;
  message: string;
  resolved: boolean;
  tags?: ShortTagType[];
};

export type StreamErrorData = {
  id: string;
  message: string;
  resolved: boolean;
  namespaceId: string;
  stackTrace: string;
};

export type AggregateErrorGroupByStatusResponseData = {
  aggregatedTags: ShortTagType[];
  userAffectedCount: number;
  errorCount: number;
};

export type AggregateErrorGroupByLineResponseData = {
  line: number;
  aggregatedTags: ShortTagType[];
  userAffectedCount: number;
  errorCount: number;
};

export type AggregateErrorGroupByMessageResponseData = {
  message: string;
  aggregatedTags: ShortTagType[];
  userAffectedCount: number;
  errorCount: number;
};

export type AggregateErrorGroupByTagResponseData = {
  tag: ShortTagType;
  userAffectedCount: number;
  errorCount: number;
};

export type AggregateErrorResponseData =
  | AggregateErrorGroupByMessageResponseData[]
  | AggregateErrorGroupByLineResponseData[]
  | AggregateErrorGroupByTagResponseData[];

export type ErrorData = {
  id: string;
  userAffected: string;
  path: string;
  line: number;
  message: string;
  stackTrace: string;
  resolved: boolean;
  tags: TagType[];
  createdAt: Date;
  updatedAt: Date;
};

export type ErrorAggregateData = {
  count: number;
  time: Date;
};

export type ErrorAggregateDataResponse = ErrorAggregateData[];

export type ErrorMetaData = {
  id: string;
  resolved: boolean;
  createdAt: string;
};

export type ErrorMetaDataRequest = {
  namespaceId: string;
  groupBy: string;
  groupKey?: string;
  offset: number;
  limit: number;
};

export type ErrorPieChartDataRequest = Omit<
  ErrorMetaDataRequest,
  "offset" | "limit"
>;

export type ErrorPieChartData = {
  groupKey: string;
  count: number;
};

export type ErrorPieChartDataResponse = ErrorPieChartData[];

export type GetErrorAggregateRequest = {
  namespaceId: string;
  startTime: string;
  timeIntervalMinutes: number;
  timezone: string;
};

export type GetUniqueMetaByNamespaceIdRequest = {
  namespaceId: string;
  filterRequest: string;
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
