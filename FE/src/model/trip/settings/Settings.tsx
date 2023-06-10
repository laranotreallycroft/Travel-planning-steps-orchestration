import { ICoordinates } from "../../geometry/Coordinates";

export interface ITripUpdatePayload {
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
