import ItineraryContainer from "../trip/itinerary/ItineraryContainer";

export interface IItineraryPageOwnProps {}

type IItineraryPageProps = IItineraryPageOwnProps;

const ItineraryPage: React.FC<IItineraryPageProps> = (
  props: IItineraryPageProps
) => {
  return <ItineraryContainer />;
};

export default ItineraryPage;
