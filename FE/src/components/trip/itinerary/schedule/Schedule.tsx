import {
  AppointmentModel,
  EditingState,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  Scheduler,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import { mapInitalDataToScheduler, moveRecursively } from "./utils";

export interface IScheduleOwnProps {
  itinerary: IItinerary;
  isEditing: boolean;
}

type IScheduleProps = IScheduleOwnProps;

const Schedule: React.FC<IScheduleProps> = (props: IScheduleProps) => {
  const [schedulerData, setSchedulerData] = useState(
    mapInitalDataToScheduler(props.itinerary, props.isEditing)
  );

  useEffect(() => {
    setSchedulerData(
      mapInitalDataToScheduler(props.itinerary, props.isEditing)
    );
  }, [props.itinerary, props.isEditing]);

  const handleCommitChanges = React.useCallback(
    ({ added, changed, deleted }: any) => {
      if (changed) {
        const data = [...schedulerData];
        let changedAppointment: AppointmentModel;
        data.forEach((appointment) => {
          if (changed[appointment.id!]) {
            appointment.startDate = changed[appointment.id!].startDate;
            appointment.endDate = changed[appointment.id!].endDate;
            changedAppointment = appointment;
          }
        });

        moveRecursively(changedAppointment!, data, setSchedulerData);
      }
    },
    [schedulerData]
  );

  return (
    <Paper>
      {/* @ts-ignore */}
      <Scheduler data={schedulerData}>
        <ViewState currentDate={props.itinerary.date} />
        <EditingState onCommitChanges={handleCommitChanges} />
        <DayView startDayHour={8} endDayHour={20} />
        <EditRecurrenceMenu />
        <Appointments
          appointmentComponent={(appointmentProps: any) => (
            <Appointments.Appointment
              {...appointmentProps}
              className={
                appointmentProps.data.type === "commute"
                  ? "schedule__appointmentCommute"
                  : "schedule__appointmentDestination"
              }
            />
          )}
        />

        <DragDropProvider
          allowDrag={() => props.isEditing}
          allowResize={() => props.isEditing}
        />
      </Scheduler>
    </Paper>
  );
};

export default Schedule;
