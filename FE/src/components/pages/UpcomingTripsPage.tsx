import UpcomingTripListContainer from 'components/trip/UpcomingTripListContainer';

export interface IUpcomingTripsPageOwnProps {}

type IUpcomingTripsPageProps = IUpcomingTripsPageOwnProps;

const UpcomingTripsPage: React.FC<IUpcomingTripsPageProps> = (props: IUpcomingTripsPageProps) => {
  return <UpcomingTripListContainer />;
};

export default UpcomingTripsPage;
