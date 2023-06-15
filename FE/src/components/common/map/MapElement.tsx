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
import L, { LatLngExpression } from "leaflet";
import { COLORS } from "../../../model/geometry/Colors";

export interface IGeosearchPayload extends ICoordinates {
  label: string;
  raw?: { place_id: string };
}

export type IGeosearchPayloadWithId = IGeosearchPayload & IIdPayload;

export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchPayloadWithId;
  locations?: IGeosearchPayloadWithId[][];
  paths?: LatLngExpression[][];
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
      {props.paths &&
        props.paths.map((pathArray, index) => (
          <Polyline
            key={index}
            positions={pathArray}
            color={"#" + COLORS[index]}
          />
        ))}
      {props.locations?.map((locationArray, index) =>
        locationArray?.map((location) => (
          <Marker
            key={`marker-${location.id}`}
            position={[location.y, location.x]}
            icon={
              new L.Icon({
                iconUrl: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${COLORS[index]}&chf=a,s,ee00FFFF`,
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })
            }
          >
            <Popup>
              <span>{location.label}</span>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default MapElement;
