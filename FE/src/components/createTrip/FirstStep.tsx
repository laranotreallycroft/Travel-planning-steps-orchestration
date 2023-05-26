import { Col, DatePicker, Form, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import MapElement from "../common/map/MapElement";
import { IGeosearchPayload } from "./CreateTripContainer";
import { ITrip } from "../../model/trip/Trip";

export interface IFirstStepOwnProps {
  isHidden: boolean;
  onLocationSearch: (searchValue: string) => void;
  locationArray?: IGeosearchPayload[];
}

type IFirstStepProps = IFirstStepOwnProps;

const FirstStep: React.FC<IFirstStepProps> = (props: IFirstStepProps) => {
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>();
  const form = Form.useFormInstance<ITrip>();

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    setSelectedLocation(parsedValue);
    form.setFieldValue("location", parsedValue);
  }, []);

  return (
    <React.Fragment>
      <Col className="fullHeight firstStep__formCol" hidden={props.isHidden}>
        <Title level={2} className="font-neutral">
          When are you travelling?
        </Title>
        <Form.Item name={"dateRange"} hidden={props.isHidden}>
          <DatePicker.RangePicker />
        </Form.Item>
        <Title level={2} className="font-neutral" hidden={props.isHidden}>
          Where are you travelling?
        </Title>
        <Form.Item
          name={"location"}
          hidden={props.isHidden}
          shouldUpdate={true}
        >
          <Select
            className="fullWidth"
            filterOption={false}
            showSearch={true}
            placeholder="Location"
            onChange={handleSelectLocation}
            onSearch={props.onLocationSearch}
            options={props.locationArray?.map((location: IGeosearchPayload) => {
              return {
                label: location.label,
                value: JSON.stringify(location),
                key: location.raw.place_id,
              };
            })}
          />
        </Form.Item>
      </Col>
      <Col className="fullSize firstStep__mapCol" hidden={props.isHidden}>
        <MapElement selectedLocation={selectedLocation}></MapElement>
      </Col>
    </React.Fragment>
  );
};

export default FirstStep;
