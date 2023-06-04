import { ICoordinates } from "../geometry/Coordinates";
import { IPackingList } from "./packingList/PackingList";
import { ISightseeing } from "./sightseeing/Sightseeing";

export interface ITrip {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  packingList: IPackingList;
  sightseeing: ISightseeing[];
}

export interface ITripCreatePayload {
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
