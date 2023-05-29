import { ICoordinates } from "../geometry/Coordinates";
import { IPackingList } from "./packingList/PackingList";

export interface ITrip {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  packingList: IPackingList;
}

export interface ITripCreatePayload {
  userId: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
