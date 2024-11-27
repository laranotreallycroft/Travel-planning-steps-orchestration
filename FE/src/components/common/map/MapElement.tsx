import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

import { ChangeView, initMap } from 'components/common/map/utils';
import L, { LatLngExpression } from 'leaflet';
import { COLORS } from 'model/geometry/Colors';
import { IGeosearchPayloadWithId } from 'model/geometry/Coordinates';
import AppConfigService from 'service/common/AppConfigService';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import markerSvg from 'asset/img/marker.svg';

const defaultLocation = AppConfigService.getValue('common.location.coordinates');
const defaultZoom = AppConfigService.getValue('common.location.zoom');
const tileLayer = AppConfigService.getValue('common.location.tileLayer');

export interface IMapElementOwnProps {
  selectedLocation?: IGeosearchPayloadWithId;
  locationList?: IGeosearchPayloadWithId[][];
  pathList?: LatLngExpression[][];
  className?: string;
}
type IMapElementProps = IMapElementOwnProps & IWithLocalizeOwnProps;

//initMap();

const MapElement: React.FC<IMapElementProps> = (props: IMapElementProps) => {
  return (
    <MapContainer center={defaultLocation} zoom={defaultZoom} scrollWheelZoom={true} className={'mapElement__MapContainer ' + props.className}>
      <ChangeView center={props.selectedLocation ? [props.selectedLocation.y, props.selectedLocation.x] : defaultLocation} zoom={defaultZoom} />
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
            position={[location.y, location.x]}
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
