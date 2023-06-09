import { Form, Steps } from "antd";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
      .onItineraryCreate(form.getFieldsValue(true))
      .track()
      .subscribe({
        next: () => {
          setCurrentStep(0);
          form.resetFields();
        },
        error: () => {},
      });
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
        locations: [
          { ...props.trip.location, label: props.trip.name, id: uuidv4() },
        ],
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
