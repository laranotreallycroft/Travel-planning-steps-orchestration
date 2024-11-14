import PageLayoutContainer from "components/layout/PageLayoutContainer";

export interface IPageLayoutOwnProps {}

type IPageLayoutProps = IPageLayoutOwnProps;

const PageLayout: React.FC<IPageLayoutProps> = (props: IPageLayoutProps) => {
  return <PageLayoutContainer />;
};

export default PageLayout;
