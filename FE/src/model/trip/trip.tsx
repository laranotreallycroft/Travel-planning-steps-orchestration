import { ILocation } from 'model/geometry/Coordinates';
import { IItinerary } from 'model/trip/itinerary/Itinerary';
import { IPackingList } from 'model/trip/packingList/PackingList';

export interface ITrip {
  id: string;
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
  packingLists: IPackingList[];
  itineraries: IItinerary[];
}
