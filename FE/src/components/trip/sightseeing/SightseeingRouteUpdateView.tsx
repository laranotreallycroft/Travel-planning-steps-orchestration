import { Button, Form } from "antd";
import React, { useCallback, useState } from "react";
import { ISightseeingRoutePayload } from "../../../model/trip/sightseeing/Sightseeing";
import MapElement, { IGeosearchPayload } from "../../common/map/MapElement";
import MapSearch from "../../common/map/MapSearch";

export interface ISightseeingRouteUpdateViewOwnProps {
  selectedLocation: IGeosearchPayload;
  onSightseeingRouteUpdate: (value: ISightseeingRoutePayload) => void;
}

type ISightseeingRouteUpdateViewProps = ISightseeingRouteUpdateViewOwnProps;

const SightseeingRouteUpdateView: React.FC<ISightseeingRouteUpdateViewProps> = (
  props: ISightseeingRouteUpdateViewProps
) => {
  const [form] = Form.useForm<ISightseeingRoutePayload>();
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>(
    props.selectedLocation
  );

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    setSelectedLocation(parsedValue);
  }, []);

  return (
    <Form<ISightseeingRoutePayload>
      form={form}
      onFinish={props.onSightseeingRouteUpdate}
    >
      <MapSearch onSelectLocation={handleSelectLocation} />
      <MapElement selectedLocation={selectedLocation} />
      <Button type="primary" onClick={form.submit}>
        Submit
      </Button>
    </Form>
  );
};

export default SightseeingRouteUpdateView;
