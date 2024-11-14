import { DefaultConfigValueContainer } from "service/util/config/ConfigValueContainer";
import MultiConfigManager from "service/util/config/MultiConfigManager";

/** Config manager that exposes application config. */
export class AppConfigManager extends MultiConfigManager<any> {
  constructor(configs: object[]) {
    super(
      "AppConfigManager",
      configs.map((config) => new DefaultConfigValueContainer<any>(config))
    );
  }
}
