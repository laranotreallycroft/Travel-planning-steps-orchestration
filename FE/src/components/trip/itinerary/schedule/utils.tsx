import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";

export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
};

export const mapInitalDataToScheduler = (itinerary: IItinerary) => {
  let currentTime = 480;
  const commuteData: AppointmentModel[] = [];
  const destinationData: AppointmentModel[] = [];

  itinerary.itineraryElements.forEach((element, index) => {
    const commute = {
      id: element.id + "C",
      startDate: new Date(itinerary.date + "T" + formatMinutes(currentTime)),
      endDate: new Date(
        itinerary.date +
          "T" +
          formatMinutes(currentTime + element.travelDuration)
      ),
      title: "Commute to " + element.label,
      type: "commute",
      allowDrag: false,
    };
    currentTime += element.travelDuration;

    const destination = {
      id: element.id + "D",
      startDate: new Date(itinerary.date + "T" + formatMinutes(currentTime)),
      endDate: new Date(
        itinerary.date +
          "T" +
          //TODO REAL TIME INSTEAD OF ONE HOUR SPENT
          formatMinutes(currentTime + 60)
      ),
      title: element.label,
      type: "destination",
      allowDrag: true,
    };

    currentTime += 60;
    commuteData[index] = commute;
    destinationData[index] = destination;
  });

  commuteData.shift();
  destinationData.shift();
  destinationData.pop();
  return [...destinationData, ...commuteData];
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
    if (changed.id !== appointment.id)
      if (endDate > appointment.startDate && endDate < appointment.endDate!) {
        //@ts-ignore
        const offset = new Date(endDate - appointment.startDate);
        appointment.endDate = new Date(
          //@ts-ignore
          appointment.endDate.getTime() + offset.getTime()
        );
        appointment.startDate = new Date(
          //@ts-ignore
          appointment.startDate.getTime() + offset.getTime()
        );
        _moveRecursively(appointment, data);
      } else if (
        startDate >= appointment.startDate &&
        startDate < appointment.endDate!
      ) {
        //@ts-ignore
        const offset = new Date(appointment.endDate - startDate);

        appointment.endDate = new Date(
          //@ts-ignore
          appointment.endDate.getTime() - offset.getTime()
        );
        appointment.startDate = new Date(
          //@ts-ignore
          appointment.startDate.getTime() - offset.getTime()
        );
        _moveRecursively(appointment, data);
      } else if (
        startDate <= appointment.startDate &&
        endDate >= appointment.endDate!
      ) {
        //@ts-ignore
        const offset = new Date(endDate - appointment.startDate);

        appointment.endDate = new Date(
          //@ts-ignore
          appointment.endDate.getTime() + offset.getTime()
        );
        appointment.startDate = new Date(
          //@ts-ignore
          appointment.startDate.getTime() + offset.getTime()
        );
        _moveRecursively(appointment, data);
      }
  });
};
