import React from "react";
import ItineraryCreateContainer from "./create/ItineraryCreateContainer";
export interface IItineraryViewOwnProps {}

type IItineraryViewProps = IItineraryViewOwnProps;
const ItineraryView: React.FC<IItineraryViewProps> = (
  props: IItineraryViewProps
) => {
  return <ItineraryCreateContainer />;
};

export default ItineraryView;
