import { ICoordinates } from "../geometry/Coordinates";
import { IPackingList } from "./packingList/PackingList";
import { IItinerary } from "./itinerary/Itinerary";

export interface ITrip {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  packingList?: IPackingList;
  packingListChecked?: IPackingList;
  itinerary?: IItinerary[];
}

export interface ITripCreatePayload {
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
