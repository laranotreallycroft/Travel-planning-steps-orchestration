import { connect } from "react-redux";
import TripSettingsView from "./TripSettingsView";

export interface ITripSettingsContainerOwnProps {}

export interface ITripSettingsContainerStateProps {}
export interface ITripSettingsContainerDispatchProps {}
type ITripSettingsContainerProps = ITripSettingsContainerOwnProps &
  ITripSettingsContainerStateProps &
  ITripSettingsContainerDispatchProps;

const TripSettingsContainer: React.FC<ITripSettingsContainerProps> = (
  props: ITripSettingsContainerProps
) => {
  return <TripSettingsView />;
};

const mapStateToProps = (state: any): ITripSettingsContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): ITripSettingsContainerDispatchProps => ({});

export default connect<
  ITripSettingsContainerStateProps,
  ITripSettingsContainerDispatchProps,
  ITripSettingsContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripSettingsContainer);
