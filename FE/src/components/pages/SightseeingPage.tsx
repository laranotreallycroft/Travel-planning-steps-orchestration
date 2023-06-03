import SightseeingRouteUpdateContainer from "../trip/sightseeing/SightseeingRouteUpdateContainer";

export interface ISightseeingPageOwnProps {}

type ISightseeingPageProps = ISightseeingPageOwnProps;

const SightseeingPage: React.FC<ISightseeingPageProps> = (
  props: ISightseeingPageProps
) => {
  return <SightseeingRouteUpdateContainer />;
};

export default SightseeingPage;
