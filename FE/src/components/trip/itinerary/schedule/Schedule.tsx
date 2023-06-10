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
import SaveIcon from "@mui/icons-material/Save";
import { Paper } from "@mui/material";
import { Button } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IItinerary } from "../../../../model/trip/itinerary/Itinerary";
import { ItineraryBusinessStore } from "../../../../service/business/trip/itinerary/ItineraryBusinessStore";
import { mapDataToScheduler, moveRecursively } from "./utils";

export interface IScheduleOwnProps {
  itinerary: IItinerary;
  isEditing: boolean;
}

export interface IScheduleStateProps {}
export interface IScheduleDispatchProps {
  itineraryScheduleUpdate: (
    itineraryScheduleUpdatePayload: AppointmentModel[]
  ) => void;
}
type IScheduleProps = IScheduleOwnProps &
  IScheduleStateProps &
  IScheduleDispatchProps;

const Schedule: React.FC<IScheduleProps> = (props: IScheduleProps) => {
  const [schedulerData, setSchedulerData] = useState(
    mapDataToScheduler(props.itinerary, props.isEditing)
  );
  useEffect(() => {
    setSchedulerData(mapDataToScheduler(props.itinerary, props.isEditing));
  }, [props.itinerary, props.isEditing]);

  const handleCommitChanges = useCallback(
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

  const handleSave = useCallback(() => {
    const mappedPayload = schedulerData.map((element) => {
      return {
        ...element,
        startDate: dayjs(element.startDate).toISOString(),
        endDate: dayjs(element.endDate).toISOString(),
      };
    });

    props.itineraryScheduleUpdate(mappedPayload);
  }, [schedulerData]);

  return (
    <Paper>
      {props.isEditing && (
        <Button
          onClick={handleSave}
          icon={<SaveIcon />}
          className={"schedule__saveButton"}
        />
      )}
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
          allowDrag={() => false}
          allowResize={() => props.isEditing}
        />
      </Scheduler>
    </Paper>
  );
};

const mapStateToProps = (state: any): IScheduleStateProps => ({});

const mapDispatchToProps = (dispatch: any): IScheduleDispatchProps => ({
  itineraryScheduleUpdate: (
    itineraryScheduleUpdatePayload: AppointmentModel[]
  ) =>
    dispatch(
      ItineraryBusinessStore.actions.itineraryScheduleUpdate(
        itineraryScheduleUpdatePayload
      )
    ),
});

export default connect<
  IScheduleStateProps,
  IScheduleDispatchProps,
  IScheduleOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
