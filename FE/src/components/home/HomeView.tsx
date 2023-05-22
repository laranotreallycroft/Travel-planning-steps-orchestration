import { Steps, Button, Col, Row, Form } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useState } from "react";
import React from "react";
import FirstStep from "./FirstStep";
import { IGeosearchPayload } from "./HomeContainer";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import {
  IReminder,
  IReminderType,
  travelRemindersDefaultValues,
} from "../../model/reminder/reminder";
import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";

export interface IHomeViewOwnProps {
  onLocationSearch: (searchValue: string) => void;
  locationArray?: IGeosearchPayload[];
}

type IHomeViewProps = IHomeViewOwnProps;

export interface IHomeViewForm {
  dateRange: RangeValue<Dayjs>;
  location: string;
  reminderType: IReminderType;
  reminders: IReminder;
}

const steps = [
  {
    title: "Where and when?",
    key: 0,
  },
  {
    title: "Which type of travel?",
    key: 1,
  },
  {
    title: "What travel reminders?",
    key: 2,
  },
];

const HomeView: React.FC<IHomeViewProps> = (props: IHomeViewProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm<IHomeViewForm>();

  const nextStep = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleFinish = useCallback((values: IHomeViewForm) => {
    //console.log(values.dateRange?.[0]?.format("YYYY-MM-DD HH:mm:ss"));
    //console.log(values.dateRange?.[1]?.format("YYYY-MM-DD HH:mm:ss"));
    //console.log(JSON.parse(values.location));
    //console.log(values.reminderType);
    //console.log(values.reminders);
  }, []);

  return (
    <div className="homeView__backgroundImage">
      <Row justify={"center"}>
        <Title className="homeView__title">
          Hi traveller, where are you heading next?
        </Title>
      </Row>

      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{
          reminderType: IReminderType.DEFAULT,
          reminders: travelRemindersDefaultValues,
        }}
      >
        <Row gutter={[0, 12]} className="homeView__formContainer margin-xl">
          <Col span={24}>
            <Steps
              current={currentStep}
              className="margin-top-md"
              items={steps}
            />
          </Col>
          <Col span={24} className="homeView__contentContainer">
            {/* ---------------------- Step 1 ---------------------- */}
            <FirstStep
              isHidden={currentStep !== 0}
              onLocationSearch={props.onLocationSearch}
              locationArray={props.locationArray}
            />
            {/* ---------------------- Step 2 ---------------------- */}
            <SecondStep isHidden={currentStep !== 1} />

            {/* ---------------------- Step 3 ---------------------- */}
            <ThirdStep isHidden={currentStep !== 2} />
          </Col>

          <Col span={24}>
            {currentStep < 2 && (
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === 2 && (
              <Button type="primary" onClick={form.submit}>
                Done
              </Button>
            )}
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prevStep}>
                Previous
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default HomeView;
