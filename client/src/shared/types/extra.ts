import { FormEvent, MouseEvent } from "react";

export type Id = {
  id: string;
};

export type QueryParamWithId = {
  id: string;
  offset?: number;
  limit?: number;
  groupBy?: string;
};

export type TimeUnits =
  | "Days"
  | "Hours"
  | "Minutes"
  | "Seconds"
  | "Milliseconds";

export interface exchangeTimeFormat {
  time: number;
  unit: TimeUnits;
}

export type PaginationWithId = {
  id: string;
  offset?: number;
  limit?: number;
};

export type Pagination = Omit<PaginationWithId, "id">;

export type SidebarLink = {
  name: string;
  path: string;
  component: JSX.Element;
};

export type ButtonClickEvent =
  | MouseEvent<HTMLButtonElement>
  | FormEvent<HTMLFormElement>
  | FormEvent;

export type TimeZone =
  | "UTC"
  | "America/New_York"
  | "America/Los_Angeles"
  | "America/Chicago"
  | "America/Denver"
  | "Europe/London"
  | "Europe/Paris"
  | "Europe/Berlin"
  | "Asia/Tokyo"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Australia/Sydney"
  | "Australia/Melbourne";
