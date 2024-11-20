import TripListContainer from 'components/trip/TripListContainer';

export interface IUpcomingTripsPageOwnProps {}

type IUpcomingTripsPageProps = IUpcomingTripsPageOwnProps;

const UpcomingTripsPage: React.FC<IUpcomingTripsPageProps> = (props: IUpcomingTripsPageProps) => {
  return <TripListContainer />;
};

export default UpcomingTripsPage;
