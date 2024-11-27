import { DataSelect } from 'components/common/input/DataSelect';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { initMap } from 'components/common/map/utils';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';
import { IGeosearchPayload, IGeosearchPayloadWithId } from 'model/geometry/Coordinates';
import { useCallback, useState } from 'react';
import AppConfigService from 'service/common/AppConfigService';
import { LangUtils } from 'service/util/LangUtils';

const debounceTimeout = AppConfigService.getValue('common.debounceTimeout');
const minSearchLength = AppConfigService.getValue('common.minSearchStringLength');

export interface IMapSearchOwnProps {
  value?: IGeosearchPayloadWithId;
  onChange: (value: IGeosearchPayloadWithId) => void;
  showValueAfterSearch?: boolean;
  initialValue?: string;
}

type IMapSearchProps = IMapSearchOwnProps & IWithLocalizeOwnProps;

initMap();
const provider = new OpenStreetMapProvider();

const MapSearch: React.FC<IMapSearchProps> = (props: IMapSearchProps) => {
  const [searchLocationArray, setSearchLocationArray] = useState<IGeosearchPayloadWithId[]>();

  const handleLocationSearch = useCallback(
    debounce((value?: string) => {
      if (value && value.length > minSearchLength) {
        provider.search({ query: value }).then((geosearchPayloadArray: IGeosearchPayload[]) => {
          setSearchLocationArray(
            geosearchPayloadArray.map((value) => {
              return { ...value, id: Number(value.raw.place_id) };
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
    (value?: IGeosearchPayloadWithId | IGeosearchPayloadWithId[]) => {
      if (value && !LangUtils.isArray(value)) {
        props.onChange(value);
        setSearchLocationArray([]);
      }
    },
    [props.onChange]
  );

  return (
    <DataSelect<IGeosearchPayloadWithId>
      enableSearch={true}
      placeholder={props.translate('MAP_SEARCH.PLACEHOLDER')}
      defaultValue={props.initialValue}
      onChange={handleLocationSelect}
      onSearch={handleLocationSearch}
      options={searchLocationArray?.map((location: IGeosearchPayloadWithId) => {
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
    />
  );
};

export default withLocalize<IMapSearchOwnProps>(MapSearch as any);
