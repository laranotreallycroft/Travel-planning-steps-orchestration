import { ICoordinates } from "../geometry/Coordinates";
import { IPackingList } from "./packingList/PackingList";
import { IItinerary } from "./itinerary/Itinerary";

export interface ITrip {
  id: number;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  location: ICoordinates;
  packingList?: IPackingList;
  packingListChecked?: IPackingList;
  itineraries?: IItinerary[];
}

export interface ITripPayload {
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
