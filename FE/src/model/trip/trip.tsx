import { ICoordinates } from "../geometry/Coordinates";
import { IPackingList } from "./packingList/PackingList";
import { IItinerary } from "./itinerary/Itinerary";

export interface ITrip {
  id: number;
  label: string;
  dateFrom: Date;
  dateTo: Date;
  locationLabel: string;
  location: ICoordinates;
  packingLists: IPackingList[];
  itineraries: IItinerary[];
}

export interface ITripPayload {
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  locationLabel: string;
}
