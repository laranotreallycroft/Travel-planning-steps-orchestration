import { Form, Steps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IItinerarySettings } from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import { ITrackableAction } from "../../../../service/util/trackAction";
import { IGeosearchPayloadWithId } from "../../../common/map/MapElement";
import ItinerarySettingsView from "./ItinerarySettingsView";
import ItineraryStopsView from "./ItineraryStopsView";

export interface IItineraryCreateViewOwnProps {
  trip: ITrip;
  onItineraryCreate: (
    itineraryRoutePayload: IItineraryRoutingForm
  ) => ITrackableAction;
}

export interface IItineraryRoutingForm {
  locations: IGeosearchPayloadWithId[];
  settings: IItinerarySettings;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (
  props: IItineraryCreateViewProps
) => {
  const [form] = Form.useForm<IItineraryRoutingForm>();
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
    props
      .onItineraryCreate(form.getFieldsValue(true))
      .track()
      .subscribe({
        next: () => {
          resetFields();
        },
        error: () => {},
      });
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
        title: "Fine-tune your itinerary plan",
        content: (
          <ItinerarySettingsView
            onNextStep={form.submit}
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
