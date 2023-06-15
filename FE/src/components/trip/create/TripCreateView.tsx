import { DatePicker, Form, Modal } from "antd";
import { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ITrackableAction } from "../../../service/util/trackAction";
import MapElement, {
  IGeosearchPayload,
  IGeosearchPayloadWithId,
} from "../../common/map/MapElement";
import MapSearch from "../../common/map/MapSearch";
export interface ITripCreateViewOwnProps {
  isTripCreateModalOpen: boolean;
  onTripCreate: (values: ITripCreateForm) => ITrackableAction;
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
  const navigator = useNavigate();
  const [form] = Form.useForm<ITripCreateForm>();
  const [selectedLocation, setSelectedLocation] =
    useState<IGeosearchPayloadWithId>();

  const handleSelectLocation = useCallback((value: string) => {
    const parsedValue: IGeosearchPayload = JSON.parse(value);
    form.setFieldValue("location", parsedValue);
    setSelectedLocation({
      ...parsedValue,
      id: uuidv4(),
    });
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setSelectedLocation(undefined);
    props.onTripCreateModalClose();
  }, []);

  const handleFinish = useCallback(
    (values: ITripCreateForm) => {
      handleCancel();
      props
        .onTripCreate(values)
        .track()
        .subscribe(() => {
          navigator("/settings");
        });
    },
    [props.onTripCreate]
  );

  return (
    <Modal
      title="Create trip"
      open={props.isTripCreateModalOpen}
      onCancel={handleCancel}
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
          locations={selectedLocation ? [[selectedLocation]] : undefined}
        />
      </Form>
    </Modal>
  );
};

export default TripCreateView;
