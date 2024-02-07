interface CalculateRecurrenceRuleParams {
  repeat: string | null;
  frequency: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

interface RecurrenceRule {
  freq: string;
  interval: number;
  byweekday?: string[];
  bymonthday?: number[];
  dtstart: string;
  until: string;
}

export function calculateByWeekday(frequency: number): string[] {
  const dayMap = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const totalDays = 7;

  const interval = Math.floor(totalDays / frequency);

  let currentDay = 0;
  const weekdays = [];

  for (let i = 0; i < frequency; i++) {
    weekdays.push(dayMap[currentDay]);
    currentDay = (currentDay + interval) % totalDays;
  }

  return weekdays.filter(day => ['SA', 'SU'].indexOf(day) === -1);
}

export function calculateRecurrenceRule({
  repeat,
  frequency,
  startDate,
  endDate,
}: CalculateRecurrenceRuleParams) {
  if (!repeat) return;

  const start = new Date(startDate);
  const until = new Date(endDate).toISOString().split('T')[0].replace(/-/g, '');
  const rrule: RecurrenceRule = {
    freq: repeat.toUpperCase(),
    interval: 1,
    dtstart: start.toISOString(),
    until,
  };

  if (repeat === 'weekly') {
    const dayMap = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const interval = Math.floor(7 / frequency);
    let currentDay = start.getDay();
    const byweekday = [];

    for (let i = 0; i < frequency; i++) {
      byweekday.push(dayMap[(currentDay + i * interval) % 7]);
    }

    rrule.byweekday = byweekday;
  } else if (repeat === 'monthly') {
    const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const interval = Math.floor(daysInMonth / frequency);
    const bymonthday = [];

    for (let i = 0; i < frequency; i++) {
      const day = 1 + i * interval;
      if (day <= daysInMonth) {
        bymonthday.push(day);
      }
    }

    rrule.bymonthday = bymonthday;
  }

  // todo: handle daily recurrence or other cases...

  return rrule;
}