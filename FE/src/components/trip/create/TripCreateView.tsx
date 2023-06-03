import { DatePicker, Form, Modal, Row, Select } from "antd";
import { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useCallback, useState } from "react";

import MapElement, { IGeosearchPayload } from "../../common/map/MapElement";

export interface ITripCreateViewOwnProps {
  createTripModalOpen: boolean;
  locationArray?: IGeosearchPayload[];
  onLocationSearch: (searchValue: string) => void;
  onTripCreate: (values: ITripCreateForm) => void;
  onTripCreateModalClose: () => void;
}

export interface ITripCreateForm {
  dateRange: RangeValue<Dayjs>;
  location: IGeosearchPayload;
}

type ITripCreateViewProps = ITripCreateViewOwnProps;

const TripCreateView: React.FC<ITripCreateViewProps> = (
  props: ITripCreateViewProps
) => {
  const [form] = Form.useForm<ITripCreateForm>();
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>();

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    setSelectedLocation(parsedValue);
    form.setFieldValue("location", parsedValue);
    props.onLocationSearch("");
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    form.resetFields();
    setSelectedLocation(undefined);
    props.onTripCreateModalClose();
  }, []);

  const handleFinish = useCallback((values: ITripCreateForm) => {
    handleCancelButtonClick();
    props.onTripCreate(values);
  }, []);

  return (
    <Modal
      title="Create trip"
      open={props.createTripModalOpen}
      onCancel={handleCancelButtonClick}
      onOk={form.submit}
      className="tripCreateView__modal"
    >
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
                key: location.raw?.place_id,
              };
            })}
          />
        </Form.Item>
        <MapElement selectedLocation={selectedLocation} />
        <Row
          gutter={[16, 16]}
          justify={"end"}
          className="fullWidth margin-top-xl"
        ></Row>
      </Form>
    </Modal>
  );
};

export default TripCreateView;
