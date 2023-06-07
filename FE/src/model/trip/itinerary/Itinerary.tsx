import { IGeosearchPayload } from "../../../components/common/map/MapElement";
import { ICoordinates } from "../../geometry/Coordinates";

export interface IItinerary {
  id: number;
  date: String;
  routeGeometry: ICoordinates[];
  itineraryElements: IItineraryElement[];
}
export interface IItineraryElement {
  id: number;
  label: string;
  location: IGeosearchPayload;
  travelDuration: number;
}
