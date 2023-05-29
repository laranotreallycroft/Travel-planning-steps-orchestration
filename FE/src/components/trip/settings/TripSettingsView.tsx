import { Switch } from "antd";
import React from "react";

export interface ITripSettingsViewOwnProps {}

type ITripSettingsViewProps = ITripSettingsViewOwnProps;

const TripSettingsView: React.FC<ITripSettingsViewProps> = (
  props: ITripSettingsViewProps
) => {
  return (
    <>
      <div>
        Packing list <Switch></Switch>
      </div>
      <div>
        Weather <Switch></Switch>
      </div>
      <div>
        Sightseeing <Switch></Switch>
      </div>
    </>
  );
};

export default TripSettingsView;
