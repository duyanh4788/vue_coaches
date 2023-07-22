import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Commit } from "vuex";
import { GlobalsAction } from "stores/modules/globals/actions";
import { KeyLocal, TypeLocal, localStorageServices } from "./localstorage";
import { UserInfor } from "stores/modules/auth/state";

export enum TypeRequest {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const API_AUTH_SIGNUP = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB0mWIRE9qmPwrHC8bE7GxZ0J2UIXEzi8";
export const API_AUTH_SIGNIN = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB0mWIRE9qmPwrHC8bE7GxZ0J2UIXEzi8";
const API_DATA = "https://fir-vue-ab758-default-rtdb.asia-southeast1.firebasedatabase.app/";

const defineApiFireBase = (nameSpace: string, userLocal: UserInfor) => {
  const result = API_DATA + `${nameSpace}.json`;
  if (userLocal) return result + `?auth=${userLocal.idToken}`;
  if (!userLocal) return result;
};
export const handleApi = async (type: string, data: any, nameSpace: string, commit: Commit, key: string, apiAuth?: string) => {
  try {
    commit(GlobalsAction.SET_LOADING, true);
    let result: any;
    switch (type) {
      case TypeRequest.POST:
        result = await httpRequest(nameSpace, apiAuth).post("", JSON.stringify(data));
        break;
      case TypeRequest.GET:
        result = await httpRequest(nameSpace, apiAuth).get("");
        break;
      case TypeRequest.PUT:
        result = await httpRequest(nameSpace, apiAuth).put("", data);
        break;
      case TypeRequest.PATCH:
        result = await httpRequest(nameSpace, apiAuth).patch("", data);
        break;
      case TypeRequest.DELETE:
        result = await httpRequest(nameSpace, apiAuth).delete("", data);
        break;
      default:
        break;
    }
    result = configResponse(result as AxiosResponse);
    // if (nameSpace === "coaches" && type === TypeRequest.POST) {
    //   throw new Error("Test Notifi CSS");
    // }
    commit(GlobalsAction.SET_LOADING, false);
    commit(GlobalsAction.SET_SUCCESS, { key, status: true });
    return result;
  } catch (error: any) {
    commit(GlobalsAction.SET_LOADING, false);
    const err = configResponseError(error);
    commit(GlobalsAction.SET_ERROR, err.message);
    throw err;
  }
};

const httpRequest = (nameSpace: string, apiAuth?: string) => {
  const userLocal: UserInfor = localStorageServices(TypeLocal.GET, KeyLocal.USER_INFOR);
  const request: AxiosInstance = axios.create({
    baseURL: apiAuth ? apiAuth : defineApiFireBase(nameSpace, userLocal),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request;
};

function configResponse(response: AxiosResponse<any>): any {
  if (!response.data) {
    return { message: "server not found", code: 401 };
  }
  if (response.data.hasOwnProperty("kind")) return response.data;
  if (response.data.hasOwnProperty("id")) return response.data;
  const data = defineDataFireBase(response.data);
  if (data) return data;
  if (!data) throw Object.assign(new Error("can not get data!"), { code: 404 });
  // const { data, code, message, success, status } = response.data;
  // if (code >= 400 && code <= 500) {
  //   throw Object.assign(new Error(message), { code });
  // }
  // return { data, message, code, success, status };
}

function configResponseError(errors: AxiosError | any): any {
  if (!errors || !errors.response || !errors.response.data) {
    return { message: "request server not found", code: 404 };
  }
  return { message: errors.response.data.error.message ? errors.response.data.error.message : errors.message };
  const { code, message, success, status } = errors.response.data;
  if (!message && code) {
    return { code, message: "request server not found", status };
  }
  if (message && !code) {
    return { code: 404, message, status };
  }
  return { message, code, success, status };
}

function defineDataFireBase(data: any) {
  if (!data) return;
  let result: any[] = [];
  for (let key of Object.keys(data)) {
    result.push({ idFireBase: key, ...data[key] });
  }
  return result;
}
