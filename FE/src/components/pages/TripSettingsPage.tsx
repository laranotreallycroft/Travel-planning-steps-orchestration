import TripSettingsContainer from "../trip/settings/TripSettingsContainer";

export interface ITripSettingsPageOwnProps {}

type ITripSettingsPageProps = ITripSettingsPageOwnProps;

const TripSettingsPage: React.FC<ITripSettingsPageProps> = (
  props: ITripSettingsPageProps
) => {
  return <TripSettingsContainer />;
};

export default TripSettingsPage;
