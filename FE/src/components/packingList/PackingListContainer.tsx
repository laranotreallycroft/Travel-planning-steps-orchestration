import { connect } from "react-redux";

export interface IPackingListContainerOwnProps {}
export interface IPackingListContainerStateProps {}
export interface IPackingListContainerDispatchProps {}
type IPackingListContainerProps = IPackingListContainerOwnProps &
  IPackingListContainerStateProps &
  IPackingListContainerDispatchProps;

const PackingListContainer: React.FC<IPackingListContainerProps> = (
  props: IPackingListContainerProps
) => {
  return <></>;
};

const mapStateToProps = (state: any): IPackingListContainerStateProps => ({});

const mapDispatchToProps = (
  dispatch: any
): IPackingListContainerDispatchProps => ({});

export default connect<
  IPackingListContainerStateProps,
  IPackingListContainerDispatchProps,
  IPackingListContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(PackingListContainer);
