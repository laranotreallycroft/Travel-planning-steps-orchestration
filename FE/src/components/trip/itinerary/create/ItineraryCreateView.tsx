import { Form, Steps } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import ItineraryDurationView from 'components/trip/itinerary/create/ItineraryDurationView';
import ItineraryStopsView from 'components/trip/itinerary/create/ItineraryStopsView';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IItineraryForm } from 'service/business/trip/itinerary/ItineraryBusinessStore';

export interface IItineraryCreateViewOwnProps {
  values?: Partial<IItineraryForm>;
  initialValues?: Partial<IItineraryForm>;
  onSubmit: (itineraryRoutePayload: IItineraryForm) => void;
}

type IItineraryCreateViewProps = IItineraryCreateViewOwnProps & IWithLocalizeOwnProps;

const ItineraryCreateView: React.FC<IItineraryCreateViewProps> = (props: IItineraryCreateViewProps) => {
  const [form] = Form.useForm<IItineraryForm>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (props.values) {
      form.setFieldsValue(props.values);
    } else form.resetFields();
  }, [props.values]);

  const handleNextStep = useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1);
  }, []);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep((currentStep) => currentStep - 1);
  }, []);

  const handleFinish = useCallback(() => {
    props.onSubmit(form.getFieldsValue(true));
  }, []);

  const steps = useMemo(
    () => [
      {
        title: props.translate('ITINERARY_CREATE_VIEW.STEP_ONE'),
        content: <ItineraryStopsView onNextStep={handleNextStep} />,
      },
      {
        title: props.translate('ITINERARY_CREATE_VIEW.STEP_TWO'),
        content: <ItineraryDurationView onPreviousStep={handlePreviousStep} onNextStep={handleFinish} />,
      },
    ],
    [handleNextStep, handlePreviousStep]
  );

  const items = useMemo(() => steps.map((item) => ({ key: item.title, title: item.title })), [steps]);

  return (
    <Form<IItineraryForm> form={form} onFinish={handleFinish} initialValues={props.initialValues}>
      <Steps current={currentStep} items={items} />
      {steps[currentStep].content}
    </Form>
  );
};

export default withLocalize<IItineraryCreateViewOwnProps>(ItineraryCreateView as any);
