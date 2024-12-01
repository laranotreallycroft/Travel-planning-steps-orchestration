import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export interface IChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

export const ChangeView = (props: IChangeViewProps) => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [map]);
  map.setView(props.center, props.zoom);
  return null;
};
