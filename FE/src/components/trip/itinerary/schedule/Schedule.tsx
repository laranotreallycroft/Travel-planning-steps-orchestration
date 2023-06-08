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
  SchedulerProps,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as React from "react";
import { useEffect, useState } from "react";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import { mapInitalDataToScheduler, moveRecursively } from "./utils";
import { Paper } from "@mui/material";

export interface IScheduleOwnProps {
  itinerary: IItinerary;
}

type IScheduleProps = IScheduleOwnProps;

const Schedule: React.FC<IScheduleProps> = (props: IScheduleProps) => {
  const [schedulerData, setSchedulerData] = useState(
    mapInitalDataToScheduler(props.itinerary)
  );

  useEffect(() => {
    setSchedulerData(mapInitalDataToScheduler(props.itinerary));
  }, [props.itinerary]);

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

            const commuteElement = data.find(
              (item) => item.id === String(appointment.id).slice(0, -1) + "C"
            )!;
            const calcCommuteTime = new Date(
              // @ts-ignore
              commuteElement.startDate.getTime() +
                changed[appointment.id!].startDate.getTime() -
                // @ts-ignore
                commuteElement.endDate.getTime()
            );
            commuteElement.startDate = calcCommuteTime;
            commuteElement.endDate = changed[appointment.id!].startDate;
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

        <DragDropProvider
          allowDrag={(appointmentData) => appointmentData.allowDrag}
          allowResize={(appointmentData) => appointmentData.allowDrag}
          draftAppointmentComponent={(props: any) => {
            const commute = schedulerData.find(
              (item) => item.id === props.data.id.slice(0, -1) + "C"
            )!;
            const calcCommuteTime = new Date(
              // @ts-ignore
              commute.startDate.getTime() +
                props.data.startDate.getTime() -
                // @ts-ignore
                commute.endDate.getTime()
            );
            return (
              <div className="schedule__dragContainer">
                <Appointments.Appointment
                  {...props}
                  className="schedule__appointmentCommute"
                >
                  <div className="schedule__labelContainer">
                    <div className="bold">{commute.title}</div>
                    <div>
                      {
                        // @ts-ignore
                        calcCommuteTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) +
                          " - " +
                          props.data.startDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                      }
                    </div>
                  </div>
                </Appointments.Appointment>
                <Appointments.Appointment
                  {...props}
                  className="schedule__appointmentDestination"
                >
                  <div className="schedule__labelContainer">
                    <div className="bold">{props.data.title}</div>
                    <div>
                      {props.data.startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) +
                        " - " +
                        props.data.endDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
                  </div>
                </Appointments.Appointment>
              </div>
            );
          }}
        />
      </Scheduler>
    </Paper>
  );
};

export default Schedule;
