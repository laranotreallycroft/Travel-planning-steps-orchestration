import { ICoordinates } from 'model/geometry/Coordinates';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { IItinerary } from 'model/trip/itinerary/Itinerary';

export interface ITrip {
  id: number;
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
  packingLists?: IPackingList[];
  itineraries?: IItinerary[];
}

export interface ITripCreatePayload {
  label: string;
  dateFrom: string;
  dateTo: string;
  location: ILocation;
}

export interface ILocation {
  coordinates: ICoordinates;
  label: string;
  id: number;
}

export interface ITripUpdatePayload extends ITripCreatePayload {
  label: string;
}
