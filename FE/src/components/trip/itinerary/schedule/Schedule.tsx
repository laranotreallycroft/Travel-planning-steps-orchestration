import {
  AppointmentModel,
  EditingState,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentTooltip,
  Appointments,
  DateNavigator,
  DragDropProvider,
  EditRecurrenceMenu,
  Scheduler,
  Toolbar,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import SaveIcon from "@mui/icons-material/Save";
import { Paper } from "@mui/material";
import { Button } from "antd";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IItinerary } from "model/trip/itinerary/Itinerary";
import { ItineraryBusinessStore } from "service/business/trip/itinerary/ItineraryBusinessStore";
import {
  mapDataToScheduler,
  moveRecursively,
} from "components/trip/itinerary/schedule/utils";
import dayjs from "dayjs";

export interface IScheduleOwnProps {
  itineraries: IItinerary[];
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
    props.itineraries.flatMap((itinerary) =>
      mapDataToScheduler(itinerary, props.isEditing)
    )
  );
  useEffect(() => {
    setSchedulerData(
      props.itineraries.flatMap((itinerary) =>
        mapDataToScheduler(itinerary, props.isEditing)
      )
    );
  }, [props.itineraries, props.isEditing]);

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
    const mappedPayload: AppointmentModel[] = schedulerData.map((element) => {
      return {
        ...element,
        startDate: dayjs(element.startDate).toISOString(),
        endDate: dayjs(element.endDate).toISOString(),
      };
    });
    props.itineraryScheduleUpdate(mappedPayload);
  }, [schedulerData]);

  return (
    <React.Fragment>
      <Paper className="schedule__container">
        {props.isEditing && (
          <Button
            onClick={handleSave}
            icon={<SaveIcon />}
            className="schedule__saveButton"
          />
        )}
        {/* @ts-ignore */}
        <Scheduler data={schedulerData}>
          <ViewState defaultCurrentDate={props.itineraries[0].date} />
          <EditingState onCommitChanges={handleCommitChanges} />
          <WeekView startDayHour={8} endDayHour={20} cellDuration={15} />
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
          <AppointmentTooltip showCloseButton />
          <DragDropProvider
            allowDrag={() => props.isEditing}
            allowResize={() => props.isEditing}
          />
          <Toolbar />
          <DateNavigator />
        </Scheduler>
      </Paper>
    </React.Fragment>
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
