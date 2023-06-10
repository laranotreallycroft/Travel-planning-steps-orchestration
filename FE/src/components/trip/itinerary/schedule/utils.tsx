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
    const appointmentStartDate = dayjs(appointment.startDate).toDate();
    const appointmentEndDate = dayjs(appointment.endDate!).toDate();

    if (changed.id !== appointment.id)
      if (endDate > appointmentStartDate && endDate < appointmentEndDate) {
        const offset = dayjs(endDate).diff(appointmentStartDate);

        appointment.endDate = dayjs(appointmentEndDate).add(offset).toDate();
        appointment.startDate = dayjs(appointmentStartDate)
          .add(offset)
          .toDate();
        _moveRecursively(appointment, data);
      } else if (
        startDate >= appointmentStartDate &&
        startDate < appointmentEndDate
      ) {
        const offset = dayjs(appointmentEndDate).diff(startDate);

        appointment.endDate = dayjs(appointmentEndDate)
          .subtract(offset)
          .toDate();
        appointment.startDate = dayjs(appointmentStartDate)
          .subtract(offset)
          .toDate();
        _moveRecursively(appointment, data);
      } else if (
        startDate <= appointmentStartDate &&
        endDate >= appointmentEndDate
      ) {
        const offset = dayjs(endDate).diff(appointmentStartDate);

        appointment.endDate = dayjs(appointmentEndDate).add(offset).toDate();
        appointment.startDate = dayjs(appointmentStartDate)
          .add(offset)
          .toDate();
        _moveRecursively(appointment, data);
      }
  });
};
