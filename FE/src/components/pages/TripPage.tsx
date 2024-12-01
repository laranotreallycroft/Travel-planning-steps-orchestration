import TripContainer from 'components/trip/TripContainer';
import React from 'react';
import { useParams } from 'react-router-dom';

export interface ITripPageOwnProps {}

type ITripPageProps = ITripPageOwnProps;

const TripPage: React.FC<ITripPageProps> = (props: ITripPageProps) => {
  const { tripId } = useParams();
  return <React.Fragment>{tripId && <TripContainer tripId={tripId} />}</React.Fragment>;
};

export default TripPage;
