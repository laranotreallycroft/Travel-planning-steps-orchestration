import { IUserCredentials } from "../../../model/user/User";

// -
// -------------------- Selectors
const getCurrentUser = (store: any): IUserCredentials => store.currentUser;

// -
// -------------------- Actions

// -
// -------------------- Side-effects

// -
// -------------------- Reducers

export const UserBusinessStore = {
  selectors: { getCurrentUser },
  actions: {},
  effects: {},
  reducers: {},
};
