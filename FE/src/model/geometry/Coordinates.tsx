export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGeosearchResult extends ICoordinates {
  label: string;
  raw: {
    place_id: string;
  };
}

export interface ILocation {
  coordinates: ICoordinates;
  label: string;
  id: number;
}
