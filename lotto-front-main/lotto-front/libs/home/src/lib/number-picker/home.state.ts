import { AppError } from "@lotto-front/model";

export interface HomeState {
  isLoading: boolean;
  number: string;
  hasError: boolean;
  error: AppError
}

export const initHomeState: HomeState = {
  isLoading: false,
  number: '',
  hasError: false,
  error: null
}
