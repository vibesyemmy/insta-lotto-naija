export interface AppError {
  message: string;
  severity: number;
};

export const initAppError: AppError = {
  message: '',
  severity: -1
};
