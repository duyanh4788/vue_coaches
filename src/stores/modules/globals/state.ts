export interface SuccessResponse {
  key: string;
  status: boolean;
}

export interface Globals {
  isLoading?: boolean;
  errors?: any;
  success: SuccessResponse | null;
}

export const state: Globals = {
  isLoading: false,
  errors: null,
  success: null,
};
