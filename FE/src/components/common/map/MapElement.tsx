import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

import { IIdPayload } from "../../../service/business/common/types";
import { ChangeView, initMap } from "./utils";
import { ICoordinates } from "../../../model/geometry/Coordinates";
import { LatLngExpression } from "leaflet";

export interface IGeosearchPayload extends ICoordinates {
  label: string;
  raw?: { place_id: string };
}

export type IGeosearchPayloadWithId = IGeosearchPayload & IIdPayload;
export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchPayloadWithId;
  locations?: IGeosearchPayloadWithId[];
  paths?: LatLngExpression[];
  className?: string;
}
type IMapElementProps = IMapElementOwnProps;

initMap();

const MapElement: React.FC<IMapElementProps> = (props: IMapElementProps) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      className={"mapElement__MapContainer " + props.className}
    >
      <ChangeView
        center={
          props.selectedLocation
            ? [props.selectedLocation.y, props.selectedLocation.x]
            : [51.505, -0.09]
        }
        zoom={13}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.paths && <Polyline positions={props.paths} />}
      {props.locations?.map((location) => (
        <Marker
          key={`marker-${location.id}`}
          position={[location.y, location.x]}
        >
          <Popup>
            <span>{location.label}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapElement;
