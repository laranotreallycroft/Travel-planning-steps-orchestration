import { IReminder, IReminderType } from "../reminder/Reminder";
import { ICoordinates } from "../geometry/Coordinates";

export interface ITrip {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
  reminderType?: IReminderType;
  reminders?: IReminder;
}

export interface ITripCreatePayload {
  userId: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  location: ICoordinates;
}
