import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Commit } from "vuex";
import { GlobalsAction } from "stores/modules/globals/actions";

export enum TypeRequest {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
}

export const handleApi = async (type: string, data: any, nameSpace: string, commit: Commit, key: string) => {
  try {
    commit(GlobalsAction.SET_LOADING, true);
    let result: any;
    switch (type) {
      case TypeRequest.POST:
        result = await httpRequest(nameSpace).post("", data);
        break;
      case TypeRequest.GET:
        result = await httpRequest(nameSpace).get("");
        break;
      case TypeRequest.PUT:
        result = await httpRequest(nameSpace).put("", data);
        break;
      default:
        break;
    }
    result = configResponse(result as AxiosResponse);
    commit(GlobalsAction.SET_LOADING, false);
    commit(GlobalsAction.SET_SUCCESS, { key, status: true });
    return result;
  } catch (error: any) {
    commit(GlobalsAction.SET_LOADING, false);
    commit(GlobalsAction.SET_ERROR, error.message);
    throw configResponseError(error);
  }
};

const httpRequest = (nameSpace: string) => {
  const request: AxiosInstance = axios.create({
    baseURL: `https://fir-vue-ab758-default-rtdb.asia-southeast1.firebasedatabase.app/${nameSpace}.json`,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "***",
      Accept: "*/*",
    },
    timeout: 25000,
  });
  return request;
};

function configResponse(response: AxiosResponse<any>): any {
  if (!response.data) {
    return { message: "server not found", code: 401 };
  }
  const data = Object.values(response.data);
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
  return { message: errors.message };
  const { code, message, success, status } = errors.response.data;
  if (!message && code) {
    return { code, message: "request server not found", status };
  }
  if (message && !code) {
    return { code: 404, message, status };
  }
  return { message, code, success, status };
}
