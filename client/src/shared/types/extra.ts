import { FormEvent, MouseEvent } from "react";

export type PaginationWithId = {
  id: string;
  offset?: number;
  limit?: number;
};

export type ButtonClickEvent =
  | MouseEvent<HTMLButtonElement>
  | FormEvent<HTMLFormElement>;
