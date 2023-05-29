import { connect } from "react-redux";

export interface ITripPackingListContainerOwnProps {}
export interface ITripPackingListContainerStateProps {}
export interface ITripPackingListContainerDispatchProps {}
type ITripPackingListContainerProps = ITripPackingListContainerOwnProps &
  ITripPackingListContainerStateProps &
  ITripPackingListContainerDispatchProps;

const TripPackingListContainer: React.FC<ITripPackingListContainerProps> = (
  props: ITripPackingListContainerProps
) => {
  return <></>;
};

const mapStateToProps = (
  state: any
): ITripPackingListContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): ITripPackingListContainerDispatchProps => ({});

export default connect<
  ITripPackingListContainerStateProps,
  ITripPackingListContainerDispatchProps,
  ITripPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripPackingListContainer);
