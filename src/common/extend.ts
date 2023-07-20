import { Coache } from "stores/modules/coaches/state";

interface InputInterface {
  id: string;
  value: string;
  label: string;
  type: string;
}

export const inputRegs: InputInterface[] = [
  { id: "firstName", value: "firstName", label: "Fist Name", type: "text" },
  { id: "lastName", value: "lastName", label: "Last Name", type: "text" },
  {
    id: "description",
    value: "description",
    label: "Description",
    type: "text",
  },
  { id: "rate", value: "rate", label: "Rating", type: "number" },
];

interface ListArea {
  id: string;
  value: string;
  label: string;
  checked: boolean;
}

export const listAreas: ListArea[] = [
  {
    id: "frontend",
    value: "frontend",
    label: "Frontend",
    checked: true,
  },
  { id: "backend", value: "backend", label: "Backend", checked: true },
  { id: "career", value: "career", label: "Career", checked: true },
];

export const inputReg: Coache = {
  firstName: "",
  lastName: "",
  areas: [],
  description: "",
  rate: 0,
};

export const inputForms: InputInterface[] = [
  { id: "email", value: "email", label: "Email", type: "text" },
  { id: "message", value: "message", label: "Message", type: "text" },
];

export const inputForm: any = {
  email: "",
  message: "",
};

export enum StateStore {
  COACHES = "coaches",
  REQUEST = "requests",
  AUTH = "auth",
}
