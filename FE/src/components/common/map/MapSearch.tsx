import { Row, Select } from "antd";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { IGeosearchPayload } from "./MapElement";
import { initMap } from "./utils";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
export interface IMapSearchOwnProps {
  onSelectLocation: (value: string) => void;
  showValueAfterSearch?: boolean;
}
type IMapSearchProps = IMapSearchOwnProps;

initMap();
const provider = new OpenStreetMapProvider();
const MapSearch: React.FC<IMapSearchProps> = (props: IMapSearchProps) => {
  const [searchLocationArray, setSearchLocationArray] =
    useState<IGeosearchPayload[]>();

  const handleLocationSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 0) {
        provider
          .search({ query: value })
          .then((geosearchPayloadArray: IGeosearchPayload[]) => {
            setSearchLocationArray(geosearchPayloadArray);
          });
      } else {
        setSearchLocationArray([]);
      }
    }, 500),
    [provider.search]
  );

  const handleLocationSelect = useCallback(
    (value: string) => {
      props.onSelectLocation(value);
      handleLocationSearch("");
    },
    [props.onSelectLocation, handleLocationSearch]
  );
  return (
    <Select
      filterOption={false}
      showSearch={true}
      placeholder="Location"
      value={props.showValueAfterSearch ? undefined : null}
      onChange={handleLocationSelect}
      onSearch={handleLocationSearch}
      options={searchLocationArray?.map((location: IGeosearchPayload) => {
        return {
          label: location.label,
          value: JSON.stringify(location),
          key: location.raw?.place_id,
        };
      })}
      notFoundContent={
        <Row justify={"center"}>
          <SentimentVeryDissatisfiedIcon />
          No location found
        </Row>
      }
      className="fullWidth"
    />
  );
};

export default MapSearch;
