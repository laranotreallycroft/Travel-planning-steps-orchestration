import { BoundsTuple } from "leaflet-geosearch/dist/providers/provider";
import CreateTripView from "./CreateTripView";
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

export interface ICreateTripContainerOwnProps {}

type ICreateTripContainerProps = ICreateTripContainerOwnProps;

const CreateTripContainer: React.FC<ICreateTripContainerProps> = (
  props: ICreateTripContainerProps
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
    <CreateTripView
      onLocationSearch={handleLocationSearch}
      locationArray={locationArray}
    />
  );
};

export default CreateTripContainer;
