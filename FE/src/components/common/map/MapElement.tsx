import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ChangeView, initMap } from "./utils";
export interface IGeosearchPayload {
  x: number;
  y: number;
  label: string;
  raw?: { place_id: string };
}
export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchPayload;
}
type IMapElementProps = IMapElementOwnProps;

initMap();

const MapElement: React.FC<IMapElementProps> = (props: IMapElementProps) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      className="mapElement__MapContainer"
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

      {props.selectedLocation && (
        <Marker
          key={`marker-${props.selectedLocation?.label}`}
          position={[props.selectedLocation?.y, props.selectedLocation.x]}
        >
          <Popup>
            <span>{props.selectedLocation.label}</span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapElement;
