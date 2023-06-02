import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

export interface IChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

export const initMap = () => {
  // fixes buggy no-show marker
  //@ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
};

export const ChangeView = (props: IChangeViewProps) => {
  const map = useMap();
  map.invalidateSize();
  map.setView(props.center, props.zoom);
  return null;
};
