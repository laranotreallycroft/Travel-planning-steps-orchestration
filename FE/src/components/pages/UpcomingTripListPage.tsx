import UpcomingTripListContainer from 'components/trip/list/UpcomingTripListContainer';

export interface IUpcomingTripListPageOwnProps {}

type IUpcomingTripListPageProps = IUpcomingTripListPageOwnProps;

const UpcomingTripListPage: React.FC<IUpcomingTripListPageProps> = (props: IUpcomingTripListPageProps) => {
  return <UpcomingTripListContainer />;
};

export default UpcomingTripListPage;
