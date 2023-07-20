import { Coaches } from "./modules/coaches/state";
import { Requests } from "./modules/requests/state";
import { Globals } from "./modules/globals/state";

export interface RootState {
  coaches: Coaches;
  requests: Requests;
  globals: Globals;
}
