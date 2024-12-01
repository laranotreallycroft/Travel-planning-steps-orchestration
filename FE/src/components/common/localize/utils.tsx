import moment from 'moment';

export const toLocalDateFormat = (date: string) => {
  return Intl.DateTimeFormat().format(moment(date).toDate());
};
