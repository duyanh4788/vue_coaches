export interface Auths {
  userInfor?: {
    email?: string;
    password?: string;
    idToken?: string;
    refreshToken?: string;
    expiresIn?: string;
    localId?: string;
  } | null;
}

export const state: Auths = {
  userInfor: null,
};
