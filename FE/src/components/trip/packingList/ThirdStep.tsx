import { Col, Form } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import {
  IReminderType,
  travelRemindersColdValues,
  travelRemindersDefaultValues,
  travelRemindersWarmValues,
} from "../../../model/reminder/Reminder";
import { ITrip } from "../../../model/trip/Trip";
import Basics from "./thirdStep/Basics";
import Clothes from "./thirdStep/Clothes";
import Custom from "./thirdStep/Custom";
import Hygiene from "./thirdStep/Hygiene";
import Miscellaneous from "./thirdStep/Miscellaneous";

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
        return form.setFieldValue("reminders", warmReminders);
      }
      case IReminderType.COLD: {
        const coldReminders = {
          ...travelRemindersDefaultValues,
          ...travelRemindersColdValues,
        };
        return form.setFieldValue("reminders", coldReminders);
      }
      default:
        return form.setFieldValue("reminders", travelRemindersDefaultValues);
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
