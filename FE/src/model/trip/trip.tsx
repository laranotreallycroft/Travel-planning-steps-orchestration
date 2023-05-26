import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";
import { IReminder, IReminderType } from "../reminder/Reminder";

export interface ITrip {
  id: string;
  dateRange?: RangeValue<Dayjs>;
  location?: string;
  reminderType?: IReminderType;
  reminders?: IReminder;
}

export interface ITripCreatePayload {
  userId: number;
  dateFrom: string;
  dateTo: string;
  location: string;
}
