import moment from 'moment';

export const getLastUpdatedTime = (date: moment.MomentInput, currentDate = moment()) => {
  const seconds = currentDate.diff(date, 'seconds');
  const minutes = currentDate.diff(date, 'minutes');
  const hours = currentDate.diff(date, 'hours');
  const days = currentDate.diff(date, 'days');
  const months = currentDate.diff(date, 'months');
  if (minutes < 1) {
    return `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return `${minutes} ${minutes < 2 ? 'minute' : 'minutes'} ago`;
  }
  if (minutes > 60 && hours < 24) {
    return `${hours} ${hours < 2 ? 'hour' : 'hours'} ago`;
  }
  if (hours > 24 && days < 30) {
    return `${days} ${days < 2 ? 'day' : 'days'} ago`;
  }
  return `${months} ${months < 2 ? 'month' : 'months'} ago`;
};
