import { Col, Form, Modal, Row, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IGeosearchPayload } from "../../../common/map/MapElement";
import SightseeingStopsContainer from "./SightseeingStopsContainer";
import WeatherContainer from "../../weather/WeatherContainer";

export interface ISightseeingCreateViewOwnProps {
  trip: ITrip;
  isSightseeingCreateModalOpen: boolean;
  onSightseeingCreateModalClose: () => void;
}

export interface ISightseeingCreateForm {
  locations: IGeosearchPayload[];
}

type ISightseeingCreateViewProps = ISightseeingCreateViewOwnProps;

const SightseeingCreateView: React.FC<ISightseeingCreateViewProps> = (
  props: ISightseeingCreateViewProps
) => {
  const [form] = Form.useForm<ISightseeingCreateForm>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  //TODO other logic
  const handleFinish = (values: ISightseeingCreateForm) => {
    console.log(form.getFieldsValue(true));
  };

  const handleModalClose = () => {
    setCurrentStep(0);
    form.resetFields();
    props.onSightseeingCreateModalClose();
  };

  const steps = useMemo(
    () => [
      {
        title: "Select your stops",
        content: <SightseeingStopsContainer onNextStep={handleNextStep} />,
      },
      {
        title: "Select your stops",
        content: <WeatherContainer />,
      },
      {
        title: "Last",
        content: "Last-content",
      },
    ],
    []
  );

  const items = useMemo(
    () => steps.map((item) => ({ key: item.title, title: item.title })),
    [steps]
  );

  return (
    <Modal
      title="Create trip"
      open={props.isSightseeingCreateModalOpen}
      onCancel={handleModalClose}
      onOk={form.submit}
      className="sightseeingCreateView__modal"
    >
      <Form<ISightseeingCreateForm> form={form} onFinish={handleFinish}>
        <Steps current={currentStep} items={items} />
        <Row justify={"end"} className="fullHeight">
          <Col span={24}>{steps[currentStep].content}</Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SightseeingCreateView;
