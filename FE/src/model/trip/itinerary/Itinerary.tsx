import { IGeosearchPayload } from "../../../components/common/map/MapElement";

export interface IItinerary {
  itineraryElements: IItineraryElement[];
  date: String;
}
export interface IItineraryElement {
  location: IGeosearchPayload;
}
