import { UserInfor } from "stores/modules/auth/state";

export enum KeyLocal {
  USER_INFOR = "USER_INFOR",
}

export enum TypeLocal {
  GET = "GET",
  SET = "SET",
  CLEAR = "CLEAR",
  REMOVE = "REMOVE",
}

export const localStorageServices = (type: string, key?: any, data?: any): UserInfor | string | any => {
  switch (type) {
    case TypeLocal.GET:
      const value = localStorage.getItem(key);
      if (value === null || value === "undefined") return null;
      return JSON.parse(value);
    case TypeLocal.SET:
      localStorage.setItem(key, JSON.stringify(data));
      break;
    case TypeLocal.REMOVE:
      localStorage.removeItem(key);
      break;
    case TypeLocal.CLEAR:
      localStorage.clear();
      break;
    default:
      break;
  }
};
