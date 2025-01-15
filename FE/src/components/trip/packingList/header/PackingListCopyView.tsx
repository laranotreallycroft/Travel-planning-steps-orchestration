import { CopyOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Radio, RadioChangeEvent, Row, Select } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { packingListsPresets } from 'model/trip/const/packingList';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useState } from 'react';

export interface IPackingListCopyForm {
  tripId: string;
  packingListIds: string[];
}

export interface IPackingListCopyViewOwnProps {
  tripList: ITrip[];
  onPackingListCopy: (packingListIds: string[]) => void;
}

type IPackingListCopyViewProps = IPackingListCopyViewOwnProps & IWithLocalizeOwnProps;

const PackingListCopyView: React.FC<IPackingListCopyViewProps> = (props: IPackingListCopyViewProps) => {
  const [form] = Form.useForm<IPackingListCopyForm>();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState<boolean>(false);
  const [isPresetView, setIsPresetView] = useState<boolean>(false);
  const selectedTripId = Form.useWatch('tripId', form);

  const toggleCopyModal = useCallback(() => {
    setIsCopyModalOpen((prevState) => !prevState);
  }, []);

  const handleModalClose = useCallback(() => {
    toggleCopyModal();
    form.resetFields();
  }, [toggleCopyModal]);

  const handleViewChange = useCallback((e: RadioChangeEvent) => {
    setIsPresetView(e.target.value);
    form.setFieldValue('tripId', undefined);
  }, []);

  const handleFinish = useCallback(
    (values: IPackingListCopyForm) => {
      props.onPackingListCopy(values.packingListIds);
      handleModalClose();
    },
    [props.onPackingListCopy, handleModalClose]
  );

  return (
    <React.Fragment>
      <Col>
        <Button onClick={toggleCopyModal} type="primary" icon={<CopyOutlined />}>
          {props.translate('PACKING_LIST_COPY_VIEW.BUTTON_LABEL')}
        </Button>
      </Col>
      <Modal title={props.translate('PACKING_LIST_COPY_VIEW.MODAL_TITLE')} open={isCopyModalOpen} onCancel={handleModalClose} onOk={form.submit}>
        <Row justify={'end'} className="margin-bottom-lg">
          <Radio.Group onChange={handleViewChange} defaultValue={false}>
            <Radio.Button value={false}>{props.translate('PACKING_LIST_COPY_VIEW.YOUR_TRIPS_TAB')}</Radio.Button>
            <Radio.Button value={true}>{props.translate('PACKING_LIST_COPY_VIEW.PRESETS_TAB')}</Radio.Button>
          </Radio.Group>
        </Row>

        <Form<IPackingListCopyForm> form={form} onFinish={handleFinish} requiredMark={false}>
          <Form.Item
            name={'tripId'}
            label={isPresetView ? props.translate('PACKING_LIST_COPY_VIEW.FORM.PRESET_LABEL') : props.translate('PACKING_LIST_COPY_VIEW.FORM.TRIP_LABEL')}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Select
              placeholder={isPresetView ? props.translate('PACKING_LIST_COPY_VIEW.FORM.PRESET_PLACEHOLDER') : props.translate('PACKING_LIST_COPY_VIEW.FORM.TRIP_PLACEHOLDER')}
              options={
                isPresetView
                  ? packingListsPresets.map((trip) => {
                      return {
                        key: trip.value,
                        value: trip.value,
                        label: trip.label,
                      };
                    })
                  : props.tripList?.map((trip) => {
                      return {
                        key: trip.id,
                        value: trip.id,
                        label: trip.label,
                      };
                    })
              }
            ></Select>
          </Form.Item>

          <Form.Item
            name={'packingListIds'}
            label={props.translate('PACKING_LIST_COPY_VIEW.FORM.PACKING_LIST_LABEL')}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Select
              placeholder={props.translate('PACKING_LIST_COPY_VIEW.FORM.PACKING_LIST_PLACEHOLDER')}
              mode="multiple"
              allowClear
              filterOption={(input, option) => option?.label.toLowerCase().indexOf(input.toLowerCase())! >= 0}
              options={
                isPresetView
                  ? packingListsPresets.find((preset) => preset.value === selectedTripId)?.packingLists
                  : props.tripList
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
    </React.Fragment>
  );
};

export default withLocalize<IPackingListCopyViewOwnProps>(PackingListCopyView as any);
