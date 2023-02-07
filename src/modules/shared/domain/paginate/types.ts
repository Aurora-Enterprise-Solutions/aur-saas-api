import { FilterQuery, PaginateOptions, PaginateResult as MongoosePaginateResult } from 'mongoose'

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  totalPages: number;
  offset: number;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number;
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}

export type PaginateMethod<T> = (
  query?: FilterQuery<T>,
  options?: PaginateOptions,
  callback?: (err: any, result: MongoosePaginateResult<T>) => void,
) => Promise<MongoosePaginateResult<T>>;
