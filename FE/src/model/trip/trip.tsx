import { ICoordinates } from 'model/geometry/Coordinates';
import { IPackingList } from 'model/trip/packingList/PackingList';
import { IItinerary } from 'model/trip/itinerary/Itinerary';

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

export interface ITripCreatePayload {
  dateFrom: string;
  dateTo: string;
  location: ILocation;
}

export interface ILocation {
  coordinates: ICoordinates;
  label: string;
  id: string;
}

export interface ITripUpdatePayload extends ITripCreatePayload {
  label: string;
}
