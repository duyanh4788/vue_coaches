import { Coaches } from "./modules/coaches/state";
import { Requests } from "./modules/requests/state";
import { Globals } from "./modules/globals/state";
import { Auths } from "./modules/auth/state";

export interface RootState {
  coaches: Coaches;
  requests: Requests;
  globals: Globals;
  auths: Auths;
}
