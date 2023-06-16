import { Form, Steps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IItineraryForm } from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import ItineraryDurationView from "./ItineraryDurationView";
import ItineraryStopsView from "./ItineraryStopsView";

export interface IItineraryCreateViewOwnProps {
  trip: ITrip;
  onSubmit: (itineraryRoutePayload: IItineraryForm) => void;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (
  props: IItineraryCreateViewProps
) => {
  const [form] = Form.useForm<IItineraryForm>();
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
    props.onSubmit(form.getFieldsValue(true));
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
    <Form<IItineraryForm>
      form={form}
      onFinish={handleFinish}
      initialValues={
        props.trip.itineraries
          ? {
              locations: props.trip.itineraries.flatMap((itinerary) =>
                itinerary.itineraryElements.map((itineraryElement) => {
                  return {
                    id: itineraryElement.id,
                    label: itineraryElement.label,
                    x: itineraryElement.location.x,
                    y: itineraryElement.location.y,
                    duration: itineraryElement.duration,
                  };
                })
              ),
              routeOptions: { optimize: false, vehicleProfile: "driving-car" },
            }
          : {
              locations: [],
              routeOptions: { optimize: false, vehicleProfile: "driving-car" },
            }
      }
      className="flex-container"
    >
      <Steps
        current={currentStep}
        items={items}
        className={
          props.trip.itineraries && props.trip.itineraries.length > 0
            ? "itineraryCreateView__steps"
            : ""
        }
      />
      {steps[currentStep].content}
    </Form>
  );
};

export default ItineraryCreateView;
