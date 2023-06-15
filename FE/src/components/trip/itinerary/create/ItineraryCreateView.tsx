import { Form, Steps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IItineraryCreatePayload } from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import ItineraryStopsView from "./ItineraryStopsView";
import ItineraryDurationView from "./ItineraryDurationView";

export interface IItineraryCreateViewOwnProps {
  trip: ITrip;
  onItineraryCreate: (itineraryRoutePayload: IItineraryCreatePayload) => void;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (
  props: IItineraryCreateViewProps
) => {
  const [form] = Form.useForm<IItineraryCreatePayload>();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    resetFields();
  }, [props.trip]);

  const handleNextStep = useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1);
  }, []);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep((currentStep) => currentStep - 1);
  }, []);

  const handleFinish = useCallback(() => {
    props.onItineraryCreate(form.getFieldsValue(true));
  }, []);

  const resetFields = useCallback(() => {
    setCurrentStep(0);
    form.resetFields();
  }, []);

  const steps = useMemo(
    () => [
      {
        title: "Select your stops",
        content: (
          <ItineraryStopsView onNextStep={handleNextStep} trip={props.trip} />
        ),
      },
      {
        title: "Decide your visit duration",
        content: (
          <ItineraryDurationView
            onPreviousStep={handlePreviousStep}
            onNextStep={handleFinish}
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
    <Form<IItineraryCreatePayload>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        locations: [],
        routeOptions: { optimize: false, vehicleProfile: "driving-car" },
      }}
      className="fullSize"
    >
      <Steps current={currentStep} items={items} />
      {steps[currentStep].content}
    </Form>
  );
};

export default ItineraryCreateView;
