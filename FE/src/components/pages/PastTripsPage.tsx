import PastTripListContainer from 'components/trip/list/PastTripListContainer';

export interface IPastTripsPageOwnProps {}

type IPastTripsPageProps = IPastTripsPageOwnProps;

const PastTripsPage: React.FC<IPastTripsPageProps> = (props: IPastTripsPageProps) => {
  return <PastTripListContainer />;
};

export default PastTripsPage;
