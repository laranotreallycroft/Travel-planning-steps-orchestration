export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGeosearchPayload extends ICoordinates {
  label: string;
  raw: {
    place_id: string;
  };
}

export interface IGeosearchPayloadWithId extends IGeosearchPayload {
  id: number;
}
