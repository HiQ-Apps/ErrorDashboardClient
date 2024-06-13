import { FormEvent, MouseEvent } from "react";

export type PaginationWithId = {
  id: string;
  offset?: number;
  limit?: number;
};

export type ButtonClickEvent =
  | MouseEvent<HTMLButtonElement>
  | FormEvent<HTMLFormElement>;

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
