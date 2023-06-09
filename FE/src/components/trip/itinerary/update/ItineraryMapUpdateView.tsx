import { Form, Steps } from "antd";
import { useMemo, useState } from "react";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import { ITrackableAction } from "../../../../service/util/trackAction";
import { IItineraryRoutingForm } from "../create/ItineraryCreateView";
import ItinerarySettingsView from "../create/ItinerarySettingsView";
import ItineraryStopsView from "../create/ItineraryStopsView";
import { IItineraryUpdatePayload } from "../../../../service/business/itinerary/ItineraryBusinessStore";

export interface IItineraryMapUpdateViewOwnProps {
  itinerary: IItinerary;
  onItineraryUpdate: (values: IItineraryUpdatePayload) => ITrackableAction;
}

type IItineraryMapUpdateViewProps = IItineraryMapUpdateViewOwnProps;

const ItineraryMapUpdateView: React.FC<IItineraryMapUpdateViewProps> = (
  props: IItineraryMapUpdateViewProps
) => {
  const [form] = Form.useForm<IItineraryRoutingForm>();
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

  const handleFinish = () => {
    props
      .onItineraryUpdate(form.getFieldsValue(true))
      .track()
      .subscribe({
        next: () => {
          handleModalClose();
        },
        error: () => {},
      });
  };

  const handleModalClose = () => {
    setCurrentStep(0);
    form.resetFields();
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
    <Form<IItineraryRoutingForm>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        locations: props.itinerary.itineraryElements.map((element) => {
          return {
            id: element.id,
            label: element.label,
            x: element.location.x,
            y: element.location.y,
          };
        }),
        routeOptions: { optimize: false, vehicleProfile: "driving-car" },
      }}
      className="fullWidth itineraryMapUpdateView__form"
    >
      <Steps
        current={currentStep}
        items={items}
        className="itineraryMapUpdateView__steps"
      />
      {steps[currentStep].content}
    </Form>
  );
};

export default ItineraryMapUpdateView;
