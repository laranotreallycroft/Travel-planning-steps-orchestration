import { IGeosearchPayload } from "../../../components/common/map/MapElement";

export interface ISightseeing {}

export interface IShortestRoute {
  locations: IGeosearchPayload[];
}

export interface IShortestRouteOpenrouteservicePayload {
  jobs: IShortestRouteOpenrouteservicePayloadJobs[];
  vehicles: IShortestRouteOpenrouteservicePayloadVehicles[];
}
export interface IShortestRouteOpenrouteservicePayloadJobs {
  id: number;
  location: number[];
  skills: number[];
}

export interface IShortestRouteOpenrouteservicePayloadVehicles {
  id: number;
  profile: string;
  start: number[];
  end: number[];
  capacity: number[];
  skills: number[];
}
