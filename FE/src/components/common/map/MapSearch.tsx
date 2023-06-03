import { Select } from "antd";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback, useState } from "react";
import { IGeosearchPayload } from "./MapElement";
import { initMap } from "./utils";

export interface IMapSearchOwnProps {
  onSelectLocation: (value: string) => void;
}
type IMapSearchProps = IMapSearchOwnProps;

initMap();
const provider = new OpenStreetMapProvider();
const MapSearch: React.FC<IMapSearchProps> = (props: IMapSearchProps) => {
  const [searchLocationArray, setSearchLocationArray] =
    useState<IGeosearchPayload[]>();

  const handleLocationSearch = useCallback(
    (value: string) => {
      if (value.length > 0)
        provider
          .search({ query: value })
          .then((geosearchPayloadArray: IGeosearchPayload[]) => {
            setSearchLocationArray(geosearchPayloadArray);
          });
      else setSearchLocationArray([]);
    },
    [provider.search]
  );

  const handleLocationSelect = (value: string) => {
    props.onSelectLocation(value);
    handleLocationSearch("");
  };
  return (
    <Select
      filterOption={false}
      showSearch={true}
      placeholder="Location"
      onChange={handleLocationSelect}
      onSearch={handleLocationSearch}
      options={searchLocationArray?.map((location: IGeosearchPayload) => {
        return {
          label: location.label,
          value: JSON.stringify(location),
          key: location.raw?.place_id,
        };
      })}
    />
  );
};

export default MapSearch;
