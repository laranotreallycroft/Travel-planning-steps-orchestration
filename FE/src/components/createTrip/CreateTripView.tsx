import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useCallback, useState } from "react";
import { IGeosearchPayload } from "./CreateTripContainer";

import MapElement from "../common/map/MapElement";

export interface ICreateTripViewOwnProps {
  locationArray?: IGeosearchPayload[];
  onLocationSearch: (searchValue: string) => void;
  onTripCreate: (values: ITripCreateForm) => void;
  onCreateTripModalClose: () => void;
}

export interface ITripCreateForm {
  dateRange: RangeValue<Dayjs>;
  location: IGeosearchPayload;
}

type ICreateTripViewProps = ICreateTripViewOwnProps;

const CreateTripView: React.FC<ICreateTripViewProps> = (
  props: ICreateTripViewProps
) => {
  const [form] = Form.useForm<ITripCreateForm>();
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>();

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    setSelectedLocation(parsedValue);
    form.setFieldValue("location", parsedValue);
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    form.resetFields();
    props.onCreateTripModalClose();
  }, []);

  const handleFinish = useCallback((values: ITripCreateForm) => {
    form.resetFields();
    props.onCreateTripModalClose();
    props.onTripCreate(values);
  }, []);

  return (
    <Form form={form} onFinish={handleFinish} requiredMark={false}>
      <Form.Item
        name={"dateRange"}
        label={"Your travel dates"}
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item
        name={"location"}
        label={"Your travel destination"}
        className="fullWidth"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Select
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
      <MapElement selectedLocation={selectedLocation} />
      <Row
        gutter={[16, 16]}
        justify={"end"}
        className="fullWidth margin-top-xl"
      >
        <Col>
          <Button onClick={handleCancelButtonClick}>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={form.submit}>
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateTripView;
