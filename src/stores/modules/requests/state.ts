export interface Request {
  id?: number;
  coachId?: string;
  email: string;
  message: string;
}

export interface Requests {
  requests: Request[];
}

export const state: Requests = {
  requests: [],
};
