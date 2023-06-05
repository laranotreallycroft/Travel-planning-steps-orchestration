import { Form, Modal, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IGeosearchPayload } from "../../../common/map/MapElement";
import SightseeingSettingsView from "./SightseeingSettingsView";
import SightseeingStopsContainer from "./SightseeingStopsContainer";

export interface ISightseeingCreateViewOwnProps {
  trip: ITrip;
  isSightseeingCreateModalOpen: boolean;
  onSightseeingCreateModalClose: () => void;
}

export interface ISightseeingCreateForm {
  locations: IGeosearchPayload[];
  routeOptions: {
    optimize: boolean;
    carTravel: boolean;
  };
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

  const handlePreviousStep = () => {
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
        title: "Fine-tune your sightseeing plan",
        content: (
          <SightseeingSettingsView
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
          />
        ),
      },
    ],
    [handleNextStep, handlePreviousStep]
  );

  const items = useMemo(
    () => steps.map((item) => ({ key: item.title, title: item.title })),
    [steps]
  );

  return (
    <Form<ISightseeingCreateForm> form={form} onFinish={handleFinish}>
      <Modal
        title="Create trip"
        open={props.isSightseeingCreateModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={1200}
        bodyStyle={{ height: 600, display: "flex", flexDirection: "column" }}
      >
        <Steps current={currentStep} items={items} />
        {steps[currentStep].content}
      </Modal>
    </Form>
  );
};

export default SightseeingCreateView;
