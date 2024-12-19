import { ICoordinates, ILocation } from 'model/geometry/Coordinates';
import { IItineraryElementPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';

export interface IItinerary {
  id: string;
  date: string;
  routeGeometry?: ICoordinates[];
  itineraryElements: IItineraryElement[];
  transportationMethod: string;
}
export interface IItineraryElement extends IItineraryElementPayload {
  travelDuration: number;
  commuteStartDate: Date;
  commuteEndDate: Date;
  startDate: Date;
  endDate: Date;
}
