import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import dayjs from "dayjs";

export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
};

export const mapDataToScheduler = (
  itinerary: IItinerary,
  isEditing: boolean
) => {
  const commuteData: AppointmentModel[] = [];
  const destinationData: AppointmentModel[] = [];

  itinerary.itineraryElements.forEach((element, index) => {
    const commute = {
      id: element.id + "C",
      startDate: element.commuteStartDate,
      endDate: element.commuteEndDate,
      title: "Commute to " + element.label,
      type: "commute",
    };

    const destination = {
      id: element.id + "D",
      startDate: element.startDate,
      endDate: element.endDate,
      title: element.label,
      type: "destination",
    };

    commuteData[index] = commute;
    destinationData[index] = destination;
  });

  commuteData.shift();
  destinationData.shift();
  destinationData.pop();
  if (!isEditing) return [...destinationData, ...commuteData];
  else return destinationData;
};

export const moveRecursively = (
  changed: AppointmentModel,
  data: AppointmentModel[],
  setSchedulerData: (data: AppointmentModel[]) => void
) => {
  let newData = [...data];
  _moveRecursively(changed, newData);
  setSchedulerData(newData);
};

export const _moveRecursively = (
  changed: AppointmentModel,
  data: AppointmentModel[]
) => {
  const startDate = changed.startDate!;
  const endDate = changed.endDate!;
  data.forEach((appointment) => {
    if (changed.id !== appointment.id && String(appointment.id).endsWith("D"))
      if (endDate > appointment.startDate && endDate < appointment.endDate!) {
        const offset = dayjs(endDate).diff(appointment.startDate);

        appointment.endDate = dayjs(appointment.endDate).add(offset).toDate();
        appointment.startDate = dayjs(appointment.startDate)
          .add(offset)
          .toDate();
        _moveRecursively(appointment, data);
      } else if (
        startDate >= appointment.startDate &&
        startDate < appointment.endDate!
      ) {
        const offset = dayjs(appointment.endDate).diff(startDate);

        appointment.endDate = dayjs(appointment.endDate)
          .subtract(offset)
          .toDate();
        appointment.startDate = dayjs(appointment.startDate)
          .subtract(offset)
          .toDate();
        _moveRecursively(appointment, data);
      } else if (
        startDate <= appointment.startDate &&
        endDate >= appointment.endDate!
      ) {
        const offset = dayjs(endDate).diff(appointment.startDate);

        appointment.endDate = dayjs(appointment.endDate).add(offset).toDate();
        appointment.startDate = dayjs(appointment.startDate)
          .add(offset)
          .toDate();
        _moveRecursively(appointment, data);
      }
  });
};
