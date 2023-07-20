export interface Coache {
  [key: string]: string | string[] | number | undefined;
  id?: number;
  firstName?: string;
  lastName?: string;
  areas?: string[] | any[];
  description?: string;
  hourlyRate?: number;
  rate?: number;
}

export interface Coaches {
  coaches: Coache[];
  lastGetList: number | null;
}

export const state: Coaches = {
  coaches: [],
  lastGetList: null,
};
