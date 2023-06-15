import { Row, Select } from "antd";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { IGeosearchPayload } from "./MapElement";
import { initMap } from "./utils";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
export interface IMapSearchOwnProps {
  onSelectLocation: (value: string) => void;
  showValueAfterSearch?: boolean;
  initialValue?: string;
}
type IMapSearchProps = IMapSearchOwnProps;

initMap();
const provider = new OpenStreetMapProvider();
const MapSearch: React.FC<IMapSearchProps> = (props: IMapSearchProps) => {
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    props.initialValue
  );

  useEffect(() => {
    setSelectedLabel(props.initialValue);
  }, [props.initialValue]);

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
      setSelectedLabel(value);
      handleLocationSearch("");
    },
    [props.onSelectLocation, handleLocationSearch]
  );
  return (
    <Select
      filterOption={false}
      showSearch={true}
      placeholder="Location"
      defaultValue={props.initialValue}
      value={props.showValueAfterSearch ? selectedLabel : null}
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
        <Row>
          <SentimentVeryDissatisfiedIcon className="margin-left-xs" />
          No location found
        </Row>
      }
      className="fullWidth"
      dropdownStyle={{ zIndex: 10000 }}
    />
  );
};

export default MapSearch;
