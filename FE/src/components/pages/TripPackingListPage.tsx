import TripPackingListContainer from "../trip/packingList/TripPackingListContainer";

export interface ITripPackingListPageOwnProps {}

type ITripPackingListPageProps = ITripPackingListPageOwnProps;

const TripPackingListPage: React.FC<ITripPackingListPageProps> = (
  props: ITripPackingListPageProps
) => {
  return <TripPackingListContainer />;
};

export default TripPackingListPage;
