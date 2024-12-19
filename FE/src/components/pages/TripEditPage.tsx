import TripEditContainer from 'components/trip/edit/TripEditContainer';

export interface ITripEditPageOwnProps {}

type ITripEditPageProps = ITripEditPageOwnProps;

const TripEditPage: React.FC<ITripEditPageProps> = (props: ITripEditPageProps) => {
  return <TripEditContainer />;
};

export default TripEditPage;
