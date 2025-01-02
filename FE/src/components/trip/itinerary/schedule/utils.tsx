import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { IItinerary } from 'model/trip/itinerary/Itinerary';
import dayjs from 'dayjs';
import LocalizeService from 'service/util/localize/LocalizeService';

export const mapDataToScheduler = (itinerary: IItinerary, isEditing: boolean): AppointmentModel[] => {
  const appointments = itinerary.itineraryElements.flatMap((element) => {
    const commute: AppointmentModel = {
      id: `${element.id}C`,
      startDate: element.commuteStartDate,
      endDate: element.commuteEndDate,
      title: `${LocalizeService.translate('SCHEDULE_VIEW.COMMUTE_LABEL')}${element.location.label}`,
      type: 'commute',
    };

    const destination: AppointmentModel = {
      id: `${element.id}D`,
      startDate: element.startDate,
      endDate: element.endDate,
      title: element.location.label,
      type: 'destination',
    };

    return isEditing ? [destination] : [destination, commute];
  });

  return appointments;
};

export const moveRecursively = (changed: AppointmentModel, data: AppointmentModel[], setSchedulerData: (data: AppointmentModel[]) => void) => {
  let newData = [...data];
  _moveRecursively(changed, newData);
  setSchedulerData(newData);
};

export const _moveRecursively = (changed: AppointmentModel, data: AppointmentModel[]) => {
  const startDate = changed.startDate;
  const endDate = changed.endDate!;
  data.forEach((appointment) => {
    const appointmentStartDate = dayjs(appointment.startDate).toDate();
    const appointmentEndDate = dayjs(appointment.endDate).toDate();

    if (changed.id !== appointment.id)
      if (endDate > appointmentStartDate && endDate < appointmentEndDate) {
        const offset = dayjs(endDate).diff(appointmentStartDate);

        appointment.endDate = dayjs(appointmentEndDate).add(offset).toDate();
        appointment.startDate = dayjs(appointmentStartDate).add(offset).toDate();
        _moveRecursively(appointment, data);
      } else if (startDate >= appointmentStartDate && startDate < appointmentEndDate) {
        const offset = dayjs(appointmentEndDate).diff(startDate);

        appointment.endDate = dayjs(appointmentEndDate).subtract(offset).toDate();
        appointment.startDate = dayjs(appointmentStartDate).subtract(offset).toDate();
        _moveRecursively(appointment, data);
      } else if (startDate <= appointmentStartDate && endDate >= appointmentEndDate) {
        const offset = dayjs(endDate).diff(appointmentStartDate);

        appointment.endDate = dayjs(appointmentEndDate).add(offset).toDate();
        appointment.startDate = dayjs(appointmentStartDate).add(offset).toDate();
        _moveRecursively(appointment, data);
      }
  });
};
