import React from 'react';
import { connect } from 'react-redux';

export interface ITripContainerOwnProps {
  tripId: string;
}
export interface ITripContainerStateProps {}
export interface ITripContainerDispatchProps {}
type ITripContainerProps = ITripContainerOwnProps & ITripContainerStateProps & ITripContainerDispatchProps;

const TripContainer: React.FC<ITripContainerProps> = (props: ITripContainerProps) => {
  return <React.Fragment>{props.tripId} </React.Fragment>;
};

const mapStateToProps = (state: any): ITripContainerStateProps => ({});

const mapDispatchToProps = (dispatch: any): ITripContainerDispatchProps => ({});

export default connect<ITripContainerStateProps, ITripContainerDispatchProps, ITripContainerOwnProps>(mapStateToProps, mapDispatchToProps)(TripContainer);
