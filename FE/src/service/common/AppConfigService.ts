import { AppConfigManager } from "service/common/AppConfigManager";
import ODYSSEUS_APP_CONFIG from "service/common/config/OdysseusAppConfig";
import { Globals } from "service/util/Globals";

let INSTANCE: AppConfigManager;

function getInstance(): AppConfigManager {
  if (!INSTANCE) {
    // add app environment config
    // env config is added AT THE BEGINING of config so it overrides any other app configs
    // for more info on config hierarchy, take a peek at MultiConfigManager
    const configs = [
      ...(Globals.global.APP_CONFIG_ENV != null
        ? [Globals.global.APP_CONFIG_ENV]
        : []),
      ODYSSEUS_APP_CONFIG,
    ];

    INSTANCE = new AppConfigManager(configs);
  }

  return INSTANCE;
}

/** Class that provides static access to main app config */
export default class AppConfigService {
  static getValue(selector: string): any {
    return getInstance().getValue(selector);
  }
}
