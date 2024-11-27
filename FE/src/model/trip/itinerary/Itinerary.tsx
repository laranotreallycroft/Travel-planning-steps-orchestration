import { ICoordinates, IGeosearchPayload } from 'model/geometry/Coordinates';

export interface IItinerary {
  id: number;
  date: string;
  routeGeometry: ICoordinates[];
  itineraryElements: IItineraryElement[];
  transportationMethod: string;
}
export interface IItineraryElement {
  id: number;
  label: string;
  location: IGeosearchPayload;
  duration: number;
  travelDuration: number;
  commuteStartDate: Date;
  commuteEndDate: Date;
  startDate: Date;
  endDate: Date;
}
