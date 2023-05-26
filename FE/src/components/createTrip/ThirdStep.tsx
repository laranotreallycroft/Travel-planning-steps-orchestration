import { Col, Form } from "antd";
import Title from "antd/es/typography/Title";
import Basics from "./thirdStep/Basics";
import Miscellaneous from "./thirdStep/Miscellaneous";
import Clothes from "./thirdStep/Clothes";
import Hygiene from "./thirdStep/Hygiene";
import { useEffect } from "react";
import {
  IReminderType,
  travelRemindersColdValues,
  travelRemindersDefaultValues,
  travelRemindersWarmValues,
} from "../../model/reminder/Reminder";
import Custom from "./thirdStep/Custom";
import { ITrip } from "../../model/trip/Trip";

export interface IThirdStepOwnProps {
  isHidden: boolean;
}
type IThirdStepProps = IThirdStepOwnProps;

const ThirdStep: React.FC<IThirdStepProps> = (props: IThirdStepProps) => {
  const form = Form.useFormInstance<ITrip>();
  const reminderType = Form.useWatch<IReminderType>("reminderType", form);

  useEffect(() => {
    switch (reminderType) {
      case IReminderType.WARM: {
        const warmReminders = {
          ...travelRemindersDefaultValues,
          ...travelRemindersWarmValues,
        };
        return form.setFieldsValue({
          reminders: warmReminders,
        });
      }
      case IReminderType.COLD: {
        const coldReminders = {
          ...travelRemindersDefaultValues,
          ...travelRemindersColdValues,
        };
        return form.setFieldsValue({
          reminders: coldReminders,
        });
      }
      default:
        return form.setFieldsValue({
          reminders: travelRemindersDefaultValues,
        });
    }
  }, [reminderType]);

  return (
    <Col className="fullHeight fullWidth" hidden={props.isHidden}>
      <Title level={2} className="font-neutral" hidden={props.isHidden}>
        Choose your reminders
      </Title>

      <Custom isHidden={props.isHidden} />

      <Basics isHidden={props.isHidden} />
      <Miscellaneous isHidden={props.isHidden} />
      <Clothes isHidden={props.isHidden} />
      <Hygiene isHidden={props.isHidden} />
    </Col>
  );
};

export default ThirdStep;
