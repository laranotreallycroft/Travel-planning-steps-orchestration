import { Form, Modal, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { ISightseeingRouteCreatePayload } from "../../../../service/business/sightseeing/SightseeingBusinessStore";
import SightseeingSettingsView from "./SightseeingSettingsView";
import SightseeingStopsView from "./SightseeingStopsView";

export interface ISightseeingCreateViewOwnProps {
  trip: ITrip;
  isSightseeingCreateModalOpen: boolean;
  onSightseeingCreateModalClose: () => void;
  onSightseeingCreate: (
    sightseeingRoutePayload: ISightseeingRouteCreatePayload
  ) => void;
}

type ISightseeingCreateViewProps = ISightseeingCreateViewOwnProps;

const SightseeingCreateView: React.FC<ISightseeingCreateViewProps> = (
  props: ISightseeingCreateViewProps
) => {
  const [form] = Form.useForm<ISightseeingRouteCreatePayload>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleLastStep = () => {
    form.submit();
  };
  //TODO other logic
  const handleFinish = (values: ISightseeingRouteCreatePayload) => {
    props.onSightseeingCreate(form.getFieldsValue(true));
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
        content: <SightseeingStopsView onNextStep={handleNextStep} />,
      },
      {
        title: "Fine-tune your sightseeing plan",
        content: (
          <SightseeingSettingsView
            onNextStep={handleLastStep}
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
    <Form<ISightseeingRouteCreatePayload>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        locations: [{ ...props.trip.location, label: props.trip.name }],
        routeOptions: { optimize: false, carTravel: false },
      }}
    >
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
