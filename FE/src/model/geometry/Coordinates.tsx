import { IIdRef } from 'model/common/IdRef';

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

export interface IGeosearchData extends IIdRef {
  label: string;
  coordinates: ICoordinates;
}
