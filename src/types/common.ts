import { ReactNode } from "react";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationResponse<T> {
  success: boolean;
  data: T[];
  totalCount: number;
  error?: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export type Nullable<T> = T | null;

export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];

export interface DropdownItem<ValueType = string> {
  label: string;
  value: ValueType;
}
