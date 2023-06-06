import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { ChangeView, initMap } from "./utils";
import { IUUIdPayload } from "../../../service/business/common/types";

export interface IGeosearchPayload {
  x: number;
  y: number;
  label: string;
  raw?: { place_id: string };
}

export type IGeosearchPayloadWithUUId = IGeosearchPayload & IUUIdPayload;
export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchPayloadWithUUId;
  locations?: IGeosearchPayloadWithUUId[];
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
