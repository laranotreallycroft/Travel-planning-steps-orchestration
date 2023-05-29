import PackingListContainer from "../packingList/PackingListContainer";

export interface IPackingListPageOwnProps {}

type IPackingListPageProps = IPackingListPageOwnProps;

const PackingListPage: React.FC<IPackingListPageProps> = (
  props: IPackingListPageProps
) => {
  return <PackingListContainer />;
};

export default PackingListPage;
