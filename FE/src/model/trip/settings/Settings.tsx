export interface ITripSettings {
  notifications: ITripSettingsNotifications;
}

export interface ITripSettingsNotifications {
  packingList: boolean;
  weather: boolean;
  sightseeing: boolean;
}
