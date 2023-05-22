import { BoundsTuple } from "leaflet-geosearch/dist/providers/provider";
import HomeView from "./HomeView";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback, useState } from "react";

export interface IGeosearchPayload {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple | null;
  raw: { place_id: string };
}
const provider = new OpenStreetMapProvider();

export interface IHomeContainerOwnProps {}

type IHomeContainerProps = IHomeContainerOwnProps;

const HomeContainer: React.FC<IHomeContainerProps> = (
  props: IHomeContainerProps
) => {
  const [locationArray, setlocationArray] = useState<IGeosearchPayload[]>();

  const handleLocationSearch = useCallback(
    (value: string) => {
      provider
        .search({ query: value })
        .then((geosearchPayloadArray: IGeosearchPayload[]) => {
          setlocationArray(geosearchPayloadArray);
        });
    },
    [provider.search]
  );
  return (
    <HomeView
      onLocationSearch={handleLocationSearch}
      locationArray={locationArray}
    />
  );
};

export default HomeContainer;
