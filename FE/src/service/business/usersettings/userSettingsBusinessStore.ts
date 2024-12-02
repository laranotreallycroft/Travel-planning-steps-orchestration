import { IPayloadAction } from 'service/business/common/types';

// -
// -------------------- Types&Consts

export interface IUserSettings {
  locale: string;
}

// -
// -------------------- Selectors

/** Returns UserSettings from store. */
const getUserSettings = (store: any): IUserSettings => store.userSettings;

// -
// -------------------- Actions

const Actions = {
  USER_SETTINGS_STORE: 'USER_SETTINGS_STORE',
};

/** Store UserSettings to store */
const storeUserSettings = (userSettings: IUserSettings): IPayloadAction<IUserSettings> => {
  return {
    type: Actions.USER_SETTINGS_STORE,
    payload: userSettings,
  };
};

// -
// -------------------- Side-effects

// -
// -------------------- Reducers

const userSettings = (state: IUserSettings | null = null, action: IPayloadAction<IUserSettings>) => {
  if (action.type === Actions.USER_SETTINGS_STORE) {
    return action.payload;
  }

  return state;
};

// --
// -------------------- Business Store

export const UserSettingsBusinessStore = {
  actions: {
    storeUserSettings,
  },

  selectors: {
    getUserSettings,
  },

  effects: {},

  reducers: {
    userSettings,
  },
};

// --
// export business store
export default UserSettingsBusinessStore;
