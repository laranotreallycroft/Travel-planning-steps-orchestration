import { Form, Modal, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../../model/trip/Trip";
import { IItinerarySettings } from "../../../../service/business/itinerary/ItineraryBusinessStore";
import { IGeosearchPayloadWithUUId } from "../../../common/map/MapElement";
import ItinerarySettingsView from "./ItinerarySettingsView";
import ItineraryStopsView from "./ItineraryStopsView";
import { v4 as uuidv4 } from "uuid";
import { ITrackableAction } from "../../../../service/util/trackAction";

export interface IItineraryCreateViewOwnProps {
  trip: ITrip;
  isItineraryCreateModalOpen: boolean;
  onItineraryCreateModalClose: () => void;
  onItineraryCreate: (
    itineraryRoutePayload: IItineraryCreateForm
  ) => ITrackableAction;
}

export interface IItineraryCreateForm {
  locations: IGeosearchPayloadWithUUId[];
  settings: IItinerarySettings;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (
  props: IItineraryCreateViewProps
) => {
  const [form] = Form.useForm<IItineraryCreateForm>();
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
          handleModalClose();
        },
        error: () => {},
      });
  };

  const handleModalClose = () => {
    props.onItineraryCreateModalClose();
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
    <Form<IItineraryCreateForm>
      form={form}
      onFinish={handleFinish}
      initialValues={{
        locations: [
          { ...props.trip.location, label: props.trip.name, id: uuidv4() },
        ],
        routeOptions: { optimize: false, vehicleProfile: "driving-car" },
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
