import {
  Button,
  Col,
  Form,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
} from "antd";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { packingListsPresets } from "../../../../model/trip/const/packingList";
import { CopyOutlined } from "@ant-design/icons";
export interface IPackingListCopyForm {
  packingListIds: number[];
}
export interface IPackingListCopyViewOwnProps {
  trip: ITrip;
  userTrips?: ITrip[];
  onPackingListCopy: (packingListCopyPayload: IPackingListCopyForm) => void;
}
type IPackingListCopyViewProps = IPackingListCopyViewOwnProps;

const PackingListCopyView: React.FC<IPackingListCopyViewProps> = (
  props: IPackingListCopyViewProps
) => {
  const [form] = Form.useForm<IPackingListCopyForm>();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState<boolean>(false);
  const [isPresetView, setIsPresetView] = useState<boolean>(false);
  const selectedTripId = Form.useWatch("tripId", form);

  const toggleCopyModal = useCallback(() => {
    setIsCopyModalOpen((prevState) => !prevState);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsCopyModalOpen(false);
    form.resetFields();
  }, []);

  const handleViewChange = useCallback((e: RadioChangeEvent) => {
    setIsPresetView(e.target.value);
    form.setFieldValue("tripId", undefined);
  }, []);

  const handleFinish = useCallback(
    (values: IPackingListCopyForm) => {
      props.onPackingListCopy(values);
      handleModalClose();
    },
    [props.onPackingListCopy]
  );

  return (
    <Col>
      <Button onClick={toggleCopyModal} type="primary" icon={<CopyOutlined />}>
        Copy
      </Button>

      <Modal
        title="Copy from another trip"
        open={isCopyModalOpen}
        onCancel={handleModalClose}
        onOk={form.submit}
      >
        <Radio.Group
          onChange={handleViewChange}
          defaultValue={false}
          className="margin-bottom-md packingListCopyView__radioButton"
        >
          <Radio.Button value={false}>Your trips</Radio.Button>
          <Radio.Button value={true}>Presets</Radio.Button>
        </Radio.Group>
        <Form<IPackingListCopyForm>
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Form.Item
            name={"tripId"}
            label={isPresetView ? "Preset name" : "Trip name"}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select
              placeholder={isPresetView ? "Preset" : "Trip"}
              options={
                isPresetView
                  ? packingListsPresets
                  : props.userTrips
                      ?.filter((trip) => trip.id !== props.trip.id)
                      .map((trip) => {
                        return {
                          key: trip.id,
                          value: trip.id,
                          label: trip.label,
                        };
                      })
              }
            />
          </Form.Item>

          <Form.Item
            name={"packingListIds"}
            label={"Packing lists"}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select
              placeholder={"Trip packing list"}
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase())! >= 0
              }
              options={
                isPresetView
                  ? packingListsPresets?.find(
                      (preset) => preset.key === selectedTripId
                    )?.packingLists
                  : props.userTrips
                      ?.find((trip) => trip.id === selectedTripId)
                      ?.packingLists?.map((packingList) => {
                        return {
                          key: packingList.id,
                          value: packingList.id,
                          label: packingList.label,
                        };
                      })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
};

export default PackingListCopyView;
