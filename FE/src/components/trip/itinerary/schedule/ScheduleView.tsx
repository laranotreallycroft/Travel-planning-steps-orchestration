import { AppointmentModel, EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import { AppointmentTooltip, Appointments, DateNavigator, DragDropProvider, EditRecurrenceMenu, Scheduler, Toolbar, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import SaveIcon from '@mui/icons-material/Save';
import { Paper } from '@mui/material';
import { Button } from 'antd';
import { mapDataToScheduler, moveRecursively } from 'components/trip/itinerary/schedule/utils';
import dayjs from 'dayjs';
import { IItinerary } from 'model/trip/itinerary/Itinerary';
import { useCallback, useEffect, useState } from 'react';
import { IScheduleElement } from 'service/business/trip/itinerary/ItineraryBusinessStore';

export interface IScheduleContainerOwnProps {
  itineraries: IItinerary[];
  isEditing: boolean;
  onItineraryScheduleUpdate: (itineraryScheduleUpdatePayload: IScheduleElement[]) => void;
}

type IScheduleContainerProps = IScheduleContainerOwnProps;

const ScheduleContainer: React.FC<IScheduleContainerProps> = (props: IScheduleContainerProps) => {
  const [schedulerData, setSchedulerData] = useState(props.itineraries.flatMap((itinerary) => mapDataToScheduler(itinerary, props.isEditing)));
  useEffect(() => {
    setSchedulerData(props.itineraries.flatMap((itinerary) => mapDataToScheduler(itinerary, props.isEditing)));
  }, [props.itineraries, props.isEditing]);

  const handleCommitChanges = useCallback(
    ({ added, changed, deleted }: any) => {
      if (changed) {
        const data = [...schedulerData];
        const changedAppointment = data.find((appointment) => {
          const changedAppointmentData = appointment.id && changed[appointment.id];
          if (changedAppointmentData) {
            appointment.startDate = changedAppointmentData.startDate;
            appointment.endDate = changedAppointmentData.endDate;
            return true;
          }
          return false;
        });

        if (changedAppointment) {
          moveRecursively(changedAppointment, data, setSchedulerData);
        }
      }
    },
    [schedulerData, moveRecursively]
  );

  const handleSave = useCallback(() => {
    const mappedPayload: IScheduleElement[] = schedulerData.map((element) => {
      const castId: string = typeof element.id === 'number' ? element.id?.toString() : element.id!;
      return {
        id: castId,
        startDate: dayjs(element.startDate).toISOString(),
        endDate: dayjs(element.endDate).toISOString(),
      };
    });
    props.onItineraryScheduleUpdate(mappedPayload);
  }, [schedulerData, props.onItineraryScheduleUpdate]);

  return (
    <Paper className="schedule__container">
      {props.isEditing && <Button onClick={handleSave} icon={<SaveIcon />} className="schedule__saveButton" />}
      {/* @ts-ignore */}
      <Scheduler data={schedulerData}>
        <ViewState defaultCurrentDate={props.itineraries[0].date} />
        <EditingState onCommitChanges={handleCommitChanges} />
        <WeekView startDayHour={8} endDayHour={20} cellDuration={15} />
        <EditRecurrenceMenu />
        <Appointments appointmentComponent={(appointmentProps: any) => <Appointments.Appointment {...appointmentProps} className={appointmentProps.data.type === 'commute' ? 'schedule__appointmentCommute' : 'schedule__appointmentDestination'} />} />
        <AppointmentTooltip showCloseButton />
        <DragDropProvider allowDrag={() => props.isEditing} allowResize={() => props.isEditing} />
        <Toolbar />
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
};

export default ScheduleContainer;
