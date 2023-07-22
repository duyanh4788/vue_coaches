export interface Coache {
  [key: string]: string | string[] | number | undefined;
  id?: number;
  idFireBase?: number;
  firstName?: string;
  lastName?: string;
  areas?: string[];
  description?: string;
  hourlyRate?: number;
  rate?: number;
  validAreas?: string;
  validRate?: string;
  typeSubmit?: string;
}

export interface Coaches {
  coaches: Coache[];
  coache: Coache | null;
  lastGetList: number | null;
}

export const state: Coaches = {
  coaches: [],
  lastGetList: null,
  coache: null,
};
