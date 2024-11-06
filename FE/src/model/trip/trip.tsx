import { ICoordinates } from "model/geometry/Coordinates";
import { IPackingList } from "model/trip/packingList/PackingList";
import { IItinerary } from "model/trip/itinerary/Itinerary";

export interface ITrip {
  id: number;
  label: string;
  dateFrom: Date;
  dateTo: Date;
  locationLabel: string;
  location: ICoordinates;
  packingLists?: IPackingList[];
  itineraries?: IItinerary[];
}

export interface ITripPayload {
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  locationLabel: string;
}
