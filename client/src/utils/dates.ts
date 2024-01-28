import dayjs from 'dayjs';

export const compareDates = (a: any, b: any) => {
  const dateA = dayjs(a.date);
  const dateB = dayjs(b.date);

  if (dateA.isBefore(dateB, 'day')) return -1;
  if (dateA.isAfter(dateB, 'day')) return 1;

  const timeToMinutes = (timeString: string) => {
    const [hoursStr, minutesStr] = timeString.split(':');
    let [minutes, period] = minutesStr.split(' ');
    let hours = parseInt(hoursStr, 10);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + parseInt(minutes, 10);
  };

  const startTimeA = a.duration?.split(' - ')[0] || '12:00 AM';
  const startTimeB = b.duration?.split(' - ')[0] || '12:00 AM';
  const minutesA = timeToMinutes(startTimeA);
  const minutesB = timeToMinutes(startTimeB);

  return minutesA - minutesB;
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric' as const, // numeric or 2-digit
    month: 'short' as const,  // numeric, 2-digit, narrow, short, long
    day: 'numeric' as const,  // numeric or 2-digit
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export function formatDateToReadable(date: Date | string) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateParts = date.toString().split('-');
  const year = dateParts[0];
  const month = months[parseInt(dateParts[1]) - 1]; // months are 0-indexed in JS
  const day = parseInt(dateParts[2]); // remove leading zero if any

  return `${month} ${day}, ${year}`;
}


export function extractTimesFromDuration(duration: string) {
  const [startStr, endStr] = duration.split(' - ');
  const startTime = dayjs(startStr, 'hh:mm A');
  const endTime = dayjs(endStr, 'hh:mm A');
  return [startTime, endTime];
}
