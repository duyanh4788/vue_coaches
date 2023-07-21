export interface UserInfor {
  email?: string;
  password?: string;
  idToken?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
}

export interface Auths {
  userInfor: UserInfor | null;
  isAuth: boolean;
}

export const state: Auths = {
  userInfor: null,
  isAuth: false,
};
