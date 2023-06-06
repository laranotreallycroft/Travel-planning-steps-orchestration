import { DatePicker, Form, Modal, Row } from "antd";
import { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MapElement, {
  IGeosearchPayload,
  IGeosearchPayloadWithUUId,
} from "../../common/map/MapElement";
import MapSearch from "../../common/map/MapSearch";
export interface ITripCreateViewOwnProps {
  isTripCreateModalOpen: boolean;
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
  const [selectedLocation, setSelectedLocation] =
    useState<IGeosearchPayloadWithUUId>();

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayloadWithUUId = {
      ...JSON.parse(value),
      id: uuidv4(),
    };
    setSelectedLocation(parsedValue);
    form.setFieldValue("location", parsedValue);
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
      open={props.isTripCreateModalOpen}
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
          <MapSearch
            onSelectLocation={handleSelectLocation}
            showValueAfterSearch={true}
          />
        </Form.Item>
        <MapElement
          selectedLocation={selectedLocation}
          locations={selectedLocation ? [selectedLocation] : undefined}
        />
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
