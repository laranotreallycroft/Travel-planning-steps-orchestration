import PackingListContainer from "components/trip/packingList/PackingListContainer";

export interface IPackingListPageOwnProps {}

type IPackingListPageProps = IPackingListPageOwnProps;

const PackingListPage: React.FC<IPackingListPageProps> = (
  props: IPackingListPageProps
) => {
  return <PackingListContainer />;
};

export default PackingListPage;
