import { Form, Modal, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IItineraryPayload } from "../../../../service/business/itinerary/ItineraryBusinessStore";
import ItinerarySettingsView from "./ItinerarySettingsView";
import ItineraryStopsView from "./ItineraryStopsView";

export interface IItineraryCreateViewOwnProps {
  trip: ITrip;
  isItineraryCreateModalOpen: boolean;
  onItineraryCreateModalClose: () => void;
  onItineraryCreate: (itineraryRoutePayload: IItineraryPayload) => void;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (
  props: IItineraryCreateViewProps
) => {
  const [form] = Form.useForm<IItineraryPayload>();
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
  const handleFinish = (values: IItineraryPayload) => {
    props.onItineraryCreate(form.getFieldsValue(true));
  };

  const handleModalClose = () => {
    setCurrentStep(0);
    form.resetFields();
    props.onItineraryCreateModalClose();
  };

  const steps = useMemo(
    () => [
      {
        title: "Select your stops",
        content: <ItineraryStopsView onNextStep={handleNextStep} />,
      },
      {
        title: "Fine-tune your itinerary plan",
        content: (
          <ItinerarySettingsView
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
    <Form<IItineraryPayload>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        locations: [{ ...props.trip.location, label: props.trip.name }],
        routeOptions: { optimize: false, carTravel: false },
      }}
    >
      <Modal
        title="Create trip"
        open={props.isItineraryCreateModalOpen}
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

export default ItineraryCreateView;
