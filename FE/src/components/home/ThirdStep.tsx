import { Col, Form } from "antd";
import Title from "antd/es/typography/Title";
import Basics from "./thirdStep/Basics";
import Miscellaneous from "./thirdStep/Miscellaneous";
import Clothes from "./thirdStep/Clothes";
import Hygiene from "./thirdStep/Hygiene";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { IHomeViewForm } from "./HomeView";
import {
  IReminderType,
  travelRemindersColdValues,
  travelRemindersColdValuesStringArray,
  travelRemindersDefaultValues,
  travelRemindersDefaultValuesStringArray,
  travelRemindersWarmValues,
  travelRemindersWarmValuesStringArray,
} from "../../model/reminder/reminder";
import Custom from "./thirdStep/Custom";

export interface IThirdStepOwnProps {
  isHidden: boolean;
}
type IThirdStepProps = IThirdStepOwnProps;

export interface TableDataType {
  key: React.Key;
  title: string;
  group: string;
  groupTitle: string;
  subgroup: string;
  subgroupTitle: string;
  dataIndex: string;
}

const columns: ColumnsType<TableDataType> = [
  {
    title: "Item",
    dataIndex: "title",
  },
  {
    title: "Subgroup",
    dataIndex: "subgroupTitle",
  },
];
const ThirdStep: React.FC<IThirdStepProps> = (props: IThirdStepProps) => {
  const form = Form.useFormInstance<IHomeViewForm>();
  const [remindersMapped, setRemindersMapped] = useState<React.Key[]>([]);
  const reminderType = Form.useWatch<IReminderType>("reminderType", form);

  useEffect(() => {
    switch (reminderType) {
      case IReminderType.WARM: {
        setRemindersMapped([
          ...travelRemindersDefaultValuesStringArray,
          ...travelRemindersWarmValuesStringArray,
        ]);
        return form.setFieldsValue({
          reminders: travelRemindersWarmValues,
        });
      }
      case IReminderType.COLD: {
        setRemindersMapped([
          ...travelRemindersDefaultValuesStringArray,
          ...travelRemindersColdValuesStringArray,
        ]);
        return form.setFieldsValue({
          reminders: travelRemindersColdValues,
        });
      }
      default:
        setRemindersMapped(travelRemindersDefaultValuesStringArray);
        return form.setFieldsValue({
          reminders: travelRemindersDefaultValues,
        });
    }
  }, [reminderType]);

  const handleSelect = useCallback(
    (reminder: TableDataType, selected: boolean) => {
      form.setFieldValue(
        ["reminders", reminder.group, reminder.subgroup, reminder.key],
        selected
      );
      selected
        ? setRemindersMapped([...remindersMapped, reminder.key])
        : setRemindersMapped(
            remindersMapped.filter((value) => value !== reminder.key)
          );
    },
    [remindersMapped]
  );

  return (
    <Col className="fullHeight fullWidth" hidden={props.isHidden}>
      <Title level={2} className="font-neutral" hidden={props.isHidden}>
        Choose your reminders
      </Title>

      <Custom
        isHidden={props.isHidden}
        columns={columns}
        selectedRowKeys={remindersMapped}
        onSelect={handleSelect}
      ></Custom>

      <Basics
        isHidden={props.isHidden}
        columns={columns}
        selectedRowKeys={remindersMapped}
        onSelect={handleSelect}
      ></Basics>
      <Miscellaneous
        isHidden={props.isHidden}
        columns={columns}
        selectedRowKeys={remindersMapped}
        onSelect={handleSelect}
      ></Miscellaneous>
      <Clothes
        isHidden={props.isHidden}
        columns={columns}
        selectedRowKeys={remindersMapped}
        onSelect={handleSelect}
      ></Clothes>
      <Hygiene
        isHidden={props.isHidden}
        columns={columns}
        selectedRowKeys={remindersMapped}
        onSelect={handleSelect}
      ></Hygiene>
    </Col>
  );
};

export default ThirdStep;
