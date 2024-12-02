import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

import markerSvg from 'asset/img/marker.svg';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { ChangeView } from 'components/common/map/utils';
import L, { LatLngExpression } from 'leaflet';
import { COLORS } from 'model/geometry/Colors';
import { IGeosearchData } from 'model/geometry/Coordinates';
import AppConfigService from 'service/common/AppConfigService';

const defaultLocation = AppConfigService.getValue('common.location.coordinates');
const defaultZoom = AppConfigService.getValue('common.location.zoom');
const tileLayer = AppConfigService.getValue('common.location.tileLayer');

export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchData;
  locationList?: IGeosearchData[][];
  pathList?: LatLngExpression[][];
  className?: string;
}
type IMapElementProps = IMapElementOwnProps & IWithLocalizeOwnProps;

const MapElement: React.FC<IMapElementProps> = (props: IMapElementProps) => {
  return (
    <MapContainer center={defaultLocation} zoom={defaultZoom} scrollWheelZoom={true} className={'mapElement__mapContainer ' + props.className}>
      <ChangeView center={props.selectedLocation ? [props.selectedLocation.coordinates.y, props.selectedLocation.coordinates.x] : defaultLocation} zoom={defaultZoom} />
      <TileLayer url={tileLayer} />
      {props.pathList?.map((pathArray, index) => (
        <Polyline key={index} positions={pathArray} color={'#' + COLORS[index]}>
          <Popup>
            <span>{props.translate('MAP_ELEMENT.PATH_POPUP.LABEL', { count: index + 1 })}</span>
          </Popup>
        </Polyline>
      ))}
      {props.locationList?.map((locationArray, index) =>
        locationArray?.map((location) => (
          <Marker
            key={`marker-${location.id}`}
            position={[location.coordinates.y, location.coordinates.x]}
            icon={
              new L.Icon({
                iconUrl: markerSvg,
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

export default withLocalize<IMapElementOwnProps>(MapElement as any);
