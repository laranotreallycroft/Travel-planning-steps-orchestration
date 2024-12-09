import { ICoordinates, ILocation } from 'model/geometry/Coordinates';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { IItinerary } from 'model/trip/itinerary/Itinerary';

export interface ITrip {
  id: string;
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
  packingLists: IPackingList[];
  itineraries: IItinerary[];
}

export interface ITripCreatePayload {
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
}
