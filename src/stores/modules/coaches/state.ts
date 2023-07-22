export interface Coache {
  [key: string]: string | string[] | number | undefined;
  id?: number;
  firstName?: string;
  lastName?: string;
  areas?: string[];
  description?: string;
  hourlyRate?: number;
  rate?: number;
  validAreas?: string;
  validRate?: string;
}

export interface Coaches {
  coaches: Coache[];
  lastGetList: number | null;
}

export const state: Coaches = {
  coaches: [],
  lastGetList: null,
};
