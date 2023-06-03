import SightseeingContainer from "../trip/sightseeing/SightseeingContainer";

export interface ISightseeingPageOwnProps {}

type ISightseeingPageProps = ISightseeingPageOwnProps;

const SightseeingPage: React.FC<ISightseeingPageProps> = (
  props: ISightseeingPageProps
) => {
  return <SightseeingContainer />;
};

export default SightseeingPage;
