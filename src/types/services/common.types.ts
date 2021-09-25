export interface Response<T = unknown> {
  data: T;
  message: string;
  status: string;
  timestamp: string;
}
