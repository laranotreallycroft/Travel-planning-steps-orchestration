import {
  AppointmentModel,
  EditingState,
  IntegratedGrouping,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  Scheduler,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as React from "react";
import { useState } from "react";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import { formatMinutes } from "../../utils";

const mapToScheduler = (itinerary: IItinerary) => {
  let currentTime = 480;
  const commuteData: AppointmentModel[] = [];
  const destinationData: AppointmentModel[] = [];

  itinerary.itineraryElements.forEach((element, index) => {
    const commute = {
      id: element.id + "c",
      startDate: itinerary.date + "T" + formatMinutes(currentTime),
      endDate:
        itinerary.date +
        "T" +
        formatMinutes(currentTime + element.travelDuration),
      title: "Commute to " + element.label,
      type: "commute",
    };
    currentTime += element.travelDuration;

    const destination = {
      id: element.id + "d",
      startDate: itinerary.date + "T" + formatMinutes(currentTime),
      endDate:
        itinerary.date +
        "T" +
        //TODO REAL TIME INSTEAD OF ONE HOUR SPENT
        formatMinutes(currentTime + 60),
      title: element.label,
      type: "destination",
    };

    currentTime += 60;
    commuteData[index] = commute;
    destinationData[index] = destination;
  });

  return [...destinationData, ...commuteData];
};

export interface IScheduleOwnProps {
  itinerary: IItinerary;
}

type IScheduleProps = IScheduleOwnProps;

const Schedule: React.FC<IScheduleProps> = (props: IScheduleProps) => {
  const [schedulerData, setSchedulerData] = useState(
    mapToScheduler(props.itinerary)
  );

  const handleCommitChanges = ({ added, changed, deleted }: any) => {
    if (changed) {
      setSchedulerData(
        schedulerData.map((appointment) =>
          changed[appointment.id!]
            ? { ...appointment, ...changed[appointment.id!] }
            : appointment
        )
      );
    }
  };

  return (
    <div className="panel">
      <Scheduler data={schedulerData}>
        <ViewState currentDate={props.itinerary.date} />
        <EditingState onCommitChanges={handleCommitChanges} />
        <EditRecurrenceMenu />
        <DayView startDayHour={8} endDayHour={20} />
        <Appointments
          appointmentComponent={(props: any) => (
            <Appointments.Appointment
              {...props}
              className={
                props.data.type === "commute"
                  ? "schedule__appointmentCommute"
                  : "schedule__appointmentDestination"
              }
            />
          )}
        />

        <DragDropProvider />
      </Scheduler>
    </div>
  );
};

export default Schedule;
