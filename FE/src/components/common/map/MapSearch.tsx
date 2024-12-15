import { DataSelect } from 'components/common/input/DataSelect';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';
import { ILocation, IGeosearchResult } from 'model/geometry/Coordinates';
import { useCallback, useState } from 'react';
import AppConfigService from 'service/common/AppConfigService';
import { LangUtils } from 'service/util/LangUtils';

const debounceTimeout = AppConfigService.getValue('common.debounceTimeout');
const minSearchLength = AppConfigService.getValue('common.minSearchStringLength');

export interface IMapSearchOwnProps {
  value?: ILocation;
  onChange: (value: ILocation) => void;
  hideValueAfterSelect?: boolean;
  initialValue?: string;
}

type IMapSearchProps = IMapSearchOwnProps & IWithLocalizeOwnProps;

const provider = new OpenStreetMapProvider();

const MapSearch: React.FC<IMapSearchProps> = (props: IMapSearchProps) => {
  const [searchLocationArray, setSearchLocationArray] = useState<ILocation[]>();

  const handleLocationSearch = useCallback(
    debounce((value?: string) => {
      if (value && value.length > minSearchLength) {
        provider.search({ query: value }).then((geosearchPayloadArray: IGeosearchResult[]) => {
          setSearchLocationArray(
            geosearchPayloadArray.map((value) => {
              return {
                id: Number(value.raw.place_id),
                label: value.label,
                coordinates: { x: value.x, y: value.y },
              };
            })
          );
        });
      } else {
        setSearchLocationArray([]);
      }
    }, debounceTimeout),
    [provider.search]
  );

  const handleLocationSelect = useCallback(
    (value?: ILocation | ILocation[]) => {
      if (value && !LangUtils.isArray(value)) {
        props.onChange(value);
        setSearchLocationArray([]);
      }
    },
    [props.onChange]
  );

  return (
    <DataSelect<ILocation>
      className="fullWidth"
      enableSearch={true}
      placeholder={props.translate('MAP_SEARCH.PLACEHOLDER')}
      defaultValue={props.initialValue}
      onChange={handleLocationSelect}
      onSearch={handleLocationSearch}
      options={searchLocationArray?.map((location: ILocation) => {
        return {
          id: location.id,
          value: location.id,
          key: location.id,
          label: location.label,
          data: location,
        };
      })}
      notFoundContent={null}
      dropdownStyle={{ zIndex: 10000 }}
      hideValueAfterSelect={props.hideValueAfterSelect}
    />
  );
};

export default withLocalize<IMapSearchOwnProps>(MapSearch as any);
